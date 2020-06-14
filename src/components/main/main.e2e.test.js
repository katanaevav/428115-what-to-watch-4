import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";

const PromoMovie = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
};

const movieTitles = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`];

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should movie header be pressed for each movie in list`, () => {
  const onMovieTitleClick = jest.fn();

  const main = shallow(
      <Main
        promoMovieTitle = {PromoMovie.title}
        promoMovieGenre = {PromoMovie.genre}
        promoMovieYear = {PromoMovie.year}
        movies = {movieTitles}
        onMovieTitleClick = {onMovieTitleClick}
      />
  );

  const movieHeaders = main.find(`a.small-movie-card__link`);

  movieHeaders.forEach((movieHeader, index) => {
    movieHeader.props().onClick();
    expect(onMovieTitleClick.mock.calls.length).toBe(index + 1);
  });

});
