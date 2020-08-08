import NameSpace from "../name-space";
import {NO_FILTER} from "../../const";


const GENRES_START_ELEMENT = 0;
const GEMRES_MAX_ELEMENTS = 9;
const NAME_SPACE = NameSpace.DATA;


export const getMovies = (state) => {
  return state[NAME_SPACE].movies;
};

export const getMyMovies = (state) => {
  return state[NAME_SPACE].myMovies;
};

export const getPromoMovie = (state) => {
  return state[NAME_SPACE].promoMovie;
};

export const getGenres = (state) => {
  let allGenres = Array.from(new Set(
      state[NAME_SPACE].movies.map((movie) => (movie.genre))
  )).slice(GENRES_START_ELEMENT, GEMRES_MAX_ELEMENTS);

  allGenres.unshift(NO_FILTER);

  return allGenres;
};

export const getMovieComments = (state) => {
  return state[NAME_SPACE].movieComments;
};

export const getSavingMovieCommentStatus = (state) => {
  return state[NAME_SPACE].savingMovieCommentStatus;
};

export const getSavingMovieFavoriteStatus = (state) => {
  return state[NAME_SPACE].savingMovieFavoriteStatus;
};
