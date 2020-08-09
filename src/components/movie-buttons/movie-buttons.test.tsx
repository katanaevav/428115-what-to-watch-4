import * as React from "react";
import * as renderer from "react-test-renderer";
import MovieButtons from "./movie-buttons";
import {Router} from "react-router-dom";
import history from "../../history";
import {emptyFunction} from "../../utils";

it(`Should MovieButtons component render correctly`, () => {
  const tree = renderer.create(
      <Router history = {history}>
        <MovieButtons
          isMainScreen = {false}
          movieId = {1}
          isFavorite = {false}
          onFavoriteButtonClick = {emptyFunction}
        />
      </Router>, {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Should MovieButtons component render correctly for main screen`, () => {
  const tree = renderer.create(
      <Router history = {history}>
        <MovieButtons
          isMainScreen = {true}
          movieId = {1}
          isFavorite = {false}
          onFavoriteButtonClick = {emptyFunction}
        />
      </Router>, {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
