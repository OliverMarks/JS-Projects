import React, { useState, useEffect } from "react";
import axios from "axios";


import SearchBar from "./components/searchBar";
import MovieCard from "./components/MovieCard";
import Watched from "./components/watched";

function App() {
  const [watchList, setWatchList] = useState([]);
  const [watchedList, setWatchedList] = useState([]);
  const [suggestedMovies, setSuggestedMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // // Fetch watchlist and watchedlist on initial render
  // useEffect(() => {
  //   const storedWatchList = JSON.parse(localStorage.getItem("watchList"));
  //   const storedWatchedList = JSON.parse(localStorage.getItem("watchedList"));

  //   if (storedWatchList) {
  //     setWatchList(storedWatchList);
  //   }
  //   if (storedWatchedList) {
  //     setWatchedList(storedWatchedList);
  //   }
  // }, []);

  // // Update local storage when watchlist or watchedlist change
  // useEffect(() => {
  //   localStorage.setItem("watchList", JSON.stringify(watchList));
  // }, [watchList]);

  // useEffect(() => {
  //   localStorage.setItem("watchedList", JSON.stringify(watchedList));
  // }, [watchedList]);

  

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
    setWatchList((prevWatchList) => [movie, ...prevWatchList]);
  }

  // Remove movie from watchlist
  function handleRemoveMovie(movie) {
    setWatchList((prevWatchList) =>
      prevWatchList.filter((item) => item.id !== movie.id)
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

    //   const [content, setContent] = React.useState("")
    //   <textarea 
    //   value={content} 
    //   onChange={e => setContent(e.currentTarget.value)} 
    // />  
      
      return (
      <div className="bg-gray-200 min-h-screen">
      <div className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
      
      
      <SearchBar 
      onSearch={handleSearchMovies}
      handleAddMovie = {handleAddMovie} />
      </div>
      </div>
      <div className="container mx-auto py-4">
     
      <h1 className="flex justify-center mb-2 font-bold">Your Watch List</h1>

      <div className="w-full flex mx-2 scroll-smooth flex-row overflow-x-auto snap-x-mandatory">
  {watchList.map((movie) => (
    <div key={movie.id} className="w-full lg:w-1/3 xl:w-1/4 px-4 mb-8 scroll-snap-align-start">
      <MovieCard
        movie={movie}
        handleRemoveMovie={handleRemoveMovie}
        onWatched={handleWatchedMovie}
      />
    </div>
  ))}
</div>

      
      <Watched
      watchedMovies={watchedList}
      handleRemoveWatchedMovie = {handleRemoveWatchedMovie}/>
      
      
      </div>
      
      </div>

    
      
      );
      }
      
      export default App;
