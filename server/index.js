const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "filipfica",
  database: "crudapp",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const review = req.body.review;

  db.query(
    "INSERT INTO movie_reviews (movieName, movieReview) VALUES(?,?);",
    [movieName, review],
    (err, result) => {
      res.send("inserted");
    }
  );
});

app.get("/api/get", (req, res) => {
  db.query("SELECT * FROM movie_reviews;", (err, result) => {
    res.send(result);
  });
});

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM movie_reviews WHERE id = ?;", id, (err, res) => {
    if (err) console.log(err);
  });
});

app.put("/api/update", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;
  db.query(
    "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?",
    [movieReview, movieName],
    (err, result) => {
      if(err) console.log(err);
    }
  );
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
