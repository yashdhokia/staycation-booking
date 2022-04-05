import express from "express";
import formidable from "express-formidable";
const router = express.Router();

//middleware
import { requireSignin, hotelOwner } from "../middlewares";
// controllers
import {
  create,
  hotels,
  image,
  sellerHotels,
  remove,
  read,
  searchListing,
  userHotelBookings,
  isAlreadyBooked,
} from "../controllers/hotel";

// requireSignin in create-hotel router
router.post("/create-hotel", requireSignin, formidable(), create);
router.get("/hotels", hotels);
router.get("/hotel/image/:hotelId", image);
router.get("/seller-hotels", requireSignin, sellerHotels);
router.delete("/delete-hotel/:hotelId", requireSignin, hotelOwner, remove);
router.get("/hotel/:hotelId", read);

//orders
router.post("/search-listings", searchListing);
router.get("/user-hotel-bookings", requireSignin, userHotelBookings);
router.get(`/is-already-booked/:hotelId`, requireSignin, isAlreadyBooked);
module.exports = router;
