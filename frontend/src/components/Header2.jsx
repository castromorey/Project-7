import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="bg-slate-300 flex justify-start  p-5">
      <span>
        <Link to="/">Home</Link>
      </span>
    </div>
  );
};
