import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { stripeSuccessRequest } from "../actions/stripe";
import { LoadingOutlined } from "@ant-design/icons";

const StripeSuccess = () => {
  const {
    auth: { token },
  } = useSelector((state) => ({ ...state }));
  let navigate = useNavigate();
  let match = useParams();

  useEffect(() => {
    //console.log("send this hotelId to backend to create order", match.hotelId);
    stripeSuccessRequest(token, match.hotelId).then((res) => {
      if (res.data.success) {
        //console.log("stripe success response", res.data);
        navigate("/dashboard");
      } else {
        navigate("/stripe/cancel");
      }
    });
  }, [match.hotelId]);

  return (
    <div className="container">
      <div className="d-flex justify-content-center p-5">
        <LoadingOutlined className="display-1 text-danger p-5" />
      </div>
    </div>
  );
};

export default StripeSuccess;
