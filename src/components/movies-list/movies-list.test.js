import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";

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

it(`Render App`, () => {
  const tree = renderer.create(
      <MoviesList
        movies = {Movies}
        onMovieMouseOver = {() => {}}
        onMovieTitleClick = {() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
