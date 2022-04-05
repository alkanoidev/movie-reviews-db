import React from "react";
import Axios from "axios";
import "./App.css";
function Card(props) {
  const [newReview, setNewReview] = React.useState("");
  return (
    <div className="Card">
      <label>Movie Name:</label>
      <h3>{props.movieName}</h3>
      <label>Review:</label>
      <h3>{props.movieReview}</h3>
      <button
        onClick={() => {
          Axios.delete(`/api/delete/${props.id}`);
        }}
      >
        Delete
      </button>
      <input
        type="text"
        name="update"
        placeholder="Update review"
        onChange={(event) => {
          setNewReview(event.target.value);
        }}
      />
      <button
        onClick={() => {
          Axios.put(`/api/update`, {
            movieName: props.movieName,
            movieReview: newReview
          });
          setNewReview("");
        }}
      >
        Update
      </button>
    </div>
  );
}

export default Card;
