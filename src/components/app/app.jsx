import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const movieTitleClickHandler = () => {};

const App = (props) => {
  const {promoMovieTitle, promoMovieGenre, promoMovieYear, movies} = props;

  return (
    <Main
      promoMovieTitle = {promoMovieTitle}
      promoMovieGenre = {promoMovieGenre}
      promoMovieYear = {promoMovieYear}
      movies = {movies}
      onMovieTitleClick = {movieTitleClickHandler}
    />
  );
};

App.propTypes = {
  promoMovieTitle: PropTypes.string.isRequired,
  promoMovieGenre: PropTypes.string.isRequired,
  promoMovieYear: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(PropTypes.string),
};

export default App;
