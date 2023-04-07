import { useState } from "react";



export default function Watched({ watchedMovies, handleRemoveWatchedMovie }) {
    return (
      <div className="flex flex-col justify-center items-center mt-6">
        <h2>Watched</h2>
        <ul>
          {watchedMovies.map((movie) => (
            <li key={movie.id}>
              {movie.title}{" "}
              <button onClick={() => handleRemoveWatchedMovie(movie)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }