import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withNewReview from "./with-new-review.js";
import {SavingStatus} from "../../const.js";

configure({adapter: new Adapter()});

const movie = {};
const MockComponent = () => <div />;
const MockComponentWrapped = withNewReview(MockComponent);

it(`Should pressed on tabs in movie page`, () => {
  const onSaveCommentClick = jest.fn();

  const wrapper = mount(
      <MockComponentWrapped
        movie = {movie}
        onSaveComment = {onSaveCommentClick}
        savingMovieCommentStatus = {SavingStatus.SUCCESS}
      />
  );

  const movieTabs = wrapper.find(`.movie-nav__link`);

  movieTabs.forEach((movieTab, index) => {
    movieTab.simulate(`click`, {});
    expect(onSaveCommentClick.mock.calls.length).toBe(index + 1);
  });

});
