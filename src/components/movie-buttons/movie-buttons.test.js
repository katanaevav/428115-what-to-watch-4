import React from "react";
import renderer from "react-test-renderer";
import MovieButtons from "./movie-buttons.jsx";
import {AuthorizationStatus} from "../../const.js";
import {Router} from "react-router-dom";
import history from "../../history.js";

it(`Should MovieButtons component render correctly`, () => {
  const tree = renderer.create(
      <Router history= {history}>
        <MovieButtons
          isMainScreen = {false}
          movieId = {1}
          authorizationStatus = {AuthorizationStatus.AUTH}
          isFavorite = {false}
          onFavoriteButtonClick = {() => {}}
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
      <Router history= {history}>
        <MovieButtons
          isMainScreen = {true}
          movieId = {1}
          authorizationStatus = {AuthorizationStatus.AUTH}
          isFavorite = {false}
          onFavoriteButtonClick = {() => {}}
        />
      </Router>, {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
