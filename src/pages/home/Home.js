import Destinations from "../../components/Destinations/Destinations";
import Header from "../../components/header/Header";
import PropertyType from "../../components/propertyType/PropertyType";
// import React, { useState } from "react";
// import Form from "../../Form";
// import { useAuthContext } from "../../States/Context/AuthContext";
const Home = () => {
  // const { user } = useAuthContext();
  return (
    <div>
      <Header />
      <Destinations />
      <PropertyType />
    </div>
  );
};

export default Home;
