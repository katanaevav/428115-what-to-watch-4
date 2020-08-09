import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withAddToFavoriteButton from "./with-add-to-favorite-button";
import {AuthorizationStatus} from "../../const.js";

configure({adapter: new Adapter()});

interface AddReviewProps {
  onFavoriteButtonClick: () => void;
}

const AddReview = (props: AddReviewProps) => {
  const {onFavoriteButtonClick} = props;
  return (
    <div>
      <button onClick = {onFavoriteButtonClick} />
    </div>
  );
};

const MockComponentWrapped = withAddToFavoriteButton(AddReview);

it(`Should withAddToFavoriteButton`, () => {
  const onSetFavoriteStatusClick = jest.fn();

  const wrapper = mount(<MockComponentWrapped
    isMainScreen = {false}
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
