import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withNewReview from "./with-new-review";
import {SavingStatus} from "../../const";
import {Movie} from "../../types";

const movie: Movie = {
  id: 0,
  title: `Bohemian rhapsody`,
  smallPoster: `img/bohemian-rhapsody.jpg`,
  genre: `Drama`,
  year: 2018,
  bigPoster: `img/bohemian-rhapsody.jpg`,
  cover: `img/bohemian-rhapsody.jpg`,
  ratingScore: 7.9,
  runTime: 170,
  ratingCount: 284651,
  isFavorite: true,
  backgroundColor: `#AABBCC`,
  video: ``,
  preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  directors: [`Брайан Сингер`],
  starrings: [`Рами Малек, Люси Бойнтон, Гвилим Ли, Бен Харди, Джозеф Маццелло, Эйдан Гиллен, Аллен Лич, Том Холландер, Майк Майерс, Аарон МакКаскер и другие`],
  descriptions: [`Чествование группы Queen, их музыки и их выдающегося вокалиста Фредди Меркьюри, который бросил вызов стереотипам и победил условности, чтобы стать одним из самых любимых артистов на планете. Фильм прослеживает головокружительный путь группы к успеху благодаря их культовым песням и революционному звуку, практически распад коллектива, поскольку образ жизни Меркьюри выходит из-под контроля, и их триумфальное воссоединение накануне концерта Live Aid, ставшим одним из величайших выступлений в истории рок-музыки.`],
};

configure({adapter: new Adapter()});

interface ReviewProps {
  onSaveComment: () => void;
}

const Review = (props: ReviewProps) => {
  const {onSaveComment} = props;
  return (
    <div>
      <button onClick = {onSaveComment} />
    </div>
  );
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
