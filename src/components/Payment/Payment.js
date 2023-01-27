import axios from "axios";
import React from "react";
import { useLocation } from "react-router-dom";

export const Payment = () => {
  const location = useLocation();
  const selectedRoom = location.state.selectedRoom;
  const totalPrice = location.state.totalPrice;
  const days = location.state.days;
  const options = location.state.options;
  const alldates = location.state.alldates;

  const handleBookRoom = async () => {
    try {
      await Promise.all(
        selectedRoom.map((room) => {
          const { data } = axios.put(
            `http://localhost:5000/api/hotels/availability/${room._id}`,
            { dates: alldates }
          );
          return data;
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div>{totalPrice}</div>
      <div>{days}</div>
      {selectedRoom?.map((hotel) => (
        <div key={hotel._id}>
          <div>{hotel.title}</div>
        </div>
      ))}

      <div>room number {options.room}</div>
      <div>adults {options.adult}</div>
      <div></div>
      <div></div>
      <button onClick={handleBookRoom}>submit</button>
    </div>
  );
};
