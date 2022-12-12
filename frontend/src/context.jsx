import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { API_ROOT } from "./config";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const token = localStorage.getItem("token");

  // if (token && !user.token) {
  //   setUser({ token });
  // }

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    if (token && !user.token) {
      const res = await axios.get(`${API_ROOT}/users/me`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      setUser({ token, ...res.data });
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
