import { useNavigate } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ hotel, dates }) => {
  const navigate = useNavigate();

  const handleCheckRooms = () => {
    if (!dates.length) {
      return "please fill dates";
    } else {
      navigate(`/hotels/${hotel._id}`, {
        state: {
          dates,
        },
      });
    }
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
          <span>Excellent</span>
          <button>{hotel.rating}</button>
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
