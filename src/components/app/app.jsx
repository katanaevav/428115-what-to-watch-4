import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const movieTitleClickHandler = () => {};
const movieCardMouseOverHandler = () => {};

const App = (props) => {
  const {promoMovieTitle, promoMovieGenre, promoMovieYear, movies} = props;

  return (
    <Main
      promoMovieTitle = {promoMovieTitle}
      promoMovieGenre = {promoMovieGenre}
      promoMovieYear = {promoMovieYear}
      movies = {movies}
      onMovieMouseOver = {movieCardMouseOverHandler}
      onMovieTitleClick = {movieTitleClickHandler}
    />
  );
};

App.propTypes = {
  promoMovieTitle: PropTypes.string.isRequired,
  promoMovieGenre: PropTypes.string.isRequired,
  promoMovieYear: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        smallPoster: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
      })).isRequired,
};

export default App;
