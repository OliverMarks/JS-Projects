import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/searchBar";
import MovieCard from "./components/MovieCard";

function App() {
  const [watchList, setWatchList] = useState([]);
  const [watchedList, setWatchedList] = useState([]);
  const [suggestedMovies, setSuggestedMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // Fetch watchlist and watchedlist on initial render
  useEffect(() => {
    const storedWatchList = JSON.parse(localStorage.getItem("watchList"));
    const storedWatchedList = JSON.parse(localStorage.getItem("watchedList"));

    if (storedWatchList) {
      setWatchList(storedWatchList);
    }
    if (storedWatchedList) {
      setWatchedList(storedWatchedList);
    }
  }, []);

  // Update local storage when watchlist or watchedlist change
  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  useEffect(() => {
    localStorage.setItem("watchedList", JSON.stringify(watchedList));
  }, [watchedList]);

  // Get suggested movies based on watchlist and watchedlist
  useEffect(() => {
    async function getSuggestedMovies() {
      const watchlistIds = watchList.map((movie) => movie.id);
      const watchedlistIds = watchedList.map((movie) => movie.id);
      const allIds = [...watchlistIds, ...watchedlistIds];

      // Use GPT to get suggested movie ids
      const gptResponse = await axios.post(
        "https://api.openai.com/v1/engines/davinci-codex/completions",
        {
          prompt: `Suggest some movies similar to ${allIds.join(
            ","
          )}. Include title, overview, and poster.`,
          max_tokens: 60,
          n: 1,
          stop: "Poster:",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );
      const suggestedIds = gptResponse.data.choices[0].text
        .split("\n")
        .filter((line) => line.startsWith("ID:"))
        .map((line) => parseInt(line.replace("ID:", "")));

      // Fetch suggested movies from TMDB API
      const suggestedMoviesResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${suggestedIds.join(",")}`,
        {
          params: {
            api_key: process.env.REACT_APP_TMDB_API_KEY,
          },
        }
      );
      const suggestedMoviesData = suggestedMoviesResponse.data.results;

      setSuggestedMovies(suggestedMoviesData);
    }

    getSuggestedMovies();
  }, [watchList, watchedList]);

  // Search movies
  async function handleSearchMovies(query) {
    const response = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          api_key: process.env.REACT_APP_TMDB_API_KEY,
          query: query,
        },
      }
    );
    setSearchResults(response.data.results);
  }

  // Add movie to watchlist
  function handleAddMovie(movie) {
    setWatchList((prevWatchList) => [...prevWatchList, movie]);
  }

  // Remove movie from watchlist
  function handleRemoveMovie(movie) {
    setWatchList((prevWatchList) =>
      prevWatchList.filter((item) => item.id=== movie.id)
      );
      }
      
      // Add movie to watchedlist
      function handleWatchedMovie(movie) {
      setWatchedList((prevWatchedList) => [...prevWatchedList, movie]);
      setWatchList((prevWatchList) =>
      prevWatchList.filter((item) => item.id !== movie.id)
      );
      }
      
      // Remove movie from watchedlist
      function handleRemoveWatchedMovie(movie) {
      setWatchedList((prevWatchedList) =>
      prevWatchedList.filter((item) => item.id !== movie.id)
      );
      }
      
      return (
      <div className="bg-gray-200 min-h-screen">
      <div className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-gray-200">Movie App</h1>
      <SearchBar onSearch={handleSearchMovies} />
      </div>
      </div>
      <div className="container mx-auto py-8">
      <div className="flex flex-wrap -mx-4">
      {searchResults.map((movie) => (
      <div key={movie.id} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8">
      <MovieCard
      movie={movie}
      onAdd={handleAddMovie}
      isWatched={watchedList.some((item) => item.id === movie.id)}
      onWatched={handleWatchedMovie}
      />
      </div>
      ))}
      {watchList.map((movie) => (
      <div key={movie.id} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8">
      <MovieCard
                   movie={movie}
                   onRemove={handleRemoveMovie}
                   onWatched={handleWatchedMovie}
                 />
      </div>
      ))}
      {watchedList.map((movie) => (
      <div key={movie.id} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8">
      <MovieCard
                   movie={movie}
                   onRemove={handleRemoveWatchedMovie}
                   isWatched
                 />
      </div>
      ))}
      {suggestedMovies.map((movie) => (
      <div key={movie.id} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8">
      <MovieCard
      movie={movie}
      onAdd={handleAddMovie}
      isWatched={watchedList.some((item) => item.id === movie.id)}
      onWatched={handleWatchedMovie}
      />
      </div>
      ))}
      </div>
      </div>
      </div>
      );
      }
      
      export default App;
