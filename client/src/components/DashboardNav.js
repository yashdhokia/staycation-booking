import { Link } from "react-router-dom";

const DashboardNav = () => {
  const active = window.location.pathname;
  //console.log(active);
  return (
    <ul className="nav nav-tabs">
      <li className="nav-items">
        <Link className={`nav-link `} to="/dashboard">
          Your Bookings
        </Link>
      </li>
      <li className="nav-items">
        <Link className={`nav-link`} to="/dashboard/seller">
          Your Place
        </Link>
      </li>
    </ul>
  );
};

export default DashboardNav;
