import React from "react";
import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { register } from "../actions/auth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({
        name,
        email,
        password,
      });

      console.log("REGISTER USER =>", res);
      toast.success("Register success.Please login");

      navigate("/login");
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  return (
    <>
      <div
        style={{
          paddingTop: "4vw",
          paddingBottom: "4vw",
          backgroundColor: "#6d90c7",
          minHeight: "100vh",
        }}
      >
        <div className="d-flex justify-content-center">
          <div
            className="col-lg-6 pb-5 bg-white"
            style={{ borderRadius: "25px", boxShadow: "3px 3px rgb(33,37,41)" }}
          >
            <div className="container-fluid p-5 text-center">
              <h1>Register Yourself!!!</h1>
            </div>

            <div className="container">
              <div className="row">
                <div className="col-md-6 offset-md-3">
                  <RegisterForm
                    handleSubmit={HandleSubmit}
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                  ></RegisterForm>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
