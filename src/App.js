import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import { useDispatch } from "react-redux";
import { getHotels } from "./States/Actions/action";
import React, { useEffect } from "react";
import Login from "./pages/Login/Login";
import { Payment } from "./components/Payment/Payment";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHotels());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/:dynamic" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
