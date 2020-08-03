import React from "react";
import renderer from "react-test-renderer";
import MoviePromo from "./movie-promo.jsx";
import {AuthorizationStatus} from "../../const.js";
import {Router} from "react-router-dom";
import history from "../../history.js";

const Movie = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
  bigPoster: `img/the-grand-budapest-hotel-poster.jpg`,
  cover: `img/bg-the-grand-budapest-hotel.jpg`,
};

it(`Render promo movie section`, () => {
  const tree = renderer.create(
      <Router history= {history}>
        <MoviePromo
          authorizationStatus= {AuthorizationStatus.NO_AUTH}
          promoMovieTitle = {Movie.title}
          movieId = {1}
          avatarUrl = {``}
          promoMovieGenre = {Movie.genre}
          promoMovieYear = {Movie.year}
          cover = {Movie.cover}
          bigPoster = {Movie.bigPoster}
          isFavorite = {false}
          savingMovieFavoriteStatus = {``}
          setFavoriteStatus = {() => {}}
        />
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
