import React from "react";
import renderer from "react-test-renderer";
import UserBlock from "./user-block.jsx";
import {AuthorizationStatus} from "../../const.js";
import {BrowserRouter} from "react-router-dom";

it(`Render user block element for not authorized user`, () => {
  const tree = renderer.create(
      <BrowserRouter>
        <UserBlock
          authorizationStatus={AuthorizationStatus.NO_AUTH}
          avatarUrl = {``}
        />
      </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render user block element for authorized user`, () => {
  const tree = renderer.create(
      <BrowserRouter>
        <UserBlock
          authorizationStatus={AuthorizationStatus.AUTH}
          avatarUrl = {``}
        />
      </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
