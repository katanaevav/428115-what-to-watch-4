import movies from "./mocks/films.js";

const initialState = {
  currentGenreFilter: -1,
  movies,
};

const ActionType = {
  SET_GENRE_FILTER: `SET_GENRE_FILTER`,
  GET_FILTERED_MOVIES: `GET_FILTERED_MOVIES`,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE_FILTER:
      break;

    case ActionType.GET_FILTERED_MOVIES:
      break;
  }

  return state;
};

export {reducer, ActionType};
