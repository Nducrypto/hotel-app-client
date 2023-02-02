import "./list.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../Hooks/useFetch";

const List = () => {
  const location = useLocation();

  const [openDate, setOpenDate] = useState(false);
  const [error, setError] = useState("");

  // let tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [destination, setDestination] = useState(
    location.state.destination || ""
  );
  const [type, setType] = useState(location.state.type || "");

  const { data, loading, reFetch } = useFetch(
    `/hotels?type=${type}&city=${destination}`
  );

  // const handleClick = () => {
  //   reFetch();
  // };

  return (
    <div>
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
              <input
                placeholder={type}
                onChange={(e) => setType(e.target.value)}
                type="text"
              />
            </div>
            <div className="lsItem">
              <label>Checkin - Checkout Date</label>
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
            {/* <button onClick={handleClick}>Search</button> */}
          </div>
          <div className="listResult">
            {loading ? (
              "Loading"
            ) : (
              <>
                {data.map((hotel) => (
                  <SearchItem
                    hotel={hotel}
                    key={hotel._id}
                    dates={dates}
                    setError={setError}
                    error={error}
                  />
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
