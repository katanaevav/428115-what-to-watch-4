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
  }

  render() {
    const {authorizationStatus, avatarUrl, promoMovie, genres, movies, currentGenreFilter, onMovieFilterClick, savingMovieFavoriteStatus, setFavoriteStatus} = this.props;
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
  onMovieFilterClick: PropTypes.func.isRequired,
  onPlayMovieClick: PropTypes.func.isRequired,
  savingMovieFavoriteStatus: PropTypes.string,
  setFavoriteStatus: PropTypes.func.isRequired,
};

export default Main;
