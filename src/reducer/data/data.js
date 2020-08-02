import {SavingStatus} from "../../const.js";
import {createMovie, createMovies, createComments} from "../../adapter/films.js";
import {getMovies, getPromoMovie, getMyMovies} from "./selectors.js";

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
  UPDATE_MOVIES: `UPDATE_MOVIES`,
  UPDATE_PROMO_MOVIE: `UPDATE_PROMO_MOVIE`,
  UPDATE_MY_MOVIES: `UPDATE_MY_MOVIES`,
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

  saveMovieFavoriteStatus: (status) => {
    return {
      type: ActionType.CHANGE_FAVORITE_STATUS,
      payload: status,
    };
  },

  updateMovies: (movies) => {
    return {
      type: ActionType.UPDATE_MOVIES,
      payload: movies,
    };
  },

  updatePromoMovie: (movie) => {
    return {
      type: ActionType.UPDATE_PROMO_MOVIE,
      payload: movie,
    };
  },

  updateMyMovies: (myMovies) => {
    return {
      type: ActionType.UPDATE_MY_MOVIES,
      payload: myMovies,
    };
  },
};

const Operation = {
  loadMovies: (action) => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadMovies(createMovies(response.data)));
        api.get(`/films/promo`)
          .then((respPromo) => {
            dispatch(ActionCreator.loadPromoMovie(createMovie(respPromo.data)));
            action();
          });
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
        action(createMovie(response.data));

        const updatedMovies = getMovies(getState());
        const movieIndex = updatedMovies.findIndex((currentValue) => currentValue.id === favoriteStatus.movieId);
        updatedMovies[movieIndex].isFavorite = favoriteStatus.isFavorite;
        dispatch(ActionCreator.updateMovies(updatedMovies));

        if (getPromoMovie(getState()).id === favoriteStatus.movieId) {
          dispatch(ActionCreator.updatePromoMovie(updatedMovies[movieIndex]));
        }

        const updatedMyMovies = getMyMovies(getState());
        const myMovieIndex = updatedMyMovies.findIndex((currentValue) => currentValue.id === favoriteStatus.movieId);
        if (favoriteStatus.isFavorite) {
          updatedMyMovies.push(updatedMovies[movieIndex]);
        } else if (myMovieIndex > -1) {
          updatedMyMovies.splice(myMovieIndex, 1);
        }
        dispatch(ActionCreator.updateMyMovies(updatedMyMovies));

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
      return Object.assign({}, state, {
        savingMovieFavoriteStatus: action.payload,
      });

    case ActionType.UPDATE_MOVIES:
      return Object.assign({}, state, {
        movies: action.payload,
      });

    case ActionType.UPDATE_PROMO_MOVIE:
      return Object.assign({}, state, {
        promoMovie: action.payload,
      });

    case ActionType.UPDATE_MY_MOVIES:
      return Object.assign({}, state, {
        myMovies: action.payload,
      });
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
