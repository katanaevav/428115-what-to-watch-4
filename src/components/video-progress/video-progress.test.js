import React from "react";
import renderer from "react-test-renderer";
import VideoProgress from "./video-progress.jsx";

it(`Render video progress bar and duration time`, () => {
  const tree = renderer.create(
      <VideoProgress
        currentProgress = {12}
        duration = {100}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
