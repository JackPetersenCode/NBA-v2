import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../NavBar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
      <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default Layout;