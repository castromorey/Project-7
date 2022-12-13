import React from "react";
import { Link, useNavigate } from "react-router-dom";

/*
  <i className="fa-solid fa-message"></i>
        <i className="fa-solid fa-bell"></i>
        */

export const Header = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate("/signin");
  };
  return (
    <div className="bg-slate-300 flex justify-between items-center  p-5">
      <span>Groupomania Social Media</span>
      <form className="w-80">
        <label>
          <input
            type="search"
            placeholder="Search..."
            className="w-full border-0 rounded-md p-1"
          />
        </label>
      </form>
      <div className="flex gap-9">
        <span>Time Line</span>

        <i className="fa-regular fa-user"></i>

        <i className="fa-solid fa-image"></i>
        <span>
          <a href="#" onClick={() => logOut()}>
            Logout
          </a>
        </span>
      </div>
    </div>
  );
};
