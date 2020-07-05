import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MoviesList from "../movies-list/movies-list.jsx";
import GenreList from "../genre-list/genre-list.jsx";
import {NO_FILTER} from "../../const.js";

class Main extends PureComponent {
  constructor(props) {
    super(props);

    this._genreClickHandler = this._genreClickHandler.bind(this);

    this.state = {
      currentGenre: NO_FILTER,
    };
  }

  _genreClickHandler(genreName) {
    this.setState({
      currentGenre: genreName,
    });
  }

  render() {
    const {promoMovieTitle, promoMovieGenre, promoMovieYear, genres, movies, currentGenreFilter, onMovieTitleClick, onMovieFilterClick} = this.props;
    const moviesToRender = currentGenreFilter === NO_FILTER ? movies : movies.slice().filter((movie) => movie.genre === currentGenreFilter);

    return (
      <React.Fragment>
        <section className="movie-card">
          <div className="movie-card__bg">
            <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <a className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="user-block">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </div>
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__info">
              <div className="movie-card__poster">
                <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
              </div>

              <div className="movie-card__desc">
                <h2 className="movie-card__title">{promoMovieTitle}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{promoMovieGenre}</span>
                  <span className="movie-card__year">{promoMovieYear}</span>
                </p>

                <div className="movie-card__buttons">
                  <button className="btn btn--play movie-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="/sprite.svg#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list movie-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="/sprite.svg#add"></use>
                    </svg>
                    <span>My list</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>

            <GenreList
              currentGenre = {currentGenreFilter}
              genres = {genres}
              onGenreClick = {onMovieFilterClick}
            />

            <MoviesList
              movies = {moviesToRender}
              onMovieTitleClick = {onMovieTitleClick}
            />

            <div className="catalog__more">
              <button className="catalog__button" type="button">Show more</button>
            </div>
          </section>

          <footer className="page-footer">
            <div className="logo">
              <a className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

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
