import React from "react";
import PropTypes from "prop-types";
import UserBlock from "../user-block/user-block.jsx";
import Logo from "../logo/logo.jsx";
import withAddToFavoriteButton from "../../hoc/with-add-to-favorite-button/with-add-to-favorite-button.js";
import MovieButtons from "../movie-buttons/movie-buttons.jsx";


const MovieButtonsWrapper = withAddToFavoriteButton(MovieButtons);


const MoviePromo = (props) => {
  const {
    authorizationStatus,
    avatarUrl,
    movieId,
    promoMovieTitle,
    promoMovieGenre,
    promoMovieYear,
    isFavorite,
    cover,
    bigPoster,
    savingMovieFavoriteStatus,
    setFavoriteStatus
  } = props;

  return (
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src = {cover} alt = {promoMovieTitle} />
      </div>
      <h1 className="visually-hidden">WTW</h1>
      <header className="page-header movie-card__head">
        <Logo
          isMainScreen = {true}
        />
        <UserBlock
          authorizationStatus = {authorizationStatus}
          avatarUrl = {avatarUrl}
        />
      </header>
      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src = {bigPoster} alt = {promoMovieTitle} width="218" height="327" />
          </div>
          <div className="movie-card__desc">
            <h2 className="movie-card__title">{promoMovieTitle}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{promoMovieGenre}</span>
              <span className="movie-card__year">{promoMovieYear}</span>
            </p>
            <MovieButtonsWrapper
              isMainScreen = {true}
              movieId = {movieId}
              authorizationStatus = {authorizationStatus}
              isFavorite = {isFavorite}
              savingMovieFavoriteStatus = {savingMovieFavoriteStatus}
              setFavoriteStatus = {setFavoriteStatus}
            />
          </div>
        </div>
      </div>
    </section>
  );
};


MoviePromo.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
  promoMovieTitle: PropTypes.string.isRequired,
  promoMovieGenre: PropTypes.string.isRequired,
  promoMovieYear: PropTypes.number.isRequired,
  movieId: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  cover: PropTypes.string.isRequired,
  bigPoster: PropTypes.string.isRequired,
  savingMovieFavoriteStatus: PropTypes.string,
  setFavoriteStatus: PropTypes.func.isRequired,
};


export default MoviePromo;
