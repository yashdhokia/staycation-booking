import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNav from "../components/DashboardNav";
import { Link } from "react-router-dom";
import ConnectNav from "../components/ConnectNav";
import { userHotelBookings } from "../actions/hotel";
import { useSelector } from "react-redux";
import BookingCard from "../components/cards/BookingCard";

const Dashboard = () => {
  const {
    auth: { token },
  } = useSelector((state) => ({ ...state }));
  const [booking, setBooking] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("auth") == null) {
      navigate("/login");
      return;
    }
  });

  useEffect(() => {
    loadUserBookings();
  }, []);

  const loadUserBookings = async () => {
    const res = await userHotelBookings(token);
    console.log(res);
    setBooking(res.data);
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5">
        {localStorage.getItem("auth") && <ConnectNav></ConnectNav>}
      </div>

      <div className="container-fluid p-4">
        <DashboardNav />
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <h2>Your Booking</h2>
          </div>
          <div className="col-md-2">
            <Link className="btn btn-primary" to="/">
              Browse Hotels
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        {booking.map((b) => (
          <BookingCard
            key={b._id}
            hotel={b.hotel}
            session={b.session}
            orderedBy={b.orderedBy}
          />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
