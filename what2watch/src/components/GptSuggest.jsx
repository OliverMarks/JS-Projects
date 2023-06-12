// Get suggested movies based on watchlist and watchedlist
  // useEffect(() => {
  //   async function getSuggestedMovies() {
  //     const watchlistIds = watchList.map((movie) => movie.id);
  //     const watchedlistIds = watchedList.map((movie) => movie.id);
  //     const allIds = [...watchlistIds, ...watchedlistIds];

  //     // Use GPT to get suggested movie ids
  //     const gptResponse = await axios.post(
  //       "https://api.openai.com/v1/engines/davinci-codex/completions",
  //       {
  //         prompt: `Suggest some movies similar to ${allIds.join(
  //           ","
  //         )}. your response should consist of 5 movie titles and just their titles`,
  //         max_tokens: 60,
  //         n: 1,
  //         stop: "titles:",
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
  //         },
  //       }
  //     );
  //     const suggestedIds = gptResponse.data.choices[0].text
  //       .split("\n")
  //       .filter((line) => line.startsWith("ID:"))
  //       .map((line) => parseInt(line.replace("ID:", "")));

  //     // Fetch suggested movies from TMDB API
  //     const suggestedMoviesResponse = await axios.get(
  //       `https://api.themoviedb.org/3/movie/${suggestedIds.join(",")}`,
  //       {
  //         params: {
  //           api_key: process.env.REACT_APP_TMDB_API_KEY,
  //         },
  //       }
  //     );
  //     const suggestedMoviesData = suggestedMoviesResponse.data.results;

  //     setSuggestedMovies(suggestedMoviesData);
  //   }

  //   getSuggestedMovies();
  // }, [watchList, watchedList]);



  {/* {suggestedMovies.map((movie) => (
      <div key={movie.id} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8">
      <MovieCard
      movie={movie}
      onAdd={handleAddMovie}
      isWatched={watchedList.some((item) => item.id === movie.id)}
      onWatched={handleWatchedMovie}
      />
      </div>
      ))} */}