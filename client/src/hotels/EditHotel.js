import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { DatePicker, Select } from "antd";
import { read } from "../actions/hotel";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const { Option } = Select;

const EditHotel = () => {
  useEffect(() => {
    loadSellerHotel();
  }, []);
  let match = useParams();
  console.log(match.hotelId);

  const loadSellerHotel = async () => {
    let res = await read(match.hotelId);
    console.log(res);
  };
  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Edit Place</h2>
      </div>
    </>
  );
};

export default EditHotel;
