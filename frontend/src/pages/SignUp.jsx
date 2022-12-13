import React from "react";
import { Layout } from "../components/Layout";
import logo from "../assets/images/signup.png";
import axios from "axios";
import { API_ROOT } from "../config";
import { SignUpForm } from "../components/Forms";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const submit = async (data) => {
    try {
      const res = await axios.post(`${API_ROOT}/users/signup`, data);

      if (res.status === 201) navigate("/signin");
    } catch (ex) {
      setError(ex.response.data.error);
    }
  };

  return (
    <Layout>
      <main className="flex-col">
        <div className="flex justify-center">
          <img src={logo} alt="picture" width={250} />
        </div>
        <div className="flex justify-center">
          <SignUpForm submit={submit} />
        </div>
        {error && (
          <div className=" flex justify-center text-red-700  p-1 max-w-1xl">
            {error}
          </div>
        )}
      </main>
    </Layout>
  );
};
