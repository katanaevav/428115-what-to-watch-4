import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GenreList from "./genre-list.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const CURRENT_GENRE = `Fantasy`;

const GENRES = [`Drama`, `Fantasy`];

it(`Should pressed on genre button`, () => {
  const onGenreTabClick = jest.fn();

  const main = mount(
      <GenreList
        currentGenre = {CURRENT_GENRE}
        genres = {GENRES}
        onGenreClick = {onGenreTabClick}
      />
  );

  const genreTabs = main.find(`.movie-nav__link`);

  genreTabs.forEach((genreTab, index) => {
    genreTab.simulate(`click`, {});
    expect(onGenreTabClick.mock.calls.length).toBe(index + 1);
  });

});
