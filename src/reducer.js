import movies, {PromoMovie} from "./mocks/films.js";
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
  PromoMovie,
  movies,
  genres: getGenres(movies),
  currentPage: Screens.MAIN_SCREEN,
  selectedMovieId: -1,
};

const ActionType = {
  SET_GENRE_FILTER: `SET_GENRE_FILTER`,
  OPEN_MOVIE_PAGE: `OPEN_MOVIE_PAGE`,
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
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
