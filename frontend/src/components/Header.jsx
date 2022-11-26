import React, { useContext } from "react";
import { Link } from "react-router-dom";
import iconb from "../assets/images/iconb.png";
import { UserContext } from "../context";

export const Header = () => {
  const { user, setUser } = useContext(UserContext);

  console.log({ user });

  const handleLogout = () => {
    setUser({});

    localStorage.removeItem("token");
  };
  return (
    <div className="bg-slate-300 flex justify-between items-center  p-5">
      <div>
        <img src={iconb} alt="Logo" width={110} />
      </div>
      <form className="w-80">
        <label>
          <input
            type="search"
            placeholder="Search..."
            className="w-full border-0 rounded-md p-1"
          />
        </label>
      </form>
      <nav>
        <ul className="flex gap-8">
          {!user.token ? (
            <>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          ) : (
            <li>
              <button onClick={handleLogout}>Sign Out</button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};
