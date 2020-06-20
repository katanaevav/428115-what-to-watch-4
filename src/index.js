import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import movies, {PromoMovie} from "./mocks/films.js";

ReactDOM.render(
    <App
      promoMovieTitle = {PromoMovie.title}
      promoMovieGenre = {PromoMovie.genre}
      promoMovieYear = {PromoMovie.year}
      movies = {movies}
    />,
    document.querySelector(`#root`)
);
