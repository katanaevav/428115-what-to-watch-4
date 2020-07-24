import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MoviesList from "../movies-list/movies-list.jsx";
import GenreList from "../genre-list/genre-list.jsx";
import withMoviesList from "../../hoc/with-movies-list/with-movies-list.js";
import MoviePromo from "../movie-promo/movie-promo.jsx";
import Logo from "../logo/logo.jsx";

const MoviesListWrapper = withMoviesList(MoviesList);

class Main extends PureComponent {
  constructor(props) {
    super(props);

    this._playMoviePromoClickHandler = this._playMoviePromoClickHandler.bind(this);
  }

  _playMoviePromoClickHandler() {
    const {promoMovie, onPlayMovieClick} = this.props;
    const {id} = promoMovie;
    onPlayMovieClick(id);
  }

  render() {
    const {onOpenAuthScreen, authorizationStatus, avatarUrl, promoMovie, genres, movies, currentGenreFilter, onMovieTitleClick, onMovieFilterClick} = this.props;
    const {title, genre, year, cover, bigPoster} = promoMovie;

    return (
      <React.Fragment>
        <MoviePromo
          onOpenAuthScreen = {onOpenAuthScreen}
          authorizationStatus = {authorizationStatus}
          avatarUrl = {avatarUrl}
          promoMovieTitle = {title}
          promoMovieGenre = {genre}
          promoMovieYear = {year}
          cover = {cover}
          bigPoster = {bigPoster}
          onPlayPromoMovieClick = {this._playMoviePromoClickHandler}
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
              onMovieTitleClick = {onMovieTitleClick}
            />
          </section>

          <footer className="page-footer">
            <Logo
              light = {true}
            />

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

Main.propTypes = {
  onOpenAuthScreen: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
  promoMovie: PropTypes.object.isRequired,
  genres: PropTypes.array.isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        smallPoster: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
      })).isRequired,
  currentGenreFilter: PropTypes.string.isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
  onMovieFilterClick: PropTypes.func.isRequired,
  onPlayMovieClick: PropTypes.func.isRequired,
};

export default Main;
