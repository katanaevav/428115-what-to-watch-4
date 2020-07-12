import React from "react";
import renderer from "react-test-renderer";
import CinemaScreen from "./cinema-screen.jsx";

it(`Render cinema screen`, () => {
  const tree = renderer.create(
      <CinemaScreen />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
