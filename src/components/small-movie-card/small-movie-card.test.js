import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "./small-movie-card.jsx";

const Movie = {
  title: `Aviator`,
  smallPoster: `img/aviator.jpg`,
  genre: `Drama`,
  year: 2014,
};

it(`Render small movie card`, () => {
  const tree = renderer.create(
      <SmallMovieCard
        key = {Movie.title}
        movieTitle = {Movie.title}
        movieSmallPoster = {Movie.smallPoster}
        onMovieMouseOver = {() => {}}
        onMovieTitleClick = {() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
