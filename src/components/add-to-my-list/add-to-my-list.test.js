import React from "react";
import renderer from "react-test-renderer";
import AddToMyList from "./add-to-my-list.jsx";

it(`Render add to My list button with isFavorite status`, () => {
  const tree = renderer.create(
      <AddToMyList
        isFavorite = {true}
        onButtonClick = {() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render add to My list button without isFavorite status`, () => {
  const tree = renderer.create(
      <AddToMyList
        isFavorite = {false}
        onButtonClick = {() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
