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
  //   fetchMovieHandler();
  //   setIsLoading(false)
  // }, []);



  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('https://swapi.dev/api/films')

      if (!response.ok) {
        throw new Error('Something went wrong...')
      }

      const data = await response.json()
      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
      })
      setMovies(transformedMovies)
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
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found no movies</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
