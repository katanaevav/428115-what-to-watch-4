import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {Screens} from "../../const.js";
import {AuthorizationStatus} from "../../const.js";
import {SavingStatus} from "../../const.js";

const mockStore = configureStore([]);

const PromoMovie = {
  title: `The Grand Budapest Hotel`,
  smallPoster: `img/the-grand-budapest-hotel-poster.jpg`,
  genre: `Drama`,
  year: 2014,
  runTime: 170,
  bigPoster: `img/the-grand-budapest-hotel-poster.jpg`,
  cover: `img/bg-the-grand-budapest-hotel.jpg`,
  ratingScore: 8.9,
  ratingCount: 240,
  backgroundColor: `#AABBCC`,
  directors: [`Уэс Андерсон`],
  starrings: [`Рэйф Файнс`, `Тони Револори`, `Сирша Ронан`, `Эдриан Броуди`, `Уиллем Дефо`, `Эдвард Нортон`, `Матьё Амальрик`, `Харви Кейтель`, `Ф. Мюррэй Абрахам`, `Тильда Суинтон`],
  descriptions: [
    `Фильм рассказывает об увлекательных приключениях легендарного консьержа Густава и его юного друга, портье Зеро Мустафы.`,
    `Сотрудники гостиницы становятся свидетелями кражи и поисков бесценных картин эпохи Возрождения, борьбы за огромное состояние богатой семьи и… драматических изменений в Европе между двумя кровопролитными войнами XX века.`
  ],
  reviews: [
    {
      id: 0,
      text: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
      author: `Kate Muir`,
      date: Date.parse(`December 24, 2016`),
      mark: `4`,
    },
    {
      id: 1,
      text: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`,
      author: `Paula Fleri-Soler`,
      date: Date.parse(`December 15, 2018`),
      mark: `5`,
    },
    {
      id: 2,
      text: `I didn't find it amusing, and while I can appreciate the creativity, it's an hour and 40 minutes I wish I could take back.`,
      author: `Amanda Greever`,
      date: Date.parse(`November 18, 2015`),
      mark: `3`,
    },
  ],
};

const NO_FILTER = `All genres`;

const GENRES = [`Drama`, `Fantasy`];

const Movies = [
  {
    id: 0,
    title: `Bohemian rhapsody`,
    smallPoster: `img/bohemian-rhapsody.jpg`,
    genre: `Drama`,
    year: 2018,
    runTime: 190,
    bigPoster: `img/bohemian-rhapsody.jpg`,
    cover: `img/bohemian-rhapsody.jpg`,
    ratingScore: 7.9,
    ratingCount: 284651,
    backgroundColor: `#AABBCC`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    directors: [`Брайан Сингер`],
    starrings: [`Рами Малек`, `Люси Бойнтон`, `Гвилим Ли`, `Бен Харди`, `Джозеф Маццелло`, `Эйдан Гиллен`, `Аллен Лич`, `Том Холландер`, `Майк Майерс`, `Аарон МакКаскер`],
    descriptions: [
      `Чествование группы Queen, их музыки и их выдающегося вокалиста Фредди Меркьюри, который бросил вызов стереотипам и победил условности, чтобы стать одним из самых любимых артистов на планете.`,
      `Фильм прослеживает головокружительный путь группы к успеху благодаря их культовым песням и революционному звуку, практически распад коллектива, поскольку образ жизни Меркьюри выходит из-под контроля, и их триумфальное воссоединение накануне концерта Live Aid, ставшим одним из величайших выступлений в истории рок-музыки.`,
    ],
  },
  {
    id: 1,
    title: `Moonrise kingdom`,
    smallPoster: `img/moonrise-kingdom.jpg`,
    genre: `Fantasy`,
    year: 2012,
    runTime: 185,
    bigPoster: `img/moonrise-kingdom.jpg`,
    cover: `img/moonrise-kingdom.jpg`,
    ratingScore: 8.9,
    ratingCount: 240,
    backgroundColor: `#AABBCC`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    directors: [`Уэс Андерсон`],
    starrings: [`Брюс Уиллис`, `Эдвард Нортон`, `Билл Мюррей`, `Фрэнсис МакДорманд`, `Джаред Гилман`, `Кара Хэйуорд`, `Боб Бэлабан`, `Тильда Суинтон`, `Джейсон Шварцман`, `Харви Кейтель`],
    descriptions: [
      `60-е годы XX века. Пара влюблённых подростков, живущих на острове в Новой Англии, убегает из-под присмотра взрослых.`,
      `Сэм Шакаски — бойскаут, сирота, от которого отказались приемные родители, из-за своего непростого характера ставший изгоем среди других бойскаутов, и Сьюзи Бишоп — замкнутая двенадцатилетняя неуравновешенная девочка, живущая мечтами о волшебных мирах. После обнаружения пропажи местный шериф начинает расследование, а вожатый лагеря бойскаутов организует поисковый отряд.`,
    ],
  },
];

it(`Render App with Main screen`, () => {

  const store = mockStore({});

  const tree = renderer.create(
      <Provider store={store}>
        <App
          authorizationStatus={AuthorizationStatus.NO_AUTH}
          login={() => {}}
          avatarUrl = {``}
          savingMovieCommentStatus = {SavingStatus.SUCCESS}
          promoMovie = {PromoMovie}
          movies = {Movies}
          genres = {GENRES}
          currentGenreFilter = {NO_FILTER}
          onMovieFilterClick = {() => {}}
          onMovieTitleClick = {() => {}}
          onPlayMovieClick = {() => {}}
          selectedMovieId = {-1}
          onAddReviewClick = {() => {}}
          currentPage = {Screens.MAIN_SCREEN}
          onExitVideoPlayer = {() => {}}
          movieComments = {[]}
          getComments = {() => {}}
          saveComment = {() => {}}
          onOpenAuthScreen = {() => {}}
          authMessage = {``}
        />
      </Provider>, {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render App with Movie page screen`, () => {

  const store = mockStore({});

  const tree = renderer.create(
      <Provider store={store}>
        <App
          authorizationStatus={AuthorizationStatus.NO_AUTH}
          login={() => {}}
          avatarUrl = {``}
          savingMovieCommentStatus = {SavingStatus.SUCCESS}
          promoMovie = {PromoMovie}
          movies = {Movies}
          genres = {GENRES}
          currentGenreFilter = {NO_FILTER}
          onMovieFilterClick = {() => {}}
          onMovieTitleClick = {() => {}}
          onPlayMovieClick = {() => {}}
          selectedMovieId = {0}
          onAddReviewClick = {() => {}}
          currentPage = {Screens.MOVIE_PAGE_SCREEN}
          onExitVideoPlayer = {() => {}}
          movieComments = {[]}
          saveComment = {() => {}}
          getComments = {() => {}}
          onOpenAuthScreen = {() => {}}
          authMessage = {``}
        />
      </Provider>, {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
