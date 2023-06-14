import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faThumbsDown as faDownSolid } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as faUpSolid } from '@fortawesome/free-solid-svg-icons'

export default function Watched({ watchedMovies, handleRemoveWatchedMovie }) {
  const [movieReactions, setMovieReactions] = useState([]);

  const handleLike = (movieTitle) => {
    const updatedReactions = [...movieReactions];
    const index = updatedReactions.findIndex(reaction => reaction.movieTitle === movieTitle);

    if (index !== -1) {
      if (updatedReactions[index].liked) {
        updatedReactions.splice(index, 1);
      } else {
        updatedReactions[index].liked = true;
        updatedReactions[index].disliked = false;
      }
    } else {
      updatedReactions.push({ movieTitle, liked: true });
    }

    setMovieReactions(updatedReactions);
  };

  const handleDislike = (movieTitle) => {
    const updatedReactions = [...movieReactions];
    const index = updatedReactions.findIndex(reaction => reaction.movieTitle === movieTitle);

    if (index !== -1) {
      if (updatedReactions[index].disliked) {
        updatedReactions.splice(index, 1);
      } else {
        updatedReactions[index].liked = false;
        updatedReactions[index].disliked = true;
      }
    } else {
      updatedReactions.push({ movieTitle, disliked: true });
    }

    setMovieReactions(updatedReactions);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-6">
      <h2 className="font-bold">Watched</h2>
      <ul className="flex flex-col">
        {watchedMovies.map((movie) => {
          const movieReaction = movieReactions.find(reaction => reaction.movieTitle === movie.title) || {};

          return (
            <li key={movie.id} className="bg-white p-2 rounded-xl m-1 shadow-lg flex gap-2">
              {movie.title}{" "}
              <div className="flex items-center justify-center hover:cursor-pointer">
                <FontAwesomeIcon
                  className="hover:cursor-pointer"
                  onClick={() => handleLike(movie.title)}
                  className="ml-2"
                  icon={movieReaction.liked ? faUpSolid : faThumbsUp}
                />
                <FontAwesomeIcon
                  onClick={() => handleDislike(movie.title)}
                  className="ml-2 "
                  icon={movieReaction.disliked ? faDownSolid : faThumbsDown}
                />
              </div>
              <button className="text-sm text-white ml-2 hover:cursor-pointer bg-red-500 rounded-full h-5 w-5 flex justify-center items-center p-2" onClick={() => handleRemoveWatchedMovie(movie)}>
                x
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

