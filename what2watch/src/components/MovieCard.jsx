import React from "react";

function MovieCard({ movie, handleRemoveMovie, onWatched, isWatched }) {
  return (
    <div className="bg-white rounded-md shadow-md px-2 py-2 w-[300px]">
      {movie.poster_path && (
        <img
          className="w-full rounded-t-md"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
      )}
      <div className="px-4 py-2">
        <h2 className="font-semibold text-lg">{movie.title}</h2>
        <p className="text-xs md:text-sm text-gray-600 mb-2">{movie.overview}</p>
        <div className="flex justify-between items-center">
          {isWatched ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
              onClick={() => onWatched(movie)}
            >
              Unwatched
            </button>
          ) : (
            <>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                onClick={() => handleRemoveMovie(movie)}
              >
                Remove from Watchlist
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-2"
                onClick={() => onWatched(movie)}
              >
                Mark as Watched
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;

