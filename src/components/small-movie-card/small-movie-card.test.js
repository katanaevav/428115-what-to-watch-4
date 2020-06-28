import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "./small-movie-card.jsx";

const Movie = {
  id: 0,
  title: `Aviator`,
  smallPoster: `img/aviator.jpg`,
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

it(`Render small movie card`, () => {
  const tree = renderer.create(
      <SmallMovieCard
        key = {Movie.id}
        movieId={Movie.id}
        movieTitle = {Movie.title}
        movieSmallPoster = {Movie.smallPoster}
        preview = {Movie.preview}
        onMovieMouseOver = {() => {}}
        onMovieMouseOut = {() => {}}
        onMovieTitleClick = {() => {}}
        renderPlayer = {() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
