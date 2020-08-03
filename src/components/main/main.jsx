import React from "react";
import PropTypes from "prop-types";
import MoviesList from "../movies-list/movies-list.jsx";
import GenreList from "../genre-list/genre-list.jsx";
import withMoviesList from "../../hoc/with-movies-list/with-movies-list.js";
import MoviePromo from "../movie-promo/movie-promo.jsx";
import Logo from "../logo/logo.jsx";
import {MOVIE_PROP_TYPE} from "../../const.js";


const MoviesListWrapper = withMoviesList(MoviesList);


const Main = (props) => {
  const {authorizationStatus, avatarUrl, promoMovie, genres, movies, currentGenreFilter, onMovieFilterClick, savingMovieFavoriteStatus, setFavoriteStatus} = props;
  const {title, genre, year, cover, bigPoster, isFavorite, id} = promoMovie;

  return (
    <React.Fragment>
      <MoviePromo
        authorizationStatus = {authorizationStatus}
        avatarUrl = {avatarUrl}
        promoMovieTitle = {title}
        promoMovieGenre = {genre}
        promoMovieYear = {year}
        isFavorite = {isFavorite}
        movieId = {id}
        cover = {cover}
        bigPoster = {bigPoster}
        savingMovieFavoriteStatus = {savingMovieFavoriteStatus}
        setFavoriteStatus = {setFavoriteStatus}
      />

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList
            currentGenre = {currentGenreFilter}
            genres = {genres}
            onGenreClick = {onMovieFilterClick}
          />

          <MoviesListWrapper
            movies = {movies}
          />
        </section>

        <footer className="page-footer">
          <Logo
            isMainScreen = {true}
            light = {true}
          />

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};


Main.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
  promoMovie: MOVIE_PROP_TYPE.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  movies: PropTypes.arrayOf(MOVIE_PROP_TYPE).isRequired,
  currentGenreFilter: PropTypes.string.isRequired,
  onMovieFilterClick: PropTypes.func.isRequired,
  savingMovieFavoriteStatus: PropTypes.string,
  setFavoriteStatus: PropTypes.func.isRequired,
};


export default Main;
