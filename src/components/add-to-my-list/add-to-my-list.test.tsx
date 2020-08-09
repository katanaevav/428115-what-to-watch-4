import * as React from "react";
import * as renderer from "react-test-renderer";
import AddToMyList from "./add-to-my-list";
import {emptyFunction} from "../../utils";

it(`Render add to My list button with isFavorite status`, () => {
  const tree = renderer.create(
      <AddToMyList
        isFavorite = {true}
        onButtonClick = {emptyFunction}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render add to My list button without isFavorite status`, () => {
  const tree = renderer.create(
      <AddToMyList
        isFavorite = {false}
        onButtonClick = {emptyFunction}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
