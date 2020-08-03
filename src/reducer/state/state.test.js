import {reducer, ActionCreator, ActionType} from "./state.js";
import {NO_FILTER} from "../../const.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    authMessage: ``,
    currentGenreFilter: NO_FILTER,
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
  });
});

it(`Action creator for setting current filter return correct action`, () => {
  expect(ActionCreator.setCurrentFilter(NO_FILTER))
  .toEqual({
    type: ActionType.SET_GENRE_FILTER,
    payload: NO_FILTER,
  });
});
