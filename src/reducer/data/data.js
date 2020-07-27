import {SavingStatus} from "../../const.js";

const initialState = {
  promoMovie: {},
  movies: [],
  movieComments: [],
  savingMovieCommentStatus: ``,
  savingMovieFavoriteStatus: ``,
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO_MOVIE: `LOAD_PROMO_MOVIE`,
  LOAD_MOVIE_COMMENTS: `LOAD_MOVIE_COMMENTS`,
  SAVE_MOVIE_COMMENT: `SAVE_MOVIE_COMMENT`,
  CHANGE_FAVORITE_STATUS: `SAVE_FAVORITE_STATUS`,
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

  saveMovieFavoriteStatus: (status) => {
    return {
      type: ActionType.CHANGE_FAVORITE_STATUS,
      payload: status,
    };
  },
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadMovies(response.data));
      });
  },

  loadPromoMovie: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadPromoMovie(response.data));
      });
  },

  loadMovieComments: (movieId) => (dispatch, getState, api) => {
    return api.get(`/comments/${movieId}`)
      .then((response) => {
        dispatch(ActionCreator.loadMovieComments(response.data));
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
        dispatch(ActionCreator.saveMovieFavoriteStatus(SavingStatus.SUCCESS));
        dispatch(Operation.loadPromoMovie());
        dispatch(Operation.loadMovies());
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

    case ActionType.LOAD_MOVIE_COMMENTS:
      return Object.assign({}, state, {
        movieComments: action.payload,
      });

    case ActionType.SAVE_MOVIE_COMMENT:
      return Object.assign({}, state, {
        savingMovieCommentStatus: action.payload,
      });

    case ActionType.CHANGE_FAVORITE_STATUS:
      return Object.assign({}, state, {
        savingMovieFavoriteStatus: action.payload,
      });
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
