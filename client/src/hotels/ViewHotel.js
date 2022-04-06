import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { read } from "../actions/hotel";
import { diffDays, isAlreadyBooked } from "../actions/hotel";
import moment from "moment";
import { useSelector } from "react-redux";
import { getSessionId } from "../actions/stripe";
import { loadStripe } from "@stripe/stripe-js";

const ViewHotel = () => {
  const [hotel, setHotel] = useState({});
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const { auth } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [alreadyBooked, setAlreadyBooked] = useState(false);

  useEffect(() => {
    loadSellerHotel();
  }, []);

  useEffect(() => {
    if (auth && auth.token) {
      isAlreadyBooked(auth.token, match.hotelId).then((res) => {
        //console.log(res);
        if (res.data.ok) setAlreadyBooked(true);
      });
    }
  }, []);
  let match = useParams();
  const loadSellerHotel = async () => {
    let res = await read(match.hotelId);
    setHotel(res.data);
    setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
    console.log(res);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!auth || !auth.token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    if (!auth) navigate("/login");
    //console.log(auth.token, match.hotelId);
    let res = await getSessionId(auth.token, match.hotelId);
    //console.log("get sessionid response", res.data.sessionId);

    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
    stripe
      .redirectToCheckout({ sessionId: res.data.sessionId })
      .then((result) => console.log(result));
  };

  return (
    <>
      <div
        className="container-fluid p-5 text-center"
        style={{ backgroundColor: "#c2e8ff" }}
      >
        <h1>{hotel.title}</h1>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <br />
            <img src={image} alt={hotel.image} className="img img-fluid" />
          </div>

          <div className="col-md-6">
            <br />
            <b>{hotel.content}</b>
            <p className="alert alert-info mt-3">₹{hotel.price}</p>
            <p className="card-text">
              <span className="float-right text-primary">
                for {diffDays(hotel.from, hotel.to)}{" "}
                {diffDays(hotel.from, hotel.to) <= 1 ? "day" : "days"}
              </span>
            </p>
            <p>
              From <br />{" "}
              {moment(new Date(hotel.from)).format("MMMM Do YYYY,h:mm:ss a")}
            </p>
            <p>
              To <br />{" "}
              {moment(new Date(hotel.to)).format("MMMM Do YYYY,h:mm:ss a")}
            </p>
            <i>Posted by {hotel.postedBy && hotel.postedBy.name}</i>
            <br />
            <button
              onClick={handleClick}
              className="btn btn-block btn-lg btn-primary mt-3"
              disabled={loading || alreadyBooked}
            >
              {loading
                ? "loading..."
                : alreadyBooked
                ? "Already Booked"
                : auth && auth.token
                ? "Book Now"
                : "Login to Book"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewHotel;
