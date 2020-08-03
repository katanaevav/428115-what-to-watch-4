import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withNewReview from "./with-new-review.js";
import {SavingStatus} from "../../const.js";
import PropTypes from "prop-types";

configure({adapter: new Adapter()});

const movie = {};

const Review = (props) => {
  const {onSaveComment} = props;
  return (
    <div>
      <button onClick= {onSaveComment} />
    </div>
  );
};

Review.propTypes = {
  onSaveComment: PropTypes.func.isRequired,
};

const MockComponentWrapped = withNewReview(Review);

it(`Should pressed on save comment button`, () => {
  const onSaveCommentClick = jest.fn();

  const wrapper = mount(
      <MockComponentWrapped
        movie = {movie}
        onSaveComment = {onSaveCommentClick}
        savingMovieCommentStatus = {SavingStatus.SUCCESS}
      />
  );

  const saveCommentButton = wrapper.find(`button`);

  saveCommentButton.simulate(`click`, {});
  expect(onSaveCommentClick.mock.calls.length).toBe(1);
});
