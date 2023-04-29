import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import "./Items.css";

const Items = () => {
  const [items, setitems] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log("uid", uid);
      } else {
        // User is signed out
        // ...
        console.log("user is logged out");
      }
    });
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    const fetchAllitems = async () => {
      try {
        const res = await axios.get("http://localhost:8800/items");
        setitems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllitems();
  }, []);

  console.log(items);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/items/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <header>
        <div>
          {auth.currentUser ? (
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="login">
              <Link to={"/login"}>Login</Link>
            </button>
          )}
        </div>
        <img
          className="appName"
          src={require("../images/torizon.png")}
          alt="Torizon"
        />
        <div>
          <button className="addButton">
            <Link to="/add">Add new item</Link>
          </button>
        </div>
      </header>
      <div className="box">
        <div className="items-container">
          {items.map((item) => (
            <div key={item.id} className="item">
              <img src={item.picture} alt="" />
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <span>${item.price}</span>
              <p>Contact information: {item.contact}</p>

              <div className="delete">
                {auth.currentUser &&
                  item.author_id === auth.currentUser.uid && (
                    <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  )}
              </div>

              <div className="update">
                {auth.currentUser &&
                  item.author_id === auth.currentUser.uid && (
                    <button>
                      <Link to={`/update/${item.id}`}>Update</Link>
                    </button>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Items;
