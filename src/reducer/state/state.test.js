import {reducer, ActionCreator, ActionType} from "./state.js";
import {NO_FILTER, Screens} from "../../const.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    authMessage: ``,
    currentGenreFilter: NO_FILTER,
    currentPage: Screens.MAIN_SCREEN,
    selectedMovieId: -1,
    selectedMoviePage: Screens.MAIN_SCREEN,
  });
});

it(`Reducer will change current genre filter`, () => {
  expect(reducer({
    currentGenreFilter: NO_FILTER,
    currentPage: Screens.MAIN_SCREEN,
    selectedMovieId: -1,
    selectedMoviePage: Screens.MAIN_SCREEN,
  },
  {
    type: ActionType.SET_GENRE_FILTER,
    payload: `Drama`,
  }))
  .toEqual({
    currentGenreFilter: `Drama`,
    currentPage: Screens.MAIN_SCREEN,
    selectedMovieId: -1,
    selectedMoviePage: Screens.MAIN_SCREEN,
  });
});

it(`Reducer will change selected movie Id by OPEN_MOVIE_PAGE`, () => {
  expect(reducer({
    currentGenreFilter: NO_FILTER,
    currentPage: Screens.MAIN_SCREEN,
    selectedMovieId: -1,
    selectedMoviePage: Screens.MAIN_SCREEN,
  },
  {
    type: ActionType.OPEN_MOVIE_PAGE,
    payload: `1`,
  }))
  .toEqual({
    currentGenreFilter: NO_FILTER,
    currentPage: Screens.MOVIE_PAGE_SCREEN,
    selectedMovieId: 1,
    selectedMoviePage: Screens.MOVIE_PAGE_SCREEN,
  });
});

it(`Reducer will change state by OPEN_CINEMA_PAGE`, () => {
  expect(reducer({
    currentGenreFilter: NO_FILTER,
    currentPage: Screens.MAIN_SCREEN,
    selectedMovieId: -1,
    selectedMoviePage: Screens.MAIN_SCREEN,
  },
  {
    type: ActionType.OPEN_CINEMA_PAGE,
    payload: `1`,
  }))
  .toEqual({
    currentGenreFilter: NO_FILTER,
    currentPage: Screens.CINEMA_SCREEN,
    selectedMovieId: 1,
    selectedMoviePage: Screens.MAIN_SCREEN,
  });
});

it(`Reducer will change state by CLOSE_CINEMA_PAGE`, () => {
  expect(reducer({
    currentGenreFilter: NO_FILTER,
    currentPage: Screens.CINEMA_SCREEN,
    selectedMovieId: -1,
    selectedMoviePage: Screens.MAIN_SCREEN,
  },
  {
    type: ActionType.CLOSE_CINEMA_PAGE,
    payload: `1`,
  }))
  .toEqual({
    currentGenreFilter: NO_FILTER,
    currentPage: Screens.MAIN_SCREEN,
    selectedMovieId: 1,
    selectedMoviePage: Screens.MAIN_SCREEN,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for setting current filter return correct action`, () => {
    expect(ActionCreator.setCurrentFilter(NO_FILTER))
    .toEqual({
      type: ActionType.SET_GENRE_FILTER,
      payload: NO_FILTER,
    });
  });

  it(`Action creator for open movie screen return correct action`, () => {
    expect(ActionCreator.openMovieScreen(1))
    .toEqual({
      type: ActionType.OPEN_MOVIE_PAGE,
      payload: 1,
    });
  });

  it(`Action creator for open cinema screen return correct action`, () => {
    expect(ActionCreator.openCinemaScreen(1))
    .toEqual({
      type: ActionType.OPEN_CINEMA_PAGE,
      payload: 1,
    });
  });

  it(`Action creator for close cinema screen return correct action`, () => {
    expect(ActionCreator.closeCinemaScreen(1))
    .toEqual({
      type: ActionType.CLOSE_CINEMA_PAGE,
      payload: 1,
    });
  });

  it(`Action creator for open auth screen return correct action`, () => {
    expect(ActionCreator.openAuthPage(``))
    .toEqual({
      type: ActionType.OPEN_AUTH_PAGE,
      payload: ``,
    });
  });

  it(`Action creator for copen main page return correct action`, () => {
    expect(ActionCreator.openMainPage())
    .toEqual({
      type: ActionType.OPEN_MAIN_PAGE,
      payload: ``,
    });
  });
});
