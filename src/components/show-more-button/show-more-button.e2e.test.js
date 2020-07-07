import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ShowMoreButton from "./show-more-button.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should pressed on tabs in movie page`, () => {
  const onShowMoreButtonClick = jest.fn();

  const main = mount(
      <ShowMoreButton
        onShowMoreButtonClick = {onShowMoreButtonClick}
      />
  );

  const button = main.find(`button.catalog__button`);

  button.simulate(`click`, {});
  expect(onShowMoreButtonClick.mock.calls.length).toBe(1);
});
