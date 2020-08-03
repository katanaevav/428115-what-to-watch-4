import React from "react";
import renderer from "react-test-renderer";
import UserBlock from "./user-block.jsx";
import {AuthorizationStatus} from "../../const.js";
import {Router} from "react-router-dom";
import history from "../../history.js";

it(`Render user block element for not authorized user`, () => {
  const tree = renderer.create(
      <Router history= {history}>
        <UserBlock
          authorizationStatus= {AuthorizationStatus.NO_AUTH}
          avatarUrl = {``}
        />
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render user block element for authorized user`, () => {
  const tree = renderer.create(
      <Router history= {history}>
        <UserBlock
          authorizationStatus= {AuthorizationStatus.AUTH}
          avatarUrl = {``}
        />
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
