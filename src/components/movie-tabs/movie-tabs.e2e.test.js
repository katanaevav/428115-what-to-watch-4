import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieTabs from "./movie-tabs.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should pressed on tabs in movie page`, () => {
  const onMovieTabClick = jest.fn();

  const main = mount(
      <MovieTabs
        currentTab = {0}
        onMovieTabClick= {onMovieTabClick}
      />
  );

  const movieTabs = main.find(`.movie-nav__link`);

  movieTabs.forEach((movieTab, index) => {
    movieTab.simulate(`click`, {});
    expect(onMovieTabClick.mock.calls.length).toBe(index + 1);
  });

});
