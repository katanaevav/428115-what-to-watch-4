import React, {PureComponent} from "react";
import {Switch, Route, Router, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/state/state.js";
import {Screens, MAX_SIMILAR_MOVIES_COUNT, AppRoute, AuthorizationStatus} from "../../const.js";
import withMovieTabs from "../../hoc/with-movie-tabs/with-movie-tabs.js";
import withNewReview from "../../hoc/with-new-review/with-new-review.js";
import CinemaScreen from "../cinema-screen/cinema-screen.jsx";
import withCinemaVideoPlayer from "../../hoc/with-cinema-video-player/with-cinema-video-player.js";
import {getCurrentGenreFilter, getCurrentPage, getSelectedMovieId, getFilteredMovies, getAuthMessage} from "../../reducer/state/selectors.js";
import {getMovies, getPromoMovie, getGenres, getMovieComments, getSavingMovieCommentStatus, getSavingMovieFavoriteStatus} from "../../reducer/data/selectors.js";
import {getAuthorizationStatus, getAvatarUrl} from "../../reducer/user/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import AddReview from "../add-review/add-review.jsx";
import history from "../../history.js";

const CinemaScreenWrapped = withCinemaVideoPlayer(CinemaScreen);
const AddReviewWrapped = withNewReview(AddReview);

const MoviePageWrapper = withMovieTabs(MoviePage);

class App extends PureComponent {
  constructor(props) {
    super(props);

    this._favoriteButtonClickHandler = this._favoriteButtonClickHandler.bind(this);
  }

  _getMovieById(movieId) {
    const {movies} = this.props;

    return movies.find((movie) => movie.id === Number.parseInt(movieId, 10));
  }

  _favoriteButtonClickHandler() {

  }

  _renderApp() {
    const {
      avatarUrl,
      authorizationStatus,
      promoMovie,
      movies,
      genres,
      currentGenreFilter,
      onMovieFilterClick,
      onMovieTitleClick,
      onPlayMovieClick,
      onAddReviewClick,
      selectedMovieId,
      currentPage,
      onExitVideoPlayer,
      movieComments,
      savingMovieCommentStatus,
      savingMovieFavoriteStatus,
      setFavoriteStatus} = this.props;

    if (movies.length && promoMovie.id) {
      const selectedMovie = this._getMovieById(selectedMovieId);
      switch (currentPage) {
        case Screens.MOVIE_PAGE_SCREEN:
          const {id, genre} = selectedMovie;
          const similarMovies = movies.filter((movie) => (movie.genre === genre) && (movie.id !== id)).slice(0, MAX_SIMILAR_MOVIES_COUNT);

          return (
            <MoviePageWrapper
              authorizationStatus = {authorizationStatus}
              avatarUrl = {avatarUrl}
              movie={selectedMovie}
              comments={movieComments}
              similarMovies = {similarMovies}
              onMovieTitleClick = {onMovieTitleClick}
              onPlayMovieClick = {onPlayMovieClick}
              onAddReviewClick = {onAddReviewClick}
            />
          );

        case Screens.CINEMA_SCREEN:
          return (
            <CinemaScreenWrapped
              movie={this._getMovieById(selectedMovieId)}
              onExitVideoPlayer={onExitVideoPlayer}
            />
          );

        case Screens.ADD_REVIEW_SCREEN:
          return (
            <AddReviewWrapped
              movie={selectedMovie}
              authorizationStatus = {this.props.authorizationStatus}
              avatarUrl = {this.props.avatarUrl}
              onSaveComment = {this.props.saveComment}
              savingMovieCommentStatus = {savingMovieCommentStatus}
            />
          );

        default:
          return (
            <Main
              authorizationStatus = {authorizationStatus}
              avatarUrl = {avatarUrl}
              promoMovie = {promoMovie}
              genres = {genres}
              movies = {movies}
              currentGenreFilter = {currentGenreFilter}
              onMovieTitleClick = {onMovieTitleClick}
              onMovieFilterClick = {onMovieFilterClick}
              onPlayMovieClick = {onPlayMovieClick}
              savingMovieFavoriteStatus = {savingMovieFavoriteStatus}
              setFavoriteStatus = {setFavoriteStatus}
            />
          );
      }
    }

    return null;
  }

  render() {
    const {movies, login, authorizationStatus, avatarUrl} = this.props;

    if (movies.length) {
      return (
        <Router
          history={history}
        >
          <Switch>

            <Route exact path={AppRoute.ROOT}>
              {this._renderApp()}
            </Route>

            <Route exact path={AppRoute.LOGIN}>
              {authorizationStatus === AuthorizationStatus.NO_AUTH ?
                <SignIn
                  onSubmit={login}
                /> :
                <Redirect to={AppRoute.ROOT} />}
            </Route>

            <Route
              path={AppRoute.ADD_REVIEW}
              render = {
                (props) => {
                  if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
                    return (<Redirect to={AppRoute.LOGIN} />);
                  }

                  const selectedMovie = this._getMovieById(props.match.params.id);
                  const {saveComment, savingMovieCommentStatus} = this.props;

                  return (
                    <AddReviewWrapped
                      movie={selectedMovie}
                      authorizationStatus = {authorizationStatus}
                      avatarUrl = {avatarUrl}
                      onSaveComment = {saveComment}
                      savingMovieCommentStatus = {savingMovieCommentStatus}
                      {...props}
                    />
                  );
                }
              }
            />

            <Route
              path={AppRoute.FILM}
              render = {(props) => {
                this.props.getComments(props.match.params.id);
                const {movieComments, onMovieTitleClick, onPlayMovieClick, onAddReviewClick} = this.props;
                const selectedMovie = this._getMovieById(props.match.params.id);
                const {id, genre} = selectedMovie;
                const similarMovies = movies.filter((movie) => (movie.genre === genre) && (movie.id !== id)).slice(0, MAX_SIMILAR_MOVIES_COUNT);

                return (
                  <MoviePageWrapper
                    authorizationStatus = {authorizationStatus}
                    avatarUrl = {avatarUrl}
                    movie={selectedMovie}
                    comments={movieComments}
                    similarMovies = {similarMovies}
                    onMovieTitleClick = {onMovieTitleClick}
                    onPlayMovieClick = {onPlayMovieClick}
                    onAddReviewClick = {onAddReviewClick}
                  />
                );
              }}
            />

            <Route
              path={AppRoute.PLAYER}
              render = {
                (props) => {
                  return (
                    <CinemaScreenWrapped
                      movie = {this._getMovieById(props.match.params.id)}
                      onExitVideoPlayer={() => {}}
                      {...props}
                    />
                  );
                }
              }
            />

          </Switch>
        </Router>
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
  savingMovieFavoriteStatus: PropTypes.string,
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
  onAddReviewClick: PropTypes.func.isRequired,
  selectedMovieId: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onExitVideoPlayer: PropTypes.func.isRequired,
  movieComments: PropTypes.array,
  getComments: PropTypes.func,
  saveComment: PropTypes.func,
  setFavoriteStatus: PropTypes.func,
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
  savingMovieFavoriteStatus: getSavingMovieFavoriteStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  setFavoriteStatus(favoriteStatus, action) {
    dispatch(DataOperation.saveMovieFavoriteStatus(favoriteStatus, action));
  },

  saveComment(comment, action) {
    dispatch(DataOperation.saveMovieComment(comment, action));
  },

  getComments(movieId) {
    dispatch(DataOperation.loadMovieComments(movieId));
  },

  login(authData, action) {
    dispatch(UserOperation.login(authData, action));
  },

  onAddReviewClick(movieId) {
    dispatch(ActionCreator.openAddReview(movieId));
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
});


export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
