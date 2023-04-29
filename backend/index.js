import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "torizon",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/items", (req, res) => {
  const q = "SELECT * FROM items";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/users", (req, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/signup", (req, res) => {
  const q = "INSERT INTO `torizon`.`users`(`author_id`,`email`, `password`) VALUES (?)";

  const values = [
    req.body.author_id,
    req.body.email,
    req.body.password,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.post("/items", (req, res) => {
  const q = "INSERT INTO `torizon`.`items`(`title`, `description`, `price`, `picture`, `contact`, `author_id`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.picture,
    req.body.contact,
    req.body.author_id

  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/items/:id", (req, res) => {
  const itemId = req.params.id;
  const q = " DELETE FROM items WHERE id = ? ";

  db.query(q, [itemId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/items/:id", (req, res) => {
  const itemId = req.params.id;
  const q = "UPDATE items SET `title`= ?, `description`= ?, `price`= ?, `picture`= ?, `contact`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.picture,
    req.body.contact,
  ];

  db.query(q, [...values,itemId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});