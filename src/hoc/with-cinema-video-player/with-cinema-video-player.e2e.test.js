import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withCinemaVideoPlayer from "./with-cinema-video-player.js";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withCinemaVideoPlayer(MockComponent);

it(`Should withCinemaVideoPlayer`, () => {
  const wrapper = mount(<MockComponentWrapped />);

  expect(wrapper.instance().state).toStrictEqual({
    isPlaying: false,
    isPaused: false,
    progress: 0,
    duration: 0,
    isFullScreen: false
  });
});
