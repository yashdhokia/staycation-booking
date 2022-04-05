import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopNav from "./components/TopNav";
//components
import Home from "./bookings/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./user/Dashboard";
import DashboardSeller from "./user/DashboardSeller";
import NewHotel from "./hotels/NewHotel";
import EditHotel from "./hotels/EditHotel";
import SearchResult from "./hotels/SearchResult";
import ViewHotel from "./hotels/ViewHotel";
import StripeCallback from "./stripe/StripeCallback";
import StripeSuccess from "./stripe/StripeSuccess";
import StripCancel from "./stripe/StripeCancel";
import StripeCancel from "./stripe/StripeCancel";

function App() {
  return (
    <>
      <Router>
        <TopNav />
        <ToastContainer position="top-center" />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/dashboard" element={<Dashboard />}></Route>
          <Route exact path="/dashboard/seller" element={<DashboardSeller />} />
          <Route exact path="/hotels/new" element={<NewHotel />} />
          <Route exact path="/hotel/edit/:hotelId" element={<EditHotel />} />
          <Route exact path="/search-result" element={<SearchResult />} />
          <Route exact path="/hotel/:hotelId" element={<ViewHotel />} />
          <Route
            exact
            path="/search-result/hotel/:hotelId"
            element={<ViewHotel />}
          />
          <Route exact path="/stripe/callback" element={<StripeCallback />} />
          <Route
            exact
            path="/stripe/success/:hotelId"
            element={<StripeSuccess />}
          />
          <Route exact path="/stripe/cancel" element={<StripeCancel />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
