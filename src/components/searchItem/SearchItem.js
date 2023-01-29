import { useNavigate } from "react-router-dom";
import "./searchItem.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchItem = ({ hotel }) => {
  const navigate = useNavigate();

  const handleCheckRooms = () => {
    navigate(`/hotels/${hotel._id}`);
  };
  return (
    <div className="searchItem">
      {/* <img src={p.photos[0]} alt="" className="siImg" /> */}

      <div className="siDesc">
        <h1 className="siTitle">{hotel.name}</h1>
        <span className="siDistance">{hotel.distance}</span>
        <span className="siDistance">{hotel.city}</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Beautifull {hotel.type} with Air conditioning
        </span>
        <span className="siFeatures">{hotel.description}</span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <button>{hotel.rating}</button>
          {/* <span> */}
          <FontAwesomeIcon icon={faStar} style={{ color: "yellow" }} />
          {/* </span> */}
        </div>
        <div className="siDetailTexts">
          <button onClick={handleCheckRooms} className="siCheckButton">
            Check Rooms
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
