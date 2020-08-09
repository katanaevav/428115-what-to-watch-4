import * as React from "react";
import * as renderer from "react-test-renderer";
import GenreList from "./genre-list";
import {emptyFunction} from "../../utils";

const CURRENT_GENRE = `Fantasy`;

const GENRES: Array<string> = [`Drama`, `Fantasy`];

it(`Render filter genres buttons`, () => {
  const tree = renderer.create(
      <GenreList
        currentGenre = {CURRENT_GENRE}
        genres = {GENRES}
        onGenreClick = {emptyFunction}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
