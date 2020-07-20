import {NO_FILTER, Screens} from "../../const.js";

const initialState = {
  authMessage: ``,
  currentGenreFilter: NO_FILTER,
  currentPage: Screens.MAIN_SCREEN,
  selectedMovieId: -1,
  selectedMoviePage: Screens.MAIN_SCREEN,
};

const ActionType = {
  SET_GENRE_FILTER: `SET_GENRE_FILTER`,
  OPEN_MOVIE_PAGE: `OPEN_MOVIE_PAGE`,
  OPEN_CINEMA_PAGE: `OPEN_CINEMA_PAGE`,
  CLOSE_CINEMA_PAGE: `CLOSE_CINEMA_PAGE`,
  OPEN_AUTH_PAGE: `OPEN_AUTH_PAGE`,
  OPEN_MAIN_PAGE: `OPEN_MAIN_PAGE`,
};

const ActionCreator = {
  setCurrentFilter: (filterName) => {
    return {
      type: ActionType.SET_GENRE_FILTER,
      payload: filterName,
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
      type: ActionType.OPEN_AUTH_PAGE,
      payload: movieId,
    };
  },

  openAuthPage: (errorMessage) => {
    return {
      type: ActionType.OPEN_AUTH_PAGE,
      payload: errorMessage,
    };
  },

  openMainPage: () => {
    return {
      type: ActionType.OPEN_MAIN_PAGE,
      payload: ``,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE_FILTER:
      return Object.assign({}, state, {
        currentGenreFilter: action.payload,
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

    case ActionType.OPEN_AUTH_PAGE:
      return Object.assign({}, state, {
        currentPage: Screens.AUTH_SCREEN,
        authMessage: action.payload,
      });

    case ActionType.OPEN_MAIN_PAGE:
      return Object.assign({}, state, {
        currentPage: Screens.MAIN_SCREEN,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
