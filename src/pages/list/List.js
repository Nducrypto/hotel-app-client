import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../Hooks/useFetch";

const List = () => {
  const location = useLocation();

  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [destination, setDestination] = useState(
    location.state.destination || ""
  );
  let tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(tomorrow),
      key: "selection",
    },
  ]);
  const [openDate, setOpenDate] = useState(false);

  const type = location.state.type;

  const { data, loading, reFetch } = useFetch(
    type
      ? `/hotels?type=${type}`
      : `/hotels?city=${destination}&min=${min || 0}&max=${max || 20000000}`
  );

  const handleClick = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input
                placeholder={destination}
                onChange={(e) => setDestination(e.target.value)}
                type="text"
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            {/* <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    value={min}
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    value={max}
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                    onChange={(e) =>
                      setOptions({ ...options, adult: e.target.value })
                    }
                  />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                    onChange={(e) =>
                      setOptions({ ...options, room: e.target.value })
                    }
                  />
                </div>
              </div>
            </div> */}
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              "Loading"
            ) : (
              <>
                {data.map((hotel) => (
                  <SearchItem hotel={hotel} key={hotel._id} dates={dates} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
