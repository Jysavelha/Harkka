import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "./Add.css";

const Add = () => {
  const [item, setItem] = useState({
    title: "",
    description: "",
    price: 0,
    picture: "",
    contact: "",
    author_id: "",
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setItem((prev) => ({ ...prev, author_id: user.uid }));
      } else {
        console.log("user is logged out");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://torizon-mysql-db.onrender.com/items", item);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Add New item</h1>
      <input
        type="text"
        placeholder="title"
        name="title"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="description"
        name="description"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="price"
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
        placeholder="email or phone number for contacting"
        name="contact"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Add</button>
      {error && "Something went wrong!"}
      <Link to="/">See all items</Link>
    </div>
  );
};

export default Add;
