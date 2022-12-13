import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context";
import { API_ROOT } from "../config";
import { Layout } from "../components/Layout";

export const Profile = () => {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  //delete account
  const deleteUser = async () => {
    //alert("Do you really want to delete your account?");
    const accepted = confirm("Are you you want to delete your account?");
    if (!accepted) return;

    try {
      const res = await axios.delete(`${API_ROOT}/users`, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });

      setUser({});
      localStorage.removeItem("token");

      navigate("/");

      console.log({ res });
    } catch (ex) {
      // setError(ex.response.data.error);
      console.log({ ex });
    }
  };

  return (
    <Layout>
      <div className="flex justify-center py-16">
        <form
          //onSubmit={handleSubmit}
          className="flex flex-col  p-12 gap-7 bg-blue-500 w-96 max-h-98"
        >
          <div className=" flex justify-center text-3xl text-red-600">
            <h2>User Profile</h2>
          </div>

          <label htmlFor="firstName">
            First Name*
            <input
              disabled
              type="firstName"
              name="firstName"
              placeholder={user.firstName}
              className="w-full border-0 rounded-md p-1 bg-slate-500 "
            />
          </label>

          <label htmlFor="lastName">
            Last Name*
            <input
              disabled
              type="lastName"
              name="lastName"
              placeholder={user.lastName}
              className="w-full border-0 rounded-md p-1 bg-slate-500"
            />
          </label>

          <label htmlFor="e-mail">
            E-mail*
            <input
              disabled
              type="email"
              name="email"
              placeholder={user.email}
              className="w-full border-0 rounded-md p-1 bg-slate-500"
            />
          </label>

          <label htmlFor="Password">
            Password*
            <input
              disabled
              type="password"
              name="password"
              placeholder="xxxxxxxx"
              className="w-full border-0 rounded-md p-1 bg-slate-500"
            />
          </label>

          <button
            type="button"
            onClick={deleteUser}
            className=" w-full border-0 rounded-md p-1 bg-blue-300 text-red-600"
          >
            Delete account
          </button>
        </form>
      </div>
    </Layout>
  );
};
