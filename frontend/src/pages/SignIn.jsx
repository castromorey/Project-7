import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Layout } from "../components/Layout2";
//import { Layout } from "../components/Layout3";
import signup from "../assets/images/signup.png";
import { SignInForm } from "../components/Forms";
import { API_ROOT } from "../config";
import { UserContext } from "../context";

export const SignIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);

  const submit = async (data) => {
    console.log({ data });

    try {
      const res = await axios.post(`${API_ROOT}/users/signin`, data);
      //console.log(res);
      if (res.status === 201) {
        localStorage.setItem("token", res.data.token);
        setUser(res.data);
        navigate("/");
      }
    } catch (ex) {
      setError(ex.response.data.error);
      // console.log({ ex });
    }
  };

  return (
    <Layout>
      <main className="flex-col">
        <div className="flex justify-center">
          <img src={signup} alt="picture" width={350} />
        </div>
        <div className="flex justify-center">
          <SignInForm submit={submit} />
        </div>
      </main>
    </Layout>
  );
};
