import { useState } from "react";

const SearchBar = ({ handleAddMovie }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const API_KEY = "88ca1b22d9af733af53ea8997ef3afd1";
  const BASE_URL = "https://api.themoviedb.org/3";
  const SEARCH_ENDPOINT = "/search/movie";

  const handleSearch = (event) => {
    event.preventDefault();

    if (searchTerm.length > 0) {
      fetch(
        `${BASE_URL}${SEARCH_ENDPOINT}?api_key=${API_KEY}&query=${searchTerm}`
      )
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data.results);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectMovie = (movie) => {
    handleAddMovie(movie);
    setSearchResults([]);
    setSearchTerm("");
  };

  return (
    <div className="px-2"> 
      <h1 className="text-2xl font-semibold text-gray-200">What2Watch</h1>

      <form onSubmit={handleSearch}>
        <label htmlFor="search">
          <input
            className="border-black-400 border-2 pl-2 w-full"
            type="text"
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>
      </form>

      {searchResults.length > 0 && (
        <div className="absolute mt-1 w-full p-2 bg-white shadow-lg rounded-bl rounded-br max-h-56 overflow-y-auto">
          {searchResults.map((movie) => (
            <div
              key={movie.id}
              className="cursor-pointer hover:bg-black hover:bg-opacity-10 p-2"
              onClick={() => handleSelectMovie(movie)}
            >
              <span className="font-black">{movie.title}</span> -{" "}
              <span>{movie.release_date.slice(0, 4)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
