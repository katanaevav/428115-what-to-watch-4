import React from "react";
import PropTypes from "prop-types";
import AddToMyList from "../add-to-my-list/add-to-my-list.jsx";
import {Link} from 'react-router-dom';
import {AppRoute} from "../../const.js";


const MovieButtons = (props) => {
  const {movieId, authorizationStatus, isFavorite, onFavoriteButtonClick, isMainScreen} = props;

  return (
    <div className="movie-card__buttons">
      <Link
        className="btn btn--play movie-card__button"
        type="button"
        to = {`${AppRoute.PLAYER}/${movieId}`}
      >
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="/sprite.svg#play-s"></use>
        </svg>
        <span>Play</span>
      </Link>
      <AddToMyList
        isFavorite = {isFavorite}
        onButtonClick = {onFavoriteButtonClick}
        authorizationStatus = {authorizationStatus}
      />
      {!isMainScreen ?
        <Link
          to = {`${AppRoute.FILMS}/${movieId}${AppRoute.ADD_REVIEW}`}
          className="btn movie-card__button"
        >
          {`Add review`}
        </Link> : ``
      }
    </div>
  );
};


MovieButtons.propTypes = {
  isMainScreen: PropTypes.bool.isRequired,
  movieId: PropTypes.number.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
};


export default MovieButtons;
