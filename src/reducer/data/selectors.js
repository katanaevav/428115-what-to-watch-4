import NameSpace from "../name-space.js";
import {NO_FILTER} from "../../const.js";
import {createMovie, createMovies, createComments} from "../../adapter/films.js";

const NAME_SPACE = NameSpace.DATA;

export const getMovies = (state) => {
  return createMovies(state[NAME_SPACE].movies);
};

export const getPromoMovie = (state) => {
  return createMovie(state[NAME_SPACE].promoMovie);
};

export const getGenres = (state) => {
  let allGenres = Array.from(new Set(
      state[NAME_SPACE].movies.map((movie) => (movie.genre))
  ));
  allGenres.unshift(NO_FILTER);

  return allGenres;
};

export const getMovieComments = (state) => {
  return createComments(state[NAME_SPACE].movieComments);
};

export const getSavingMovieCommentStatus = (state) => {
  return state[NAME_SPACE].savingMovieCommentStatus;
};

export const getSavingMovieFavoriteStatus = (state) => {
  return state[NAME_SPACE].savingMovieFavoriteStatus;
};
