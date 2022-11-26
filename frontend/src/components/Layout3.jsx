import React from "react";
import { Header } from "./HeaderProfile";
export const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};
