import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withAddToFavoriteButton from "./with-add-to-favorite-button.js";
import PropTypes from "prop-types";
import {AuthorizationStatus} from "../../const.js";

configure({adapter: new Adapter()});

const AddReview = (props) => {
  const {setFavoriteStatus} = props;
  return (
    <div>
      <button onClick={setFavoriteStatus} />
    </div>
  );
};

AddReview.propTypes = {
  setFavoriteStatus: PropTypes.func.isRequired,
};

const MockComponentWrapped = withAddToFavoriteButton(AddReview);

it(`Should withAddToFavoriteButton`, () => {
  const onSetFavoriteStatusClick = jest.fn();

  const wrapper = mount(<MockComponentWrapped
    setFavoriteStatus = {onSetFavoriteStatusClick}
    authorizationStatus = {AuthorizationStatus.AUTH}
    savingMovieFavoriteStatus = {``}
    movieId = {1}
    isFavorite = {true}
  />);

  const addToFavoriteButton = wrapper.find(`button`);

  addToFavoriteButton.simulate(`click`, {});
  expect(onSetFavoriteStatusClick.mock.calls.length).toBe(1);
});
