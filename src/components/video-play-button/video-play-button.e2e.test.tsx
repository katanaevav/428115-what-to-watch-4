import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import VideoPlayButton from "./video-play-button";


configure({
  adapter: new Adapter(),
});


it(`Should pressed on play button`, () => {
  const onPlayButtonClick = jest.fn();

  const main = shallow(
      <VideoPlayButton
        onPlayButtonClick = {onPlayButtonClick}
        isPlaying = {false}
      />
  );

  const button = main.find(`button.player__play`);

  button.simulate(`click`, {});
  expect(onPlayButtonClick.mock.calls.length).toBe(1);
});
