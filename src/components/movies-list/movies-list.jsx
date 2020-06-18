import React from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";

const MoviesList = (props) => {
  const {movies, onMovieMouseOver, onMovieTitleClick} = props;

  const movieCards = movies.map((movie) => (
    <SmallMovieCard
      key={movie.title}
      movieTitle={movie.title}
      movieSmallPoster={movie.smallPoster}
      onMovieMouseOver={onMovieMouseOver}
      onMovieTitleClick={onMovieTitleClick}
    />
  ));

  return (
    <div className="catalog__movies-list">
      {movieCards}
    </div>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        smallPoster: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
      })).isRequired,
  onMovieMouseOver: PropTypes.func.isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
};

export default MoviesList;
