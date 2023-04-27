import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
  async function deleteMovie() {
    const response = await fetch(
      `https://react-http-6d731-default-rtdb.firebaseio.com/movies/${props.id}.json`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      throw new Error('Could not delete movie.');
    }

    props.setMovies((prevMovies) => {
      return prevMovies.filter((movie) => movie.id !== props.id);
    });
  }
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button className={classes.btn} onClick={deleteMovie}>Delete movie</button>
    </li>

  );
};

export default Movie;
