import {AuthorizationStatus, Url, AppRoute} from "../../const";
import {Operation as DataOperation} from "../data/data";


const AUTH_ERROR_TEXT = `We can’t recognize this email and password combination. Please try again.`;


const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  avatarUrl: ``,
};


const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  GET_USER_AVATAR: `GET_USER_AVATAR`,
};


const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },

  getUserAvatar: (avatar) => {
    return {
      type: ActionType.GET_USER_AVATAR,
      payload: avatar,
    };
  },
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        authorizationStatus: action.payload,
      });

    case ActionType.GET_USER_AVATAR:
      return Object.assign({}, state, {
        avatarUrl: action.payload,
      });
  }

  return state;
};


const Operation = {
  checkAuth: (action) => (dispatch, getState, api) => {
    return api.get(AppRoute.LOGIN)
      .then((result) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.getUserAvatar(Url.START_URL + result.data.avatar_url));
        action();
      })
      .catch((err) => {
        throw err;
      });
  },

  login: (authData, action) => (dispatch, getState, api) => {
    return api.post(AppRoute.LOGIN, {
      email: authData.login,
      password: authData.password,
    })
      .then((result) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.getUserAvatar(Url.START_URL + result.data.avatar_url));
        dispatch(DataOperation.loadPromoMovie(() => {}));
        dispatch(DataOperation.loadMyMovies());
        dispatch(DataOperation.loadMovies(() => {}));
      })
      .catch((err) => {
        action(AUTH_ERROR_TEXT);
        throw err;
      });
  },
};


export {
  ActionCreator,
  ActionType,
  Operation,
  reducer,
};
