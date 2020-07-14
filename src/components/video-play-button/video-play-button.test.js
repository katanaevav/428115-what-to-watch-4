import React from "react";
import renderer from "react-test-renderer";
import VideoPlayButton from "./video-play-button.jsx";

it(`Render video play button`, () => {
  const tree = renderer.create(
      <VideoPlayButton
        onPlayButtonClick = {() => {}}
        isPlaying = {false}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render video pause button`, () => {
  const tree = renderer.create(
      <VideoPlayButton
        onPlayButtonClick = {() => {}}
        isPlaying = {true}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
