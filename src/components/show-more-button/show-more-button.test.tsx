import * as React from "react";
import * as renderer from "react-test-renderer";
import ShowMoreButton from "./show-more-button";
import {emptyFunction} from "../../utils";

it(`Render Show more button`, () => {
  const tree = renderer.create(
      <ShowMoreButton
        onShowMoreButtonClick = {emptyFunction}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
