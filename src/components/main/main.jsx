import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MoviesList from "../movies-list/movies-list.jsx";
import GenreList from "../genre-list/genre-list.jsx";
import withMoviesList from "../../hoc/with-movies-list/with-movies-list.js";
import withAddToFavoriteButton from "../../hoc/with-add-to-favorite-button/with-add-to-favorite-button.js";
import MoviePromo from "../movie-promo/movie-promo.jsx";
import Logo from "../logo/logo.jsx";

const MoviePromoWrapper = withAddToFavoriteButton(MoviePromo);
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
    const {authorizationStatus, avatarUrl, promoMovie, genres, movies, currentGenreFilter, onMovieTitleClick, onMovieFilterClick, savingMovieFavoriteStatus, setFavoriteStatus} = this.props;
    const {title, genre, year, cover, bigPoster, isFavorite, id} = promoMovie;

    return (
      <React.Fragment>
        <MoviePromoWrapper
          authorizationStatus = {authorizationStatus}
          avatarUrl = {avatarUrl}
          promoMovieTitle = {title}
          promoMovieGenre = {genre}
          promoMovieYear = {year}
          movieIsFavorite = {isFavorite}
          movieId = {id}
          cover = {cover}
          bigPoster = {bigPoster}
          onPlayPromoMovieClick = {this._playMoviePromoClickHandler}
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
  savingMovieFavoriteStatus: PropTypes.string,
  setFavoriteStatus: PropTypes.func.isRequired,
};

export default Main;
