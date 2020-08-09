import * as React from "react";
import * as renderer from "react-test-renderer";
import MovieReviews from "./movie-reviews";
import {Comment} from "../../types";

const Comments: Array<Comment> = [
  {
    id: 0,
    text: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    author: `Kate Muir`,
    date: Date.parse(`June 3, 2019`),
    mark: 5,
  },
  {
    id: 1,
    text: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`,
    author: `Paula Fleri-Soler`,
    date: Date.parse(`December 11, 2019`),
    mark: 5,
  },
  {
    id: 2,
    text: `I didn't find it amusing, and while I can appreciate the creativity, it's an hour and 40 minutes I wish I could take back.`,
    author: `Amanda Greever`,
    date: Date.parse(`November 6, 2019`),
    mark: 4,
  },
];

it(`Render MovieReviews`, () => {
  const tree = renderer.create(
      <MovieReviews
        reviews = {Comments}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
