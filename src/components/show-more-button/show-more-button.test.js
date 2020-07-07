import React from "react";
import renderer from "react-test-renderer";
import ShowMoreButton from "./show-more-button.jsx";

it(`Render Show more button`, () => {
  const tree = renderer.create(
      <ShowMoreButton
        onShowMoreButtonClick = {() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
