import React from "react";
import renderer from "react-test-renderer";
import MovieTabs from "./movie-tabs.jsx";

const CURRENT_TAB_INDEX = 0;

it(`Render movie tabs`, () => {
  const tree = renderer.create(
      <MovieTabs
        currentTab = {CURRENT_TAB_INDEX}
        onMovieTabClick = {() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
