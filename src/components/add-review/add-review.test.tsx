import * as React from "react";
import * as renderer from "react-test-renderer";
import AddReview from "./add-review";
import {AuthorizationStatus} from "../../const";
import {Router} from "react-router-dom";
import history from "../../history";
import {emptyFunction} from "../../utils";
import {Movie} from "../../types";


const movie: Movie = {
  id: 0,
  title: `Bohemian rhapsody`,
  smallPoster: `img/bohemian-rhapsody.jpg`,
  genre: `Drama`,
  year: 2018,
  runTime: 190,
  bigPoster: `img/bohemian-rhapsody.jpg`,
  cover: `img/bohemian-rhapsody.jpg`,
  isFavorite: true,
  ratingScore: 7.9,
  ratingCount: 284651,
  backgroundColor: `#AABBCC`,
  video: ``,
  preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  directors: [`Брайан Сингер`],
  starrings: [`Рами Малек`, `Люси Бойнтон`, `Гвилим Ли`, `Бен Харди`, `Джозеф Маццелло`, `Эйдан Гиллен`, `Аллен Лич`, `Том Холландер`, `Майк Майерс`, `Аарон МакКаскер`],
  descriptions: [
    `Чествование группы Queen, их музыки и их выдающегося вокалиста Фредди Меркьюри, который бросил вызов стереотипам и победил условности, чтобы стать одним из самых любимых артистов на планете.`,
    `Фильм прослеживает головокружительный путь группы к успеху благодаря их культовым песням и революционному звуку, практически распад коллектива, поскольку образ жизни Меркьюри выходит из-под контроля, и их триумфальное воссоединение накануне концерта Live Aid, ставшим одним из величайших выступлений в истории рок-музыки.`,
  ],
};


it(`Render cinema screen`, () => {
  const tree = renderer.create(
      <Router history = {history}>
        <AddReview
          movie = {movie}
          authorizationStatus = {AuthorizationStatus.AUTH}
          avatarUrl = {``}
          disableForm = {false}
          onPostButtonClick = {emptyFunction}
          onMarkChange = {emptyFunction}
        />
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
