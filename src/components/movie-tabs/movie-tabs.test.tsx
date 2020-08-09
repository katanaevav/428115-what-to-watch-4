import * as React from "react";
import * as renderer from "react-test-renderer";
import MovieTabs from "./movie-tabs";
import {emptyFunction} from "../../utils";


const CURRENT_TAB_INDEX = 0;


it(`Render movie tabs`, () => {
  const tree = renderer.create(
      <MovieTabs
        currentTab = {CURRENT_TAB_INDEX}
        onMovieTabClick = {emptyFunction}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
