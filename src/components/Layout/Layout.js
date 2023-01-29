import React from "react";
import Footer from "../footer/Footer";
import MailList from "../mailList/MailList";
// import Navbar from "../navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      {children}
      {/* <Navbar /> */}
      <MailList />
      <Footer />
    </div>
  );
};

export default Layout;
