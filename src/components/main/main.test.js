import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const PromoMovie = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
};

const Movies = [
  {
    title: `Aviator`,
    smallPoster: `img/aviator.jpg`,
    genre: `Drama`,
    year: 2014,
  },
  {
    title: `Bohemian rhapsody`,
    smallPoster: `img/bohemian-rhapsody.jpg`,
    genre: `Drama`,
    year: 2014,
  },
];

it(`Should Main component render correctly`, () => {
  const tree = renderer.create(
      <Main
        promoMovieTitle = {PromoMovie.title}
        promoMovieGenre = {PromoMovie.genre}
        promoMovieYear = {PromoMovie.year}
        movies = {Movies}
        onMovieMouseOver = {() => {}}
        onMovieTitleClick = {() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
