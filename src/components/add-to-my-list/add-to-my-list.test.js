import React from "react";
import renderer from "react-test-renderer";
import AddToMyList from "./add-to-my-list.jsx";
import {AuthorizationStatus} from "../../const.js";

it(`Render add to My list button with isInList status`, () => {
  const tree = renderer.create(
      <AddToMyList
        isInList = {true}
        onButtonClick = {() => {}}
        authorizationStatus = {AuthorizationStatus.AUTH}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render add to My list button without isInList status`, () => {
  const tree = renderer.create(
      <AddToMyList
        isInList = {false}
        onButtonClick = {() => {}}
        authorizationStatus = {AuthorizationStatus.AUTH}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
