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
    const {promoMovieTitle, promoMovieGenre, promoMovieYear, promoMovieCover, promoMovieBigPoster, genres, movies, currentGenreFilter, onMovieTitleClick, onMovieFilterClick} = this.props;

    return (
      <React.Fragment>
        <MoviePromo
          promoMovieTitle = {promoMovieTitle}
          promoMovieGenre = {promoMovieGenre}
          promoMovieYear = {promoMovieYear}
          cover = {promoMovieCover}
          bigPoster = {promoMovieBigPoster}
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
  promoMovieTitle: PropTypes.string.isRequired,
  promoMovieGenre: PropTypes.string.isRequired,
  promoMovieYear: PropTypes.number.isRequired,
  promoMovieCover: PropTypes.string.isRequired,
  promoMovieBigPoster: PropTypes.string.isRequired,
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
};

export default Main;
