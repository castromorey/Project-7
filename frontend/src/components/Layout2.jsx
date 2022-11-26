import React from "react";
import { Header } from "./Header2";
//import { Link } from "react-router-dom";
export const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};
