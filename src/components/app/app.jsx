import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/state/state.js";
import {Screens, MAX_SIMILAR_MOVIES_COUNT} from "../../const.js";
import withMovieTabs from "../../hoc/with-movie-tabs/with-movie-tabs.js";
import withNewReview from "../../hoc/with-new-review/with-new-review.js";
import CinemaScreen from "../cinema-screen/cinema-screen.jsx";
import withCinemaVideoPlayer from "../../hoc/with-cinema-video-player/with-cinema-video-player.js";
import {getCurrentGenreFilter, getCurrentPage, getSelectedMovieId, getFilteredMovies, getAuthMessage} from "../../reducer/state/selectors.js";
import {getMovies, getPromoMovie, getGenres, getMovieComments, getSavingMovieCommentStatus} from "../../reducer/data/selectors.js";
import {getAuthorizationStatus, getAvatarUrl} from "../../reducer/user/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import AddReview from "../add-review/add-review.jsx";

const CinemaScreenWrapped = withCinemaVideoPlayer(CinemaScreen);
const AddReviewWrapped = withNewReview(AddReview);

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
    const {
      onOpenAuthScreen,
      authMessage,
      avatarUrl,
      authorizationStatus,
      login,
      promoMovie,
      movies,
      genres,
      currentGenreFilter,
      onMovieFilterClick,
      onMovieTitleClick,
      onPlayMovieClick,
      selectedMovieId,
      currentPage,
      onExitVideoPlayer,
      movieComments} = this.props;

    if (movies.length && promoMovie) {
      switch (currentPage) {
        case Screens.MOVIE_PAGE_SCREEN:
          const selecdedMovie = this._getMovieById(selectedMovieId);
          const {id, genre} = selecdedMovie;
          const similarMovies = movies.filter((movie) => (movie.genre === genre) && (movie.id !== id)).slice(0, MAX_SIMILAR_MOVIES_COUNT);

          return (
            <MoviePageWrapper
              onOpenAuthScreen = {onOpenAuthScreen}
              authorizationStatus = {authorizationStatus}
              avatarUrl = {avatarUrl}
              movie={selecdedMovie}
              comments={movieComments}
              similarMovies = {similarMovies}
              onMovieTitleClick = {onMovieTitleClick}
              onPlayMovieClick = {onPlayMovieClick}
            />
          );

        case Screens.CINEMA_SCREEN:
          return (
            <CinemaScreenWrapped
              movie={this._getMovieById(selectedMovieId)}
              onExitVideoPlayer={onExitVideoPlayer}
            />
          );

        case Screens.AUTH_SCREEN:
          return (
            <SignIn
              message={authMessage}
              onSubmit={login}
            />
          );

        default:
          return (
            <Main
              onOpenAuthScreen = {onOpenAuthScreen}
              authorizationStatus = {authorizationStatus}
              avatarUrl = {avatarUrl}
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

    return null;
  }

  render() {
    const {movies, savingMovieCommentStatus} = this.props;

    if (movies.length) {
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
                onExitVideoPlayer={() => {}}
              />
            </Route>
            <Route exact path="/dev-signin">
              <SignIn
                message={``}
                onSubmit={() => {}}
              />
            </Route>
            <Route exact path="/dev-review">
              <AddReviewWrapped
                movie={movies[1]}
                onOpenAuthScreen = {() => {}}
                authorizationStatus = {this.props.authorizationStatus}
                avatarUrl = {this.props.avatarUrl}
                onSaveComment = {this.props.saveComment}
                savingMovieCommentStatus = {savingMovieCommentStatus}
              />
            </Route>
          </Switch>
        </BrowserRouter>
      );
    }

    return null;

  }

}

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  avatarUrl: PropTypes.string,
  savingMovieCommentStatus: PropTypes.string,
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
  onExitVideoPlayer: PropTypes.func.isRequired,
  movieComments: PropTypes.array,
  getComments: PropTypes.func,
  saveComment: PropTypes.func,
  onOpenAuthScreen: PropTypes.func.isRequired,
  authMessage: PropTypes.string,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  currentGenreFilter: getCurrentGenreFilter(state),
  promoMovie: getPromoMovie(state),
  movies: getFilteredMovies(getMovies(state), getCurrentGenreFilter(state)),
  genres: getGenres(state),
  selectedMovieId: getSelectedMovieId(state),
  currentPage: getCurrentPage(state),
  movieComments: getMovieComments(state),
  authMessage: getAuthMessage(state),
  avatarUrl: getAvatarUrl(state),
  savingMovieCommentStatus: getSavingMovieCommentStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  saveComment(comment, action) {
    dispatch(DataOperation.saveMovieComment(comment, action));
  },

  getComments(movieId) {
    dispatch(DataOperation.loadMovieComments(movieId));
  },

  login(authData) {
    dispatch(UserOperation.login(authData));
  },

  onMovieFilterClick(filterName) {
    dispatch(ActionCreator.setCurrentFilter(filterName));
  },

  onMovieTitleClick(movieId) {
    dispatch(ActionCreator.openMovieScreen(movieId));
    dispatch(DataOperation.loadMovieComments(movieId));
  },

  onPlayMovieClick(movieId) {
    dispatch(ActionCreator.openCinemaScreen(movieId));
  },

  onExitVideoPlayer(movieId) {
    dispatch(ActionCreator.closeCinemaScreen(movieId));
  },

  onOpenAuthScreen() {
    dispatch(ActionCreator.openAuthPage());
  },
});


export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
