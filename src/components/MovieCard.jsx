import React from "react";
import starImg from "../assets/star.svg";

function MovieCard({ item }) {
  return (
    <li className="movie-card">
      {item.poster_path ? (
        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} />
      ) : (
        <div className="mt-2 flex flex-row items-center flex-wrap gap-2">
          <h3>Poster Not Available</h3>
        </div>
      )}

      <h3>{item.title}</h3>
      <div className="content">
        <div className="rating">
          <img src={starImg} />
          <p>{item.vote_average.toFixed(1)}</p>
        </div>
        <span>•</span>
        <p className="lang">{item.original_language}</p>
        <span>•</span>
        <p className="year">{item.release_date.split("-")[0]}</p>
      </div>
    </li>
  );
}

export default MovieCard;
