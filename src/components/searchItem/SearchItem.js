import { useNavigate } from "react-router-dom";
import "./searchItem.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchItem = ({ hotel, dates, setError }) => {
  const navigate = useNavigate();

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  const dayDifference = (date1, date2) => {
    const timeDiference = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiference / MILLISECONDS_PER_DAY);
    return diffDays;
  };

  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);

  const handleCheckRooms = () => {
    if (!days) {
      setError(alert("Please Select Date"));
    } else {
      navigate(`/hotels/${hotel._id}`, { state: { dates, days } });
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
