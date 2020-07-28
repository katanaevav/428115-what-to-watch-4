import React from "react";
import renderer from "react-test-renderer";
import MoviePromo from "./movie-promo.jsx";
import {AuthorizationStatus} from "../../const.js";
import {BrowserRouter} from "react-router-dom";

const Movie = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
  bigPoster: `img/the-grand-budapest-hotel-poster.jpg`,
  cover: `img/bg-the-grand-budapest-hotel.jpg`,
};

it(`Render promo movie section`, () => {
  const tree = renderer.create(
      <BrowserRouter>
        <MoviePromo
          authorizationStatus={AuthorizationStatus.NO_AUTH}
          promoMovieTitle = {Movie.title}
          avatarUrl = {``}
          promoMovieGenre = {Movie.genre}
          promoMovieYear = {Movie.year}
          cover = {Movie.cover}
          bigPoster = {Movie.bigPoster}
          onPlayPromoMovieClick = {() => {}}
          movieIsFavorite = {false}
          onFavoriteButtonClick = {() => {}}
        />
      </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
