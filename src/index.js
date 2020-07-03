import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import movies, {PromoMovie} from "./mocks/films.js";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducer.js";

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

ReactDOM.render(
    <Provider store={store}>
      <App
        promoMovieTitle = {PromoMovie.title}
        promoMovieGenre = {PromoMovie.genre}
        promoMovieYear = {PromoMovie.year}
        movies = {movies}
      />
    </Provider>,
    document.querySelector(`#root`)
);
