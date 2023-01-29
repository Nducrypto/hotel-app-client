import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedRoom = location.state.selectedRoom;
  //   const totalPrice = location.state.totalPrice;
  const days = location.state.days;
  const name = location.state.name;
  const type = location.state.type;
  const dates = location.state.dates;

  const start = dates[0]?.startDate;

  let end = dates[0]?.endDate;

  return (
    <div style={{ marginTop: "4rem", width: "60%", margin: "4% 10% 10% 20%" }}>
      <h1 style={{ textAlign: "center", color: "green" }}>Congratulations!</h1>
      <div style={{ textAlign: "center", fontSize: "2rem" }}>
        Your have successfully Booked a total of {selectedRoom.length} {type} in{" "}
        {name} for {days} days(s) from{" "}
        {moment(start.toString()).format("MMMM Do YYYY")} to{" "}
        {moment(end.toString()).format("MMMM Do YYYY")}
        to was successfull
      </div>
      <div
        onClick={() => navigate("/")}
        style={{ marginTop: "2rem", textAlign: "center", cursor: "pointer" }}
      >
        {" "}
        Go back to Home
      </div>
    </div>
  );
};

export default Success;
