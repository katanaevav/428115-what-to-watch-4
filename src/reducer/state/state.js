import {NO_FILTER, MAX_RENDERED_MOVIES_AT_TIME} from "../../const";


const initialState = {
  authMessage: ``,
  currentGenreFilter: NO_FILTER,
  renderedMoviesCount: MAX_RENDERED_MOVIES_AT_TIME,
};


const ActionType = {
  SET_GENRE_FILTER: `SET_GENRE_FILTER`,
  SET_RENDERED_MOVIES_COUNT: `SET_RENDERED_MOVIES_COUNT`,
};


const ActionCreator = {
  setCurrentFilter: (filterName) => {
    return {
      type: ActionType.SET_GENRE_FILTER,
      payload: filterName,
    };
  },

  setRenderedMoviesCount: (renderedMoviesCount) => {
    return {
      type: ActionType.SET_RENDERED_MOVIES_COUNT,
      payload: renderedMoviesCount,
    };
  },
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE_FILTER:
      return Object.assign({}, state, {
        currentGenreFilter: action.payload,
        renderedMoviesCount: MAX_RENDERED_MOVIES_AT_TIME,
      });

    case ActionType.SET_RENDERED_MOVIES_COUNT:
      return Object.assign({}, state, {
        renderedMoviesCount: action.payload,
      });
  }

  return state;
};


export {reducer, ActionType, ActionCreator};
