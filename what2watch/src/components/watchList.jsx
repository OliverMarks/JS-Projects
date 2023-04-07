
import { useState } from "react";


export default function WatchList({ movies, handleRemoveMovie }) {
  return (
    <div className="flex flex-col justify-center items-center mt-6">
      <h2>My watch list</h2>
      <div>
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white rounded-md shadow-md p-4">
          <h2 className="text-lg font-bold mb-2">{movie.title}</h2>
          <div className="flex items-start mb-4">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="w-32 h-auto mr-4" />
            <p className="text-gray-700 overflow-hidden overflow-ellipsis">{movie.overview}</p>
          </div>
          <button className="border border-gray-700 px-4 py-2 rounded-md" onClick={() => handleRemoveMovie(movie)}>Move to Watched</button>
        </div>
        
        ))}
      </div>
    </div>
  );
}


