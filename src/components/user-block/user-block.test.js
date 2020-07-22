import React from "react";
import renderer from "react-test-renderer";
import UserBlock from "./user-block.jsx";
import {AuthorizationStatus} from "../../const.js";

it(`Render user block element for not authorized user`, () => {
  const tree = renderer.create(
      <UserBlock
        onOpenAuthScreen={() => {}}
        authorizationStatus={AuthorizationStatus.NO_AUTH}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render user block element for authorized user`, () => {
  const tree = renderer.create(
      <UserBlock
        onOpenAuthScreen={() => {}}
        authorizationStatus={AuthorizationStatus.AUTH}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
