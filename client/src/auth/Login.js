import React from "react";
import { toast } from "react-toastify";
import { login } from "../actions/auth";
import LoginForm from "../components/LoginForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SEND LOGIN DATA", { email, password });
    try {
      let res = await login({ email, password });
      if (res.data) {
        console.log(
          "SAVE USER RES IN REDUX AND LOCAL STORAGE THEN REDIRECT ===>"
        );
      }
      // console.log(res.data);
      // save user and token to local storage
      window.localStorage.setItem("auth", JSON.stringify(res.data));
      //save user and token to redux
      dispatch({
        type: "LOGGED_IN_USER",
        payload: res.data,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      //if undefined comment out
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  return (
    <>
      <div className="container-fluid p-5 text-center">
        <h1>Login</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <LoginForm
              handleSubmit={handleSubmit}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
