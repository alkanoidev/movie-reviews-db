import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import Card from "./Card";

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get")
    .then((res) => setList(res.data));
  }, [list]);

  const submit = () => {
    Axios.post("http://localhost:3001/api/insert/", {
      movieName: movieName,
      review: review,
    });
  };

  return (
    <div className="App">
      <h1>Movie DataBase</h1>
      <label>Movies name</label>
      <input
        type="text"
        name="movieName"
        onChange={(event) => {
          setMovieName(event.target.value);
        }}
      />
      <br />
      <label>Review</label>
      <input
        type="text"
        name="review"
        onChange={(event) => {
          setReview(event.target.value);
        }}
      />
      <input type="button" value="Send" onClick={submit} />
      <ul
      style={{listStyle: "none", transition: "1s"}}>
        {list.map((item) => (
          <Card movieName={item.movieName} movieReview={item.movieReview}  id={item.id} />
        ))}
      </ul>
    </div>
  );
}

export default App;
