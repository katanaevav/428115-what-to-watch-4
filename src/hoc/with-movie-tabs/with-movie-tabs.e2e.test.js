import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withMovieTabs from "./with-movie-tabs.js";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withMovieTabs(MockComponent);

it(`Should pressed on tabs in movie page`, () => {
  const onMovieTabClick = jest.fn();

  const wrapper = mount(
      <MockComponentWrapped
        currentTab = {0}
        onMovieTabClick = {onMovieTabClick}
      />
  );

  const movieTabs = wrapper.find(`.movie-nav__link`);

  movieTabs.forEach((movieTab, index) => {
    movieTab.simulate(`click`, {});
    expect(onMovieTabClick.mock.calls.length).toBe(index + 1);
  });

});
