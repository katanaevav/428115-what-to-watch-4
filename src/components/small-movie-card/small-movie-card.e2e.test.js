import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card.jsx";

const movie = {
  title: `Aviator`,
  smallPoster: `img/aviator.jpg`,
};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should mouse over work on movie card`, () => {
  const onMovieTitleClick = jest.fn();
  const onMovieMouseOver = jest.fn();

  const smallMovieCard = mount(
      <SmallMovieCard
        movieTitle={movie.title}
        movieSmallPoster={movie.smallPoster}
        onMovieMouseOver={onMovieMouseOver}
        onMovieTitleClick={onMovieTitleClick}
      />
  );

  const movieCard = smallMovieCard.find(`div.small-movie-card__image`);

  movieCard.simulate(`mouseover`, {});

  expect(onMovieMouseOver.mock.calls.length).toBe(1);
  expect(onMovieMouseOver.mock.calls[0][0]).toBe(movie.title);

});
