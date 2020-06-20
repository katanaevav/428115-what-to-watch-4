import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
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

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should movie header be pressed and mouse over for each movie in list`, () => {
  const onMovieTitleClick = jest.fn();
  const onMovieMouseOver = jest.fn();

  const main = shallow(
      <Main
        promoMovieTitle = {PromoMovie.title}
        promoMovieGenre = {PromoMovie.genre}
        promoMovieYear = {PromoMovie.year}
        movies = {Movies}
        onMovieMouseOver = {onMovieMouseOver}
        onMovieTitleClick = {onMovieTitleClick}
      />
  );

  const movieHeaders = main.find(`a.small-movie-card__link`);

  movieHeaders.forEach((movieHeader, index) => {
    movieHeader.props().onClick();
    expect(onMovieTitleClick.mock.calls.length).toBe(index + 1);
  });

});
