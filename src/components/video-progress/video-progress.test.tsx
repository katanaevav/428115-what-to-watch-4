import * as React from "react";
import * as renderer from "react-test-renderer";
import VideoProgress from "./video-progress";


it(`Render video progress bar and duration time`, () => {
  const tree = renderer.create(
      <VideoProgress
        currentProgress = {12}
        duration = {100}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
