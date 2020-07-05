import {NO_FILTER} from "./const.js";

const getFilteredMovies = (movies, filter) => {
  return filter === NO_FILTER ? movies : movies.slice().filter((movie) => movie.genre === filter);
};

export {getFilteredMovies};
