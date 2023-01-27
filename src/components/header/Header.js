import { faBed, faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [destination, setDestination] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(
      `/${destination}`,
      { state: { destination } }
      //  { state: { destination, dates, options } }
    );
  };

  return (
    <main className="header">
      <div className="headerContainer">
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
        </div>

        <>
          <h1 className="headerTitle">
            A TRUE PARISIAN HOME IN THE HEART
            <br />
            <span style={{ color: "red" }}>OF EBUBE-DJANGO-MIKEL</span>
          </h1>
          <p className="headerDesc">
            EbubeDjangoHotels.com makes it easy and rewarding. Always
          </p>
          <div className="unlockContainer">
            <div className="unlock">Unlock instant savings..</div>
            <p>You could get an extra 10% off with Member Prices</p>
            <button className="headerBtn">Sign in / Register</button>
          </div>
        </>
      </div>
      <div className="headerSearch">
        <div className="headerSearchInput">
          <input
            type="text"
            placeholder="Where are you going?"
            className="searchInput"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        <div className="headerSearchItem">
          <button className="headerBtn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </main>
  );
};

export default Header;
