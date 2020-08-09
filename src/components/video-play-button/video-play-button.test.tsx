import * as React from "react";
import * as renderer from "react-test-renderer";
import VideoPlayButton from "./video-play-button";
import {emptyFunction} from "../../utils";

it(`Render video play button`, () => {
  const tree = renderer.create(
      <VideoPlayButton
        onPlayButtonClick = {emptyFunction}
        isPlaying = {false}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render video pause button`, () => {
  const tree = renderer.create(
      <VideoPlayButton
        onPlayButtonClick = {emptyFunction}
        isPlaying = {true}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
