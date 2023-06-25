import React, { useState, useEffect } from "react"
import axios from "axios"
import { initializeApp } from "firebase/app"
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"
import { getDatabase, ref, push, update, get, onValue } from 'firebase/database'



import {useAuthState} from 'react-firebase-hooks/auth'



import SearchBar from "./components/searchBar"
import MovieCard from "./components/MovieCard"
import Watched from "./components/watched"


const firebaseConfig = {
  apiKey: "AIzaSyAMO-Q8ZS4u3mOeFXKiy07SHal75IsF7GQ",
  authDomain: "what2watch-22ac7.firebaseapp.com",
  projectId: "what2watch-22ac7",
  databaseURL: 'https://what2watch-22ac7-default-rtdb.europe-west1.firebasedatabase.app',
  storageBucket: "what2watch-22ac7.appspot.com",
  messagingSenderId: "212110467799",
  appId: "1:212110467799:web:ddd6c71827ca5fec258692",
  measurementId: "G-R31EPEZ5RV"
}
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const database = getDatabase(app)


function App() {


  const [watchList, setWatchList] = useState([])
  const [watchedList, setWatchedList] = useState([])
  const [suggestedMovies, setSuggestedMovies] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [userUid, setUserUid] = useState('')
  const [userName, setUserName] = useState('')
  const [userPhotoURL, setUserPhotoURL] = useState('')

  const UserSignIn = () => {
    const auth = getAuth()
    const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider()
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result)
          const token = credential.accessToken
          // The signed-in user info.
          const user = result.user
          const userUid = user.uid
          
          const userName = user.displayName
          const userPhotoURL = user.photoURL
          setUserName(userName)
          setUserPhotoURL(userPhotoURL)
          setUserUid(userUid)

          
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code
          const errorMessage = error.message
          // The email of the user's account used.
          const email = error.email
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error)
          // ...
        })
    }
  
    return (
      <div className="flex flex-row items-center justify-center mr-2">

      {userName && (
        <div className="flex flex-row items-center justify-center mr-2">
          {/* <h3>Welcome, {userName}!</h3> */}
          {/* <button className="bg-gray-200 px-2 rounded-lg text-xs h-8" onClick={signOutUser}>Sign Out</button> */}
          <div className="relative">
          <img src={userPhotoURL} alt="Profile" className="rounded-full h-16 w-16 mr-4"  />
          <div onClick={signOutUser}
          class="opacity-0 hover:opacity-100 hover:bg-red-800 hover:cursor-pointer rounded-full duration-300 absolute inset-0 z-10 flex justify-center items-center text-white font-semibold h-16 w-16">Sign Out</div>
          </div>
        </div>
      )}
      {!userName && (
        <button className="bg-gray-200 p-1 rounded-full mr-2 h-16 w-16 " onClick={signInWithGoogle}>Sign In</button>
      )}
    </div>
  )
}

const signOutUser = () => {
const auth = getAuth();
signOut(auth).then(() => {
  setUserName(null)
  setUserPhotoURL(null)
  setUserUid(null)
  // setWatchList([])
  // setWatchedList([])
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
}



    
const loadWatchlistsFromFirebase = () => {
  const database = getDatabase();
  const userId = userUid;
  const watchlistRef = ref(database, `watchlists/${userId}`);

  onValue(watchlistRef, (snapshot) => {
    const watchlistData = snapshot.val();
    console.log(watchlistData);
    if (watchlistData) {
      const watchlistKey = Object.keys(watchlistData)[0]; // Get the dynamic key
      const watchlist = watchlistData[watchlistKey]; // Retrieve the watchlist object

      const watchList = watchlist?.watchList ? Object.values(watchlist.watchList) : [];
      const watchedList = watchlist?.watchedList ? Object.values(watchlist.watchedList) : [];

      // Set the state of watchList and watchedList
      setWatchList(watchList);
      setWatchedList(watchedList);
    }
  }, (error) => {
    console.error('Error loading watchlists:', error);
  });
};

useEffect(() => {
  if (userUid) {
    loadWatchlistsFromFirebase();
  }
}, [userUid]);



  



const saveWatchlistToFirebase = async () => {
  const userId = userUid;
  const watchlistRef = ref(database, `watchlists/${userId}`);

  // Check if the watchlist with the same title already exists
  const querySnapshot = await get(watchlistRef);
  const existingWatchlist = querySnapshot.val();

  const watchlistData = {
    listTitle: "mywatchlist",
    watchList: watchList,
    watchedList: watchedList
    // ...
  };

  if (existingWatchlist) {
    // Update the existing watchlist
    const existingWatchlistId = Object.keys(existingWatchlist)[0];
    const updatedWatchlistRef = ref(database, `watchlists/${userId}/${existingWatchlistId}`);
    
    update(updatedWatchlistRef, watchlistData)
      .then(() => {
        console.log('Watchlist updated:', existingWatchlistId);
      })
      .catch((error) => {
        console.error('Error updating watchlist:', error);
      });
  } else {
    // Create a new watchlist
    const newWatchlistRef = push(watchlistRef);
    const newWatchlistId = newWatchlistRef.key;

    update(newWatchlistRef, watchlistData)
      .then(() => {
        console.log('Watchlist created with ID:', newWatchlistId);
      })
      .catch((error) => {
        console.error('Error creating watchlist:', error);
      });
  }
};


useEffect(() => {
  if (userUid) {
    saveWatchlistToFirebase()  }
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
    )
    setSearchResults(response.data.results)
  }

  // Add movie to watchlist
  function handleAddMovie(movie) {
    setWatchList((prevWatchList) => [movie, ...prevWatchList])
  }

  // Remove movie from watchlist
  function handleRemoveMovie(movie) {
    setWatchList((prevWatchList) =>
      prevWatchList.filter((item) => item.id !== movie.id)
      )
      }
      
      // Add movie to watchedlist
      function handleWatchedMovie(movie) {
      setWatchedList((prevWatchedList) => [...prevWatchedList, movie])
      
      setWatchList((prevWatchList) =>
      prevWatchList.filter((item) => item.id !== movie.id)
      )
      }
      
      // Remove movie from watchedlist
      function handleRemoveWatchedMovie(movie) {
      setWatchedList((prevWatchedList) =>
      prevWatchedList.filter((item) => item.id !== movie.id)
      )
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
      <UserSignIn  />
      </div>
      </div>
      <div className="container mx-auto py-4">
     
      <h1 className="flex justify-center mb-2 font-bold">
  {userName ? `${userName}'s Watch List` : "Create a Watch List - Sign in to Save"}</h1>

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

    
      
      )
      }
      
      export default App
