import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Update.css";

const Update = () => {
  const [item, setItem] = useState({
    title: "",
    description: "",
    price: null,
    picture: "",
    contact: "",
  });
  const [error, setError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const itemId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://torizon-mysql-db.onrender.com/items/${itemId}`, item);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the item</h1>
      <input
        type="text"
        placeholder="item title"
        name="title"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="item description"
        name="description"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="item price"
        name="price"
        onChange={handleChange}
      />
      <input
        type="text"
        name="picture"
        placeholder="Image url"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Email or phone number for contacting"
        name="contact"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
      <Link to="/">See all items</Link>
    </div>
  );
};

export default Update;
