import movies, {PromoMovie} from "./mocks/films.js";
import {NO_FILTER} from "./const.js";

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
};

const ActionType = {
  SET_GENRE_FILTER: `SET_GENRE_FILTER`,
};

const ActionCreator = {
  setCurrentFilter: (filterName) => {
    return {
      type: ActionType.SET_GENRE_FILTER,
      payload: filterName,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE_FILTER:
      return Object.assign({}, state, {
        currentGenreFilter: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
