import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const PromoMovie = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
};

const Movies = [
  {
    id: 0,
    title: `Aviator`,
    smallPoster: `img/aviator.jpg`,
    genre: `Drama`,
    year: 2014,
  },
  {
    id: 1,
    title: `Bohemian rhapsody`,
    smallPoster: `img/bohemian-rhapsody.jpg`,
    genre: `Drama`,
    year: 2014,
  },
];

it(`Render App`, () => {
  const tree = renderer.create(
      <App
        promoMovieTitle = {PromoMovie.title}
        promoMovieGenre = {PromoMovie.genre}
        promoMovieYear = {PromoMovie.year}
        movies = {Movies}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
