import "./list.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";

import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../Hooks/useFetch";

const List = () => {
  const location = useLocation();

  const [destination, setDestination] = useState(
    location.state.destination || ""
  );

  const type = location.state.type;

  const { data, loading, reFetch } = useFetch(
    type ? `/hotels?type=${type}` : `/hotels?city=${destination}`
  );

  const handleClick = () => {
    reFetch();
  };

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
            </div>

            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              "Loading"
            ) : (
              <>
                {data.map((hotel) => (
                  <SearchItem hotel={hotel} key={hotel._id} />
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
