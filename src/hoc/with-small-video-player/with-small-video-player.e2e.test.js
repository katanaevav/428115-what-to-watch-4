import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withSmallVideoPlayer from "./with-small-video-player.js";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withSmallVideoPlayer(MockComponent);

it(`Should mouse over event work`, () => {
  const onMovieMouseOver = jest.fn();

  const wrapper = shallow(<MockComponentWrapped
    onMouseOver= {onMovieMouseOver}
    onMouseOut= {() => {}}
  />);

  wrapper.simulate(`mouseover`, {});
  expect(onMovieMouseOver.mock.calls.length).toBe(1);
});


it(`Should mouse out event work`, () => {
  const onMovieMouseOut = jest.fn();

  const wrapper = shallow(<MockComponentWrapped
    onMouseOver= {() => {}}
    onMouseOut= {onMovieMouseOut}
  />);

  wrapper.simulate(`mouseout`, {});
  expect(onMovieMouseOut.mock.calls.length).toBe(1);
});
