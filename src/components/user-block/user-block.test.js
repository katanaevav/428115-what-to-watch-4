import React from "react";
import renderer from "react-test-renderer";
import UserBlock from "./user-block.jsx";

it(`Render user block element`, () => {
  const tree = renderer.create(
      <UserBlock />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
