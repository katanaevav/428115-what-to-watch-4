import * as React from "react";
import * as renderer from "react-test-renderer";
import UserBlock from "./user-block";
import {AuthorizationStatus} from "../../const";
import {Router} from "react-router-dom";
import history from "../../history";


it(`Render user block element for not authorized user`, () => {
  const tree = renderer.create(
      <Router history = {history}>
        <UserBlock
          authorizationStatus = {AuthorizationStatus.NO_AUTH}
          avatarUrl = {``}
        />
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render user block element for authorized user`, () => {
  const tree = renderer.create(
      <Router history = {history}>
        <UserBlock
          authorizationStatus = {AuthorizationStatus.AUTH}
          avatarUrl = {``}
        />
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
