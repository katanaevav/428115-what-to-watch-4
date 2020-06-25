import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card.jsx";

const Movie = {
  id: 0,
  title: `Aviator`,
  smallPoster: `img/aviator.jpg`,
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

Enzyme.configure({
  adapter: new Adapter(),
});

// it(`Should mouse over event work on movie card`, () => {
//   const onMovieMouseOver = jest.fn();

//   const smallMovieCard = mount(
//       <SmallMovieCard
//         movieId={Movie.id}
//         movieTitle={Movie.title}
//         movieSmallPoster={Movie.smallPoster}
//         preview = {Movie.preview}
//         onMovieMouseOver={onMovieMouseOver}
//         onMovieTitleClick={() => {}}
//         renderPlayer = {() => {}}
//       />
//   );

//   const movieCard = smallMovieCard.find(`div.small-movie-card__image`);

//   movieCard.simulate(`mouseover`, {});

//   expect(onMovieMouseOver.mock.calls.length).toBe(1);
//   expect(Number.parseInt(onMovieMouseOver.mock.calls[0][0], 10)).toBe(Movie.id);

// });

it(`Should click event work on movie card`, () => {
  const onMovieTitleClick = jest.fn();

  const smallMovieCard = mount(
      <SmallMovieCard
        movieId={Movie.id}
        movieTitle={Movie.title}
        movieSmallPoster={Movie.smallPoster}
        preview={Movie.preview}
        onMovieTitleClick={onMovieTitleClick}
        renderPlayer = {() => {}}
      />
  );

  const movieCard = smallMovieCard.find(`a.small-movie-card__link`);

  movieCard.simulate(`click`, {});

  expect(onMovieTitleClick.mock.calls.length).toBe(1);
  expect(Number.parseInt(onMovieTitleClick.mock.calls[0][0], 10)).toBe(Movie.id);

});
