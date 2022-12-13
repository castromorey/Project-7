import React, { useContext } from "react";
import { Link } from "react-router-dom";
import iconb from "../assets/images/iconb.png";
import { UserContext } from "../context";

export const Header = () => {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser({});

    localStorage.removeItem("token");
  };
  return (
    <div className="bg-slate-300 flex justify-between items-center  p-5">
      <div>
        <img
          src={iconb}
          alt="Logo"
          width={150}
          className="h-[24px] object-cover"
        />
      </div>

      <nav>
        <ul className="flex gap-8 items-center">
          {!user.token ? (
            <>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/profile"
                  className="flex justify-between items-center"
                >
                  <span className="mr-3 flex items-center font-bold justify-center w-10 h-10 rounded-full border border-green-600 bg-green-300">
                    {user.firstName.charAt(0)}
                  </span>{" "}
                  {user.firstName} {user.lastName}
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-blue-600">
                  Sign Out{" "}
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};
