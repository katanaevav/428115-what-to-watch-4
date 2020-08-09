import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withSmallVideoPlayer from "./with-small-video-player";
import {emptyFunction} from "../../utils";


configure({adapter: new Adapter()});


const MockComponent = () => <div />;

const MockComponentWrapped = withSmallVideoPlayer(MockComponent);


it(`Should return correct state`, () => {
  const wrapper = shallow(<MockComponentWrapped
    movieId = {1}
    movieSmallPoster = {``}
    movieTitle = {``}
    preview = {``}
    onMovieMouseOver = {emptyFunction}
    onMovieMouseOut = {emptyFunction}
  />);

  expect(wrapper.state()).toEqual({isPlaying: false, isPaused: false});
});
