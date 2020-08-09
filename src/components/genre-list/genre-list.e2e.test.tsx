import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import GenreList from "./genre-list";


configure({
  adapter: new Adapter(),
});


const CURRENT_GENRE = `Fantasy`;

const GENRES: Array<string> = [`Drama`, `Fantasy`];


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
