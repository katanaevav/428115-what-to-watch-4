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
import withCinemaVideoPlayer from "../../hoc/with-cinema-video-player/with-cinema-video-player.js";

const CinemaScreenWrapped = withCinemaVideoPlayer(CinemaScreen);

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
    const {promoMovie, movies, genres, currentGenreFilter, onMovieFilterClick, onMovieTitleClick, onPlayMovieClick, selectedMovieId, currentPage} = this.props;

    switch (currentPage) {
      case Screens.MOVIE_PAGE_SCREEN:
        const selecdedMovie = this._getMovieById(selectedMovieId);
        const {id, genre} = selecdedMovie;
        const similarMovies = movies.filter((movie) => (movie.genre === genre) && (movie.id !== id)).slice(0, MAX_SIMILAR_MOVIES_COUNT);
        return (
          <MoviePageWrapper
            movie={selecdedMovie}
            similarMovies = {similarMovies}
            onMovieTitleClick = {onMovieTitleClick}
            onPlayMovieClick = {onPlayMovieClick}
          />
        );

      case Screens.CINEMA_SCREEN:
        return (
          <CinemaScreenWrapped
            movie={this._getMovieById(selectedMovieId)}
          />
        );

      default:
        return (
          <Main
            promoMovie = {promoMovie}
            genres = {genres}
            movies = {movies}
            currentGenreFilter = {currentGenreFilter}
            onMovieTitleClick = {onMovieTitleClick}
            onMovieFilterClick = {onMovieFilterClick}
            onPlayMovieClick = {onPlayMovieClick}
          />
        );
    }
  }

  render() {
    const {movies} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film">
            <MoviePageWrapper
              movie={this._getMovieById(0)}
              similarMovies = {movies}
              onMovieTitleClick = {() => {}}
              onPlayMovieClick = {() => {}}
            />
          </Route>
          <Route exact path="/dev-player">
            <CinemaScreenWrapped
              movie={this._getMovieById(1)}
            />
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
  onPlayMovieClick: PropTypes.func.isRequired,
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
  },

  onPlayMovieClick(movieId) {
    dispatch(ActionCreator.openCinemaScreen(movieId));
  },
});


export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
