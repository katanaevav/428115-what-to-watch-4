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
  currentGenreFilter: `NO_FILTER`,
  PromoMovie,
  movies,
  genres: getGenres(movies),
};

const ActionType = {
  SET_GENRE_FILTER: `SET_GENRE_FILTER`,
  GET_FILTERED_MOVIES: `GET_FILTERED_MOVIES`,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE_FILTER:
      return Object.assign({}, state, {currentGenreFilter: action.payload});

    case ActionType.GET_FILTERED_MOVIES:
      let filteredMovies;
      if (state.currentGenreFilter === NO_FILTER) {
        filteredMovies = initialState.movies.slice();
      } else {
        filteredMovies = initialState.movies.slice().filter((movie) => movie.genre === state.currentGenreFilter);
      }
      return Object.assign({}, state, {movies: filteredMovies});
  }

  return state;
};

export {reducer, ActionType};
