import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createHotel, deleteHotel } from "./States/Actions/action";

const Form = ({ setError }) => {
  const [form, setForm] = useState({});

  const [hotelId, setHotelId] = useState("");

  const [roomData, setRoomData] = useState({
    roomNumber: "",
    title: "",
    price: "",
    maxPeople: "",
    description: "",
  });

  const dispatch = useDispatch();

  const { booking, isError } = useSelector((state) => state.bookings);

  // ====HOTEL ONCHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // ====HOTEL CREATE HANDLER
  const handleCreateHotel = async (e) => {
    e.preventDefault();
    dispatch(
      createHotel({
        ...form,
      })
    );
  };

  //  ===CREATE ROOM HANDLER
  const handleCreateRoom = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/hotels/createRoom/${hotelId}`,
        {
          ...roomData,
        }
      );
      return data;
    } catch (err) {
      setError(err.response.data.message);
    }
    // setForm(initialState);
  };

  const images = [
    "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    // "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
    // "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "20rem",
        marginTop: "2rem",
      }}
    >
      HOTEL FORM
      <input
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="name"
        name="name"
      />
      <input onChange={handleChange} placeholder="type" name="type" />
      <input onChange={handleChange} placeholder="city" name="city" />
      <input onChange={handleChange} placeholder="address" name="address" />
      <input onChange={handleChange} placeholder="photos" name="photos" />
      <input onChange={handleChange} placeholder="rooms" name="rooms" />
      <textarea
        onChange={handleChange}
        placeholder="description"
        name="description"
      />
      <input
        onChange={handleChange}
        placeholder="rating"
        type="number"
        name="rating"
      />
      <button onClick={handleCreateHotel}>createhotel</button>
      <div>
        ROOM FORM
        <>
          <select
            style={{ display: "flex", flexDirection: "column" }}
            onChange={(e) => setHotelId(e.target.value)}
          >
            {booking.map((p) => (
              <option value={p._id} key={p._id}>
                {p.name} {p.type}
              </option>
            ))}
          </select>
        </>
        <input
          onChange={(e) =>
            setRoomData({
              ...roomData,
              maxPeople: e.target.value,
            })
          }
          placeholder="maxPeople"
          type="number"
        />
        <input
          onChange={(e) =>
            setRoomData({
              ...roomData,
              roomNumber: e.target.value,
            })
          }
          placeholder="roomNumber"
          type="number"
        />
        <textarea
          onChange={(e) =>
            setRoomData({
              ...roomData,
              description: e.target.value,
            })
          }
          placeholder="description"
          type="text"
        />
        <input
          onChange={(e) =>
            setRoomData({
              ...roomData,
              price: e.target.value,
            })
          }
          placeholder="price"
          type="number"
        />
        <input
          onChange={(e) =>
            setRoomData({
              ...roomData,
              title: e.target.value,
            })
          }
          placeholder="title"
          type="text"
        />
      </div>
      <button onClick={handleCreateRoom}>createroom</button>
      <>
        {booking.map((p) => (
          <div key={p._id} style={{ display: "flex", flexDirection: "column" }}>
            <div>name :{p.name}</div>
            <div>type :{p.type}</div>
            <div>city :{p.city}</div>
            <div>address :{p.address}</div>
            <div>photos :{p.photos}</div>
            <div>description :{p.description}</div>
            <div>rating :{p.rating}</div>
            <div
              style={{
                fontSize: "1.5rem",
                display: "flex",
              }}
            >
              {p?.rooms &&
                images?.map((room, i) => (
                  <div key={i}>
                    <img src={room} alt="" className="pListImg" />

                    <div>{p.rooms[i]?.title}</div>
                    <div>{p.rooms[i]?.description}</div>
                    <div>{p.rooms[i]?.price}</div>
                    <div>{p.rooms[i]?.maxPeople}</div>
                  </div>
                ))}
            </div>
            <button onClick={() => dispatch(deleteHotel(p._id))}>delete</button>
          </div>
        ))}
      </>
      <div style={{ fontSize: "1.5rem" }}>{isError}</div>
    </div>
  );
};
export default Form;
