// import movies, {PromoMovie} from "./mocks/films.js";
import {NO_FILTER, Screens} from "./const.js";

export const getUniqueItems = (arr) => {
  return Array.from(new Set(arr));
};

const getGenres = (allMovies) => {
  let allGenres = Array.from(new Set(
      allMovies.map((movie) => (movie.genre))
  ));
  allGenres.unshift(NO_FILTER);

  return allGenres;
};

const initialState = {
  currentGenreFilter: NO_FILTER,
  PromoMovie: {},
  movies: [],
  genres: [], //getGenres(movies),
  currentPage: Screens.MAIN_SCREEN,
  selectedMovieId: -1,
  selectedMoviePage: Screens.MAIN_SCREEN,
};

const ActionType = {
  SET_GENRE_FILTER: `SET_GENRE_FILTER`,
  OPEN_MOVIE_PAGE: `OPEN_MOVIE_PAGE`,
  OPEN_CINEMA_PAGE: `OPEN_CINEMA_PAGE`,
  CLOSE_CINEMA_PAGE: `CLOSE_CINEMA_PAGE`,
  LOAD_MOVIES: `LOAD_MOVIES`,
};

const ActionCreator = {
  setCurrentFilter: (filterName) => {
    return {
      type: ActionType.SET_GENRE_FILTER,
      payload: filterName,
    };
  },

  loadMovies: (films) => {
    return {
      type: ActionType.LOAD_MOVIES,
      payload: films,
    };
  },

  openMovieScreen: (movieId) => {
    return {
      type: ActionType.OPEN_MOVIE_PAGE,
      payload: movieId,
    };
  },

  openCinemaScreen: (movieId) => {
    return {
      type: ActionType.OPEN_CINEMA_PAGE,
      payload: movieId,
    };
  },

  closeCinemaScreen: (movieId) => {
    return {
      type: ActionType.CLOSE_CINEMA_PAGE,
      payload: movieId,
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
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE_FILTER:
      return Object.assign({}, state, {
        currentGenreFilter: action.payload,
      });

    case ActionType.LOAD_MOVIES:
      return Object.assign({}, state, {
        questions: action.payload,
      });

    case ActionType.OPEN_MOVIE_PAGE:
      return Object.assign({}, state, {
        currentPage: Screens.MOVIE_PAGE_SCREEN,
        selectedMovieId: parseInt(action.payload, 10),
        selectedMoviePage: Screens.MOVIE_PAGE_SCREEN,
      });

    case ActionType.OPEN_CINEMA_PAGE:
      return Object.assign({}, state, {
        currentPage: Screens.CINEMA_SCREEN,
        selectedMovieId: parseInt(action.payload, 10),
      });

    case ActionType.CLOSE_CINEMA_PAGE:
      return Object.assign({}, state, {
        currentPage: state.selectedMoviePage,
        selectedMovieId: parseInt(action.payload, 10),
      });
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
