import {SavingStatus} from "../../const.js";
import {createMovie, createMovies, createComments} from "../../adapter/films.js";

const initialState = {
  promoMovie: {},
  movies: [],
  myMovies: [],
  movieComments: [],
  savingMovieCommentStatus: ``,
  savingMovieFavoriteStatus: ``,
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO_MOVIE: `LOAD_PROMO_MOVIE`,
  LOAD_MY_MOVIES: `LOAD_MY_MOVIES`,
  LOAD_MOVIE_COMMENTS: `LOAD_MOVIE_COMMENTS`,
  SAVE_MOVIE_COMMENT: `SAVE_MOVIE_COMMENT`,
  CHANGE_FAVORITE_STATUS: `CHANGE_FAVORITE_STATUS`,
};

const ActionCreator = {
  loadMovies: (films) => {
    return {
      type: ActionType.LOAD_MOVIES,
      payload: films,
    };
  },

  loadPromoMovie: (promoFilm) => {
    return {
      type: ActionType.LOAD_PROMO_MOVIE,
      payload: promoFilm,
    };
  },

  loadMyMovies: (myFilms) => {
    return {
      type: ActionType.LOAD_MY_MOVIES,
      payload: myFilms,
    };
  },

  loadMovieComments: (comments) => {
    return {
      type: ActionType.LOAD_MOVIE_COMMENTS,
      payload: comments,
    };
  },

  saveMovieComment: (status) => {
    return {
      type: ActionType.SAVE_MOVIE_COMMENT,
      payload: status,
    };
  },

  saveMovieFavoriteStatus: (status, movieId = -1, favoriteStatus = false) => {
    return {
      type: ActionType.CHANGE_FAVORITE_STATUS,
      payload: {
        status,
        movieId,
        favoriteStatus,
      },
    };
  },
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadMovies(createMovies(response.data)));
      });
  },

  loadPromoMovie: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadPromoMovie(createMovie(response.data)));
      });
  },

  loadMyMovies: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.loadMyMovies(createMovies(response.data)));
      });
  },

  loadMovieComments: (movieId) => (dispatch, getState, api) => {
    return api.get(`/comments/${movieId}`)
      .then((response) => {
        dispatch(ActionCreator.loadMovieComments(createComments(response.data)));
      });
  },

  saveMovieComment: (comment, action) => (dispatch, getState, api) => {
    return api.post(`/comments/${comment.movieId}`, {
      rating: comment.mark,
      comment: comment.text,
    })
      .then(() => {
        dispatch(ActionCreator.saveMovieComment(SavingStatus.SUCCESS));
        action();
      })
      .catch((err) => {
        dispatch(ActionCreator.saveMovieComment(SavingStatus.FAIL));
        action();
        throw err;
      });
  },

  saveMovieFavoriteStatus: (favoriteStatus, action) => (dispatch, getState, api) => {
    return api.post(`/favorite/${favoriteStatus.movieId}/${favoriteStatus.isFavorite ? 1 : 0}`)
      .then((response) => {
        dispatch(ActionCreator.saveMovieFavoriteStatus(SavingStatus.SUCCESS, favoriteStatus.movieId, favoriteStatus.isFavorite));
        action(response.data);
      })
      .catch((err) => {
        dispatch(ActionCreator.saveMovieFavoriteStatus(SavingStatus.FAIL));
        action();
        throw err;
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return Object.assign({}, state, {
        movies: action.payload,
      });

    case ActionType.LOAD_PROMO_MOVIE:
      return Object.assign({}, state, {
        promoMovie: action.payload,
      });

    case ActionType.LOAD_MY_MOVIES:
      return Object.assign({}, state, {
        myMovies: action.payload,
      });

    case ActionType.LOAD_MOVIE_COMMENTS:
      return Object.assign({}, state, {
        movieComments: action.payload,
      });

    case ActionType.SAVE_MOVIE_COMMENT:
      return Object.assign({}, state, {
        savingMovieCommentStatus: action.payload,
      });

    case ActionType.CHANGE_FAVORITE_STATUS:
      const {movieId, status, favoriteStatus} = action.payload;

      if (status === SavingStatus.SUCCESS) {
        if (state.promoMovie.id === movieId) {
          state.promoMovie.isFavorite = favoriteStatus;
        }

        const movieIndex = state.movies.findIndex((currentValue) => currentValue.id === movieId);
        state.movies[movieIndex].isFavorite = favoriteStatus;

        const myMovieIndex = state.myMovies.findIndex((currentValue) => currentValue.id === movieId);
        if (myMovieIndex > 0 && !favoriteStatus) {
          state.myMovies.splice(myMovieIndex, 1);
        } else {
          state.myMovies.push(state.movies[movieIndex]);
        }
      }

      return Object.assign({}, state, {
        savingMovieFavoriteStatus: status,
      });
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
