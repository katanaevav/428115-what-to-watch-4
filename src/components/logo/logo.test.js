import React from "react";
import renderer from "react-test-renderer";
import Logo from "./logo.jsx";

it(`Render logo element`, () => {
  const tree = renderer.create(
      <Logo />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render logo element with light modify`, () => {
  const tree = renderer.create(
      <Logo
        light = {true}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
