import React from "react";
import renderer from "react-test-renderer";
import GenreList from "./genre-list.jsx";

const CURRENT_GENRE = `Fantasy`;

const GENRES = [`Drama`, `Fantasy`];

it(`Render filter genres buttons`, () => {
  const tree = renderer.create(
      <GenreList
        currentGenre = {CURRENT_GENRE}
        genres = {GENRES}
        onGenreClick = {() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
