import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
// import MailList from "../../components/mailList/MailList";
// import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useFetch from "../../Hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
// import { useAuthContext } from "../../States/Context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import DateOptions from "../../components/DateOptions/DateOptions";

const Hotel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openOptions, setOpenOptions] = useState(false);
  const [openDate, setOpenDate] = useState(false);

  const [slideNumber, setSlideNumber] = useState(0);
  const [openCarousel, setOpenCarousel] = useState(false);
  const [openReserve, setOpenReserve] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState([]);
  const [options, setOptions] = useState({
    adult: 1,
    room: 1,
  });

  const [dates, setDates] = useState(location.state.dates);

  let hotel = location.pathname.split("/")[2];
  const { data, loading } = useFetch(`/hotels/find/${hotel}`);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  const dayDifference = (date1, date2) => {
    const timeDiference = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiference / MILLISECONDS_PER_DAY);
    return diffDays;
  };

  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpenCarousel(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 2 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 2 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const images = [
    "https://images.unsplash.com/photo-1564032775255-6470bd36edf6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8a2luZyUyMGJlZHJvb218ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a2luZyUyMGJlZHJvb218ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1621156927354-0e0addca4114?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmVkJTIwYmVkcm9vbXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://lh5.googleusercontent.com/J1XpKNGlglaV2YCFLOVWDMd4rUxkM2SoanCbgOfs3OymPCbOT9azKGjisbonjM-K5ti7fnf-o68yRmJwZi083J6Yarx7M20YG7ft92_5h2J3Tew_XAQLG-FqCOofn2fhbjcYCdaU",
    "https://lh3.googleusercontent.com/yjDoBdvT5hee7GpGXk5fSi43sU0E_4_f2YeopUW99NJODjcMWAHbDWhkLO6KvjwTXvjQwlyRR0gQx2w2CnGfyohY8ETkGVzVwo-O5ti6uk8gaHecDEMA4w4yyiCAHepf29ZGXE8M",
    "https://lh5.googleusercontent.com/hbi2os5doGfcairEVFRpqMUXuV5RI4lNeNHKwLZy8l86uNYczA8j0z5O2pbXBeeGqQh1Ry2oR0oCczLSKE2GxUJaItnf2q2FiOY-0eiuaxBiSEGYQhOUhmVSfBXxDOVFJwkf3yWn",
  ];

  const handleSelect = (e, room) => {
    const { checked } = e.target;

    setSelectedRoom(
      checked
        ? [...selectedRoom, room]
        : selectedRoom.filter((item) => item !== room)
    );
  };

  const totalPrice = () => {
    // converted an array of string to a Number by mapping the state
    // let ndu = hotelDetail.map((p) => Number(p.price));
    if (selectedRoom.length) {
      const total = selectedRoom?.reduce(
        (x, y) => Number(x) + Number(y.price),
        0
      );
      return total;
    } else {
      return 0;
    }
  };

  const getDatesInRange = (startDate, endDate) => {
    const date = new Date(startDate);

    const dates = [];

    while (date <= endDate) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };
  const alldates = getDatesInRange(dates[0]?.startDate, dates[0]?.endDate);
  console.log(alldates);

  const isAvailable = (unavailableDates) => {
    const isFound = unavailableDates?.some((p) =>
      alldates.includes(new Date(p).getTime())
    );

    console.log(isFound);
    return isFound;
  };

  const handleClick = () => {
    navigate("/payment", {
      state: {
        options,
        days,
        selectedRoom,
        alldates,
        totalPrice: totalPrice(),
      },
    });
  };

  return (
    <div style={{ backgroundColor: "black", color: "white" }}>
      <Navbar />

      {loading ? (
        "Loading"
      ) : (
        <div className="hotelContainer">
          {openCarousel && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpenCarousel(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img src={images[slideNumber]} alt="" className="sliderImg" />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}

          <div className="hotelWrapper">
            <h1 className="hotelTitle">{data.name}</h1>
            <DateOptions
              options={options}
              setOptions={setOptions}
              dates={dates}
              setDates={setDates}
              openDate={openDate}
              setOpenDate={setOpenDate}
              openOptions={openOptions}
              setOpenOptions={setOpenOptions}
            />
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>

            <span className="hotelPriceHighlight">
              Book a stay over at this property and get a free airport taxi
            </span>
            <div className="hotelImages">
              {data?.rooms &&
                images?.map((room, i) => (
                  <div className="hotelImgWrapper" key={i}>
                    <div className="h-roomNumner-input-cont">
                      <div>
                        {data.type === "Apartment" ? (
                          <>Apartment {data?.rooms[i]?.roomNumber}</>
                        ) : data.type === "Resort" ? (
                          <div>Resort {data?.rooms[i]?.roomNumber}</div>
                        ) : (
                          <>Room {data?.rooms[i]?.roomNumber}</>
                        )}
                      </div>
                      <input
                        disabled={isAvailable(data?.rooms[i]?.unavailableDates)}
                        type="checkbox"
                        onChange={(e) => {
                          handleSelect(e, data?.rooms[i]);
                        }}
                        className="h-input"
                      />
                    </div>
                    <img
                      src={room}
                      alt=""
                      className="hotelImg"
                      onClick={() => handleOpen(i)}
                    />
                    <div style={{ textAlign: "center", color: "red" }}>
                      {data?.rooms[i]?.title}
                    </div>
                    <div className="h-price-max-cont">
                      <div>Max {data?.rooms[i]?.maxPeople}</div>

                      <div>
                        &#8358;{" "}
                        {Intl.NumberFormat().format(data?.rooms[i]?.price)}
                      </div>
                    </div>

                    <div
                      style={{
                        marginTop: "1rem",
                      }}
                    >
                      {data?.rooms[i]?.description}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <p className="hotelDesc">{data.description}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h1 style={{ color: "black" }}>
                Perfect for a {days}night stay!
              </h1>

              <h2>
                <b> ${totalPrice() * days * options.room}</b> for {days} day(s)
              </h2>

              <button onClick={handleClick}>Book Now!</button>
            </div>
          </div>
          {/* <MailList /> */}
          {/* <Footer /> */}
        </div>
      )}

      {openReserve && <Reserve setOpen={setOpenReserve} hotelId={hotel} />}
    </div>
  );
};

export default Hotel;
