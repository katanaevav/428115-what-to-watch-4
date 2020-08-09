import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/app/app";
import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {createAPI} from "./api";
import {AuthorizationStatus} from "./const";
import reducer from "./reducer/reducer";
import {Operation as DataOperation} from "./reducer/data/data";
import {Operation as UserOperation, ActionCreator} from "./reducer/user/user";


const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        // window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(UserOperation.checkAuth(() => {
  store.dispatch(DataOperation.loadMyMovies());
}));

store.dispatch(DataOperation.loadMovies(() => {
  store.dispatch(DataOperation.loadPromoMovie(() => {
    ReactDOM.render(
        <Provider store = {store}>
          <App />
        </Provider>,
        document.querySelector(`#root`)
    );
  }
  ));
}
));
