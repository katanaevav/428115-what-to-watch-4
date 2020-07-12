import React from "react";
import renderer from "react-test-renderer";
import VideoPlayer from "./video-player.jsx";

const playerState = {
  IS_PLAYING: true,
  IS_PAUSED: false,
  VOLUME: 0.0,
};

const Movie = {
  smallPoster: `img/aviator.jpg`,
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

it(`Render video player`, () => {
  const tree = renderer.create(
      <VideoPlayer
        poster = {Movie.smallPoster}
        src = {Movie.preview}
        volume = {playerState.VOLUME}
        isPlaying = {playerState.IS_PLAYING}
        isPaused = {playerState.IS_PAUSED}
        onUpdateTime = {() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
