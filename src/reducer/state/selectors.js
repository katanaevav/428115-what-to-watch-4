import NameSpace from "../name-space.js";
import {NO_FILTER} from "../../const.js";


const NAME_SPACE = NameSpace.STATE;


export const getCurrentGenreFilter = (state) => {
  return state[NAME_SPACE].currentGenreFilter;
};

export const getFilteredMovies = (movies, filter) => {
  return filter === NO_FILTER ? movies : movies.slice().filter((movie) => movie.genre === filter);
};

export const getAuthMessage = (state) => {
  return state[NAME_SPACE].authMessage;
};

export const getRenderedMoviesCount = (state) => {
  return state[NAME_SPACE].renderedMoviesCount;
};
