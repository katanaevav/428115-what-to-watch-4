import React from "react";
import PropTypes from "prop-types";
import {AppRoute} from "../../const.js";
import {Link} from "react-router-dom";


const SmallMovieCard = (props) => {
  const {movieId, movieTitle, renderPlayer, movieSmallPoster, preview, onMovieMouseOver, onMovieMouseOut} = props;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      data-key = {movieId}
    >
      {renderPlayer(preview, movieSmallPoster, onMovieMouseOver, onMovieMouseOut)}
      <h3 className="small-movie-card__title">
        <Link
          className="small-movie-card__link"
          href="movie-page.html"
          to = {`${AppRoute.FILMS}/${movieId}`}
        >
          {movieTitle}
        </Link>
      </h3>
    </article>
  );
};


SmallMovieCard.propTypes = {
  movieId: PropTypes.number.isRequired,
  movieTitle: PropTypes.string.isRequired,
  movieSmallPoster: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  onMovieMouseOver: PropTypes.func.isRequired,
  onMovieMouseOut: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
};


export default SmallMovieCard;
