import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchHotels = () => API.get("/hotels");

export const createHotel = (newHotel) => API.post(`/hotels`, newHotel);
export const deleteHotel = (id) => API.delete(`/hotels/${id}`);
