import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import {getFilteredMovies} from "../../selectors.js";
import {Screens, MAX_SIMILAR_MOVIES_COUNT} from "../../const.js";
import withMovieTabs from "../../hoc/with-movie-tabs/with-movie-tabs.js";
import CinemaScreen from "../cinema-screen/cinema-screen.jsx";

const MoviePageWrapper = withMovieTabs(MoviePage);

class App extends PureComponent {
  constructor(props) {
    super(props);

    this._movieCardMouseOverHandler = this._movieCardMouseOverHandler.bind(this);
  }

  _getMovieById(movieId) {
    const {movies} = this.props;

    return movies.find((movie) => movie.id === Number.parseInt(movieId, 10));
  }

  _movieCardMouseOverHandler() {}


  _renderApp() {
    const {promoMovie, movies, genres, currentGenreFilter, onMovieFilterClick, onMovieTitleClick, selectedMovieId, currentPage} = this.props;
    const {title: promoMovieTitle, genre: promoMovieGenre, year: promoMovieYear, bigPoster: promoMoviePoster, cover: promoMovieCover} = promoMovie;

    switch (currentPage) {
      case Screens.MOVIE_PAGE_SCREEN:
        const {id, title, genre, year, runTime, bigPoster, cover, ratingScore, ratingCount, directors, starrings, descriptions, reviews} = this._getMovieById(selectedMovieId);
        const similarMovies = movies.filter((movie) => (movie.genre === genre) && (movie.id !== id)).slice(0, MAX_SIMILAR_MOVIES_COUNT);
        return (
          <MoviePageWrapper
            id = {id}
            title = {title}
            genre = {genre}
            year = {year}
            runTime = {runTime}
            bigPoster = {bigPoster}
            cover = {cover}
            ratingScore = {ratingScore}
            ratingCount = {ratingCount}
            directors = {directors}
            starrings = {starrings}
            descriptions = {descriptions}
            reviews = {reviews}
            similarMovies = {similarMovies}
            onMovieTitleClick = {onMovieTitleClick}
          />
        );

      default:
        return (
          <Main
            promoMovieTitle = {promoMovieTitle}
            promoMovieGenre = {promoMovieGenre}
            promoMovieYear = {promoMovieYear}
            promoMovieCover = {promoMovieCover}
            promoMovieBigPoster = {promoMoviePoster}
            genres = {genres}
            movies = {movies}
            currentGenreFilter = {currentGenreFilter}
            onMovieTitleClick = {onMovieTitleClick}
            onMovieFilterClick = {onMovieFilterClick}
          />
        );
    }
  }

  render() {
    const {promoMovie} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film">
            <MoviePageWrapper
              id = {0}
              title = {promoMovie.title}
              genre = {promoMovie.genre}
              year = {promoMovie.year}
              runTime = {promoMovie.runTime}
              bigPoster = {promoMovie.bigPoster}
              cover = {promoMovie.cover}
              ratingScore = {promoMovie.ratingScore}
              ratingCount = {promoMovie.ratingCount}
              directors = {promoMovie.directors}
              starrings = {promoMovie.starrings}
              descriptions = {promoMovie.descriptions}
              reviews = {promoMovie.reviews}
              similarMovies = {this.props.movies}
              onMovieTitleClick = {() => {}}
            />
          </Route>
          <Route exact path="/dev-player">
            <CinemaScreen />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

}

App.propTypes = {
  promoMovie: PropTypes.shape().isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        smallPoster: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
      })).isRequired,
  genres: PropTypes.array.isRequired,
  currentGenreFilter: PropTypes.string.isRequired,
  onMovieFilterClick: PropTypes.func.isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
  selectedMovieId: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  currentGenreFilter: state.currentGenreFilter,
  promoMovie: state.PromoMovie,
  movies: getFilteredMovies(state.movies, state.currentGenreFilter),
  genres: state.genres,
  selectedMovieId: state.selectedMovieId,
  currentPage: state.currentPage,
});

const mapDispatchToProps = (dispatch) => ({
  onMovieFilterClick(filterName) {
    dispatch(ActionCreator.setCurrentFilter(filterName));
  },

  onMovieTitleClick(movieId) {
    dispatch(ActionCreator.openMovieScreen(movieId));
  }
});


export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
