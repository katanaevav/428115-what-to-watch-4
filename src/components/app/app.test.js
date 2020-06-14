import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const PromoMovie = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
};

const movieTitles = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`];

it(`Render App`, () => {
  const tree = renderer.create(
      <App
        promoMovieTitle = {PromoMovie.title}
        promoMovieGenre = {PromoMovie.genre}
        promoMovieYear = {PromoMovie.year}
        movies = {movieTitles}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
