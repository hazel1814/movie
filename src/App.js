import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import { MovieForm } from './MovieForm';

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [retrying, setRetrying] = useState(false)

  // useEffect(() => {
  //   console.log(movies)
  // }, [movies]);



  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('https://react-http-6d731-default-rtdb.firebaseio.com/movies.json')

      if (!response.ok) {
        throw new Error('Something went wrong...')
      }

      const data = await response.json()
      const loadedMovies = []

      for (const keys in data) { 
        loadedMovies.push({
          id: keys,
          title: data[keys].title,
          openingText: data[keys].openingText,
          releaseDate: data[keys].releaseDate
        })
      }

      setMovies(loadedMovies)
      setIsLoading(false)
      setRetrying(false)
    } catch (err) {
      setError(err.message)

    }
  }, [])


  useEffect(() => {
    let intervalId
    if (retrying) {
      intervalId = setInterval(() => {
        fetchMovieHandler()
      }, 1000)
    }
    return () => clearInterval(intervalId)
  }, [retrying])


  function fetchHandler() {
    setRetrying(true)
    setIsLoading(true)
  }

  const cancelHandler = () => {
    setRetrying(false)
    setIsLoading(false)
  }

  return (
    <React.Fragment>
      <section>
        <MovieForm setMovies={setMovies} />
      </section>
      <section>
        <button onClick={fetchHandler}>Fetch Movies</button>
        <button onClick={cancelHandler} >Cancel</button>

      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} setMovies={setMovies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found no movies</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
