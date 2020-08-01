import React, {PureComponent} from "react";
import {Switch, Route, Router, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/state/state.js";
import {MAX_SIMILAR_MOVIES_COUNT, AppRoute, AuthorizationStatus} from "../../const.js";
import withMovieTabs from "../../hoc/with-movie-tabs/with-movie-tabs.js";
import withNewReview from "../../hoc/with-new-review/with-new-review.js";
import CinemaScreen from "../cinema-screen/cinema-screen.jsx";
import withCinemaVideoPlayer from "../../hoc/with-cinema-video-player/with-cinema-video-player.js";
import {getCurrentGenreFilter, getCurrentPage, getSelectedMovieId, getFilteredMovies, getAuthMessage} from "../../reducer/state/selectors.js";
import {getMovies, getPromoMovie, getGenres, getMovieComments, getSavingMovieCommentStatus, getSavingMovieFavoriteStatus, getMyMovies} from "../../reducer/data/selectors.js";
import {getAuthorizationStatus, getAvatarUrl} from "../../reducer/user/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import AddReview from "../add-review/add-review.jsx";
import history from "../../history.js";
import MyList from "../my-list/my-list.jsx";
import PrivateRoute from "../private-route/private-route.jsx";


const CinemaScreenWrapped = withCinemaVideoPlayer(CinemaScreen);
const AddReviewWrapped = withNewReview(AddReview);

const MoviePageWrapper = withMovieTabs(MoviePage);


class App extends PureComponent {
  constructor(props) {
    super(props);

    this._getMovieById = this._getMovieById.bind(this);
  }

  _getMovieById(movieId) {
    const {movies} = this.props;

    return movies.find((movie) => movie.id === Number.parseInt(movieId, 10));
  }

  render() {
    const {movies, login, authorizationStatus, avatarUrl, myMovies, promoMovie, genres, currentGenreFilter, onMovieFilterClick, onPlayMovieClick, savingMovieFavoriteStatus, setFavoriteStatus} = this.props;

    if (movies.length && myMovies.length >= 0) {
      return (
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.ROOT}>
              <Main
                authorizationStatus = {authorizationStatus}
                avatarUrl = {avatarUrl}
                promoMovie = {promoMovie}
                genres = {genres}
                movies = {movies}
                currentGenreFilter = {currentGenreFilter}
                onMovieFilterClick = {onMovieFilterClick}
                onPlayMovieClick = {onPlayMovieClick}
                savingMovieFavoriteStatus = {savingMovieFavoriteStatus}
                setFavoriteStatus = {setFavoriteStatus}
              />
            </Route>

            <Route exact path={AppRoute.LOGIN}>
              {authorizationStatus === AuthorizationStatus.NO_AUTH ?
                <SignIn
                  onSubmit={login}
                /> :
                <Redirect to={AppRoute.ROOT} />}
            </Route>

            <PrivateRoute
              exact
              path={AppRoute.MY_LIST}
              render={() => {
                return (
                  <MyList
                    myMovies = {myMovies}
                    authorizationStatus = {authorizationStatus}
                    avatarUrl = {avatarUrl}
                  />
                );
              }}
            />

            <PrivateRoute
              path={AppRoute.ADD_REVIEW}
              exact
              render={(props) => {
                const selectedMovie = this._getMovieById(props.computedMatch.params.id);
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
              }}
            />

            <Route
              path={AppRoute.FILM}
              render = {(props) => {
                const {movieComments, onAddReviewClick} = this.props;
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
                    onPlayMovieClick = {onPlayMovieClick}
                    onAddReviewClick = {onAddReviewClick}
                    savingMovieFavoriteStatus = {savingMovieFavoriteStatus}
                    setFavoriteStatus = {setFavoriteStatus}
                    getComments = {this.props.getComments}
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
                      onExitVideoPlayer={() => {
                        history.goBack();
                      }}
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
  myMovies: PropTypes.array,
  genres: PropTypes.array.isRequired,
  currentGenreFilter: PropTypes.string.isRequired,
  onMovieFilterClick: PropTypes.func.isRequired,
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
  myMovies: getMyMovies(state),
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

  onPlayMovieClick(movieId) {
    dispatch(ActionCreator.openCinemaScreen(movieId));
  },

  onExitVideoPlayer(movieId) {
    dispatch(ActionCreator.closeCinemaScreen(movieId));
  },
});


export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
