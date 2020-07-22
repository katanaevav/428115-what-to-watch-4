import {AuthorizationStatus} from "../../const.js";
import {ActionCreator as StateActionCreator} from "../state/state.js";

const AUTH_ERROR_TEXT = `We can’t recognize this email and password combination. Please try again.`;

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        authorizationStatus: action.payload,
      });
  }

  return state;
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      })
      .catch((err) => {
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {

    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
      .then(() => {
        dispatch(StateActionCreator.openMainPage());
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      })
      .catch((err) => {
        dispatch(StateActionCreator.openAuthPage(AUTH_ERROR_TEXT));
        throw err;
      });
  },
};

export {
  ActionCreator,
  ActionType,
  AuthorizationStatus,
  Operation,
  reducer,
};
