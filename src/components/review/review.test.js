import React from "react";
import renderer from "react-test-renderer";
import Review from "./review.jsx";

const MovieReview = {
  id: 0,
  text: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
  author: `Kate Muir`,
  date: Date.parse(`June 3, 2019`),
  mark: 5,
};

it(`Render MovieReview`, () => {
  const tree = renderer.create(
      <Review
        text = {MovieReview.text}
        author = {MovieReview.author}
        date = {MovieReview.date}
        mark = {MovieReview.mark}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
