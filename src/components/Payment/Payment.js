import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import moment from "moment";

import "./payment.css";

export const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedRoom = location.state.selectedRoom;
  const totalPrice = location.state.totalPrice;
  const days = location.state.days;
  const options = location.state.options;
  const alldates = location.state.alldates;
  const name = location.state.name;
  const type = location.state.type;
  const dates = location.state.dates;

  const { API } = useFetch("");
  const handleBookRoom = async () => {
    try {
      await Promise.all(
        selectedRoom.map((room) => {
          const { data } = API.put(`hotels/availability/${room._id}`, {
            dates: alldates,
          });
          return data;
        })
      );
      navigate("/success", {
        state: {
          selectedRoom,
          totalPrice,
          days,
          options,
          alldates,
          name,
          type,
          dates,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="Pcontainer">
      <h1>Details</h1>

      {selectedRoom?.map((room) => (
        <div key={room._id} className="selectedMap">
          <div className="Plists">
            <div>Title</div>
            <div>{room.title}</div>
          </div>
          <div className="Plists">
            <div>Number</div>
            <div>{room.roomNumber}</div>
          </div>
          <div className="PdesContainer">
            <div className="desHeader">Description</div>
            <div className="roomDesc">{room.description}</div>
          </div>
        </div>
      ))}
      {/* ===ROOM NUMBER== */}
      <div className="Plists">
        <div>Total number of rooms </div>
        <div>{selectedRoom.length} </div>
      </div>
      {/* ===ADULTS=== */}
      <div className="Plists">
        <div>Adult(s) </div>
        <div> {options.adult}</div>
      </div>
      {/* ===DAYS== */}
      <div className="Plists">
        <div>Day(s) </div>
        <div> {days}</div>
      </div>
      {/* ==AMOUNT== */}
      <div className="Plists">
        <div>amount </div>
        <div>&#8358; {Intl.NumberFormat().format(totalPrice)}</div>
      </div>
      {dates?.map(({ startDate, endDate }, i) => (
        <div key={i}>
          <div>From {moment(startDate.toString()).format("MMMM Do YYYY")}</div>
          <div>To {moment(endDate.toString()).format("MMMM Do YYYY")}</div>
        </div>
      ))}
      {/* {ndu} */}
      <button onClick={handleBookRoom}>Book</button>
    </div>
  );
};

export default Payment;
