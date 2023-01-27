import Featured from "../../components/featured/Featured";
// import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
// import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";
import React, { useState } from "react";
import Form from "../../Form";
// import { useAuthContext } from "../../States/Context/AuthContext";
const Home = () => {
  const [mode, setMode] = useState([]);
  const [error, setError] = useState(false);

  // const { user } = useAuthContext();
  return (
    <div>
      <Navbar />
      <Form mode={mode} setMode={setMode} error={error} setError={setError} />
      <Header />
      <Featured />
      <PropertyList />
      {/* <MailList /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
