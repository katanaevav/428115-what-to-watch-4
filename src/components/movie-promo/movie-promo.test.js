import React from "react";
import renderer from "react-test-renderer";
import MoviePromo from "./movie-promo.jsx";

const Movie = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
  bigPoster: `img/the-grand-budapest-hotel-poster.jpg`,
  cover: `img/bg-the-grand-budapest-hotel.jpg`,
};

it(`Render promo movie section`, () => {
  const tree = renderer.create(
      <MoviePromo
        promoMovieTitle = {Movie.title}
        promoMovieGenre = {Movie.genre}
        promoMovieYear = {Movie.year}
        cover = {Movie.cover}
        bigPoster = {Movie.bigPoster}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
