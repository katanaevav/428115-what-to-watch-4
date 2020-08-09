import * as React from "react";
import * as renderer from "react-test-renderer";
import Logo from "./logo";
import {Router} from "react-router-dom";
import history from "../../history";

it(`Render logo element`, () => {
  const tree = renderer.create(
      <Router history = {history}>
        <Logo
          isMainScreen = {false}
        />
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render logo element with light modify`, () => {
  const tree = renderer.create(
      <Router history = {history}>
        <Logo
          light = {true}
          isMainScreen = {false}
        />
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
