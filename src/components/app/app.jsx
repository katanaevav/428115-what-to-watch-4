import React, {PureComponent} from "react";
import {Switch, Route, Router, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/state/state.js";
import {MAX_SIMILAR_MOVIES_COUNT, AppRoute, AuthorizationStatus, MOVIE_PROP_TYPE, COMMENT_PROP_TYPE} from "../../const.js";
import withMovieTabs from "../../hoc/with-movie-tabs/with-movie-tabs.js";
import withNewReview from "../../hoc/with-new-review/with-new-review.js";
import CinemaScreen from "../cinema-screen/cinema-screen.jsx";
import withCinemaVideoPlayer from "../../hoc/with-cinema-video-player/with-cinema-video-player.js";
import {getCurrentGenreFilter, getFilteredMovies} from "../../reducer/state/selectors.js";
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
    const {
      movies,
      login,
      authorizationStatus,
      avatarUrl,
      myMovies,
      promoMovie,
      genres,
      currentGenreFilter,
      onMovieFilterClick,
      savingMovieFavoriteStatus,
      setFavoriteStatus
    } = this.props;

    if (movies.length && myMovies.length >= 0 && promoMovie) {
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
              path={AppRoute.FILMS + AppRoute.ID + AppRoute.ADD_REVIEW}
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
              path={AppRoute.FILMS + AppRoute.ID}
              render = {(props) => {
                const {movieComments} = this.props;
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
                    savingMovieFavoriteStatus = {savingMovieFavoriteStatus}
                    setFavoriteStatus = {setFavoriteStatus}
                    getComments = {this.props.getComments}
                  />
                );
              }}
            />

            <Route
              path={AppRoute.PLAYER + AppRoute.ID}
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
  promoMovie: MOVIE_PROP_TYPE.isRequired,
  movies: PropTypes.arrayOf(MOVIE_PROP_TYPE).isRequired,
  myMovies: PropTypes.arrayOf(MOVIE_PROP_TYPE),
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentGenreFilter: PropTypes.string.isRequired,
  onMovieFilterClick: PropTypes.func.isRequired,
  movieComments: PropTypes.arrayOf(COMMENT_PROP_TYPE),
  getComments: PropTypes.func.isRequired,
  saveComment: PropTypes.func.isRequired,
  setFavoriteStatus: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  currentGenreFilter: getCurrentGenreFilter(state),
  promoMovie: getPromoMovie(state),
  movies: getFilteredMovies(getMovies(state), getCurrentGenreFilter(state)),
  myMovies: getMyMovies(state),
  genres: getGenres(state),
  movieComments: getMovieComments(state),
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

  onMovieFilterClick(filterName) {
    dispatch(ActionCreator.setCurrentFilter(filterName));
  },
});


export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
