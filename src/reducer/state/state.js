import {NO_FILTER} from "../../const.js";

const initialState = {
  authMessage: ``,
  currentGenreFilter: NO_FILTER,
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
