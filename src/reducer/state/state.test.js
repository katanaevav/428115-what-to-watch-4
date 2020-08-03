import {reducer, ActionCreator, ActionType} from "./state.js";
import {NO_FILTER, MAX_RENDERED_MOVIES_AT_TIME} from "../../const.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    authMessage: ``,
    currentGenreFilter: NO_FILTER,
    renderedMoviesCount: MAX_RENDERED_MOVIES_AT_TIME,
  });
});

it(`Reducer will change current genre filter`, () => {
  expect(reducer({
    currentGenreFilter: NO_FILTER,
  },
  {
    type: ActionType.SET_GENRE_FILTER,
    payload: `Drama`,
  }))
  .toEqual({
    currentGenreFilter: `Drama`,
    renderedMoviesCount: MAX_RENDERED_MOVIES_AT_TIME,
  });
});

it(`Reducer will change rendered movies count`, () => {
  expect(reducer({
    renderedMoviesCount: MAX_RENDERED_MOVIES_AT_TIME,
  },
  {
    type: ActionType.SET_RENDERED_MOVIES_COUNT,
    payload: 9,
  }))
  .toEqual({
    renderedMoviesCount: 9,
  });
});

it(`Action creator for setting current filter return correct action`, () => {
  expect(ActionCreator.setCurrentFilter(NO_FILTER))
  .toEqual({
    type: ActionType.SET_GENRE_FILTER,
    payload: NO_FILTER,
  });
});

it(`Action creator for setting rendered movies count return correct action`, () => {
  expect(ActionCreator.setRenderedMoviesCount(9))
  .toEqual({
    type: ActionType.SET_RENDERED_MOVIES_COUNT,
    payload: 9,
  });
});
