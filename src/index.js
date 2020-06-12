import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const PromoMovie = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
};

const movieTitles = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`];

ReactDOM.render(
    <App
      promoMovieTitle = {PromoMovie.title}
      promoMovieGenre = {PromoMovie.genre}
      promoMovieYear = {PromoMovie.year}
      movies = {movieTitles}
    />,
    document.querySelector(`#root`)
);
