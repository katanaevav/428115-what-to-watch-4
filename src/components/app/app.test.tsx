import * as React from "react";
import * as renderer from "react-test-renderer";
import {App} from "./app";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {AuthorizationStatus} from "../../const";
import {SavingStatus} from "../../const";
import NameSpace from "../../reducer/name-space";
import {Movie} from "../../types";
import {emptyFunction} from "../../utils";

const mockStore = configureStore([]);

const PromoMovie: Movie = {
  id: 0,
  title: `The Grand Budapest Hotel`,
  smallPoster: `img/the-grand-budapest-hotel-poster.jpg`,
  genre: `Drama`,
  year: 2014,
  runTime: 170,
  bigPoster: `img/the-grand-budapest-hotel-poster.jpg`,
  cover: `img/bg-the-grand-budapest-hotel.jpg`,
  ratingScore: 8.9,
  isFavorite: false,
  ratingCount: 240,
  preview: ``,
  video: ``,
  backgroundColor: `#AABBCC`,
  directors: [`Уэс Андерсон`],
  starrings: [`Рэйф Файнс`, `Тони Револори`, `Сирша Ронан`, `Эдриан Броуди`, `Уиллем Дефо`, `Эдвард Нортон`, `Матьё Амальрик`, `Харви Кейтель`, `Ф. Мюррэй Абрахам`, `Тильда Суинтон`],
  descriptions: [
    `Фильм рассказывает об увлекательных приключениях легендарного консьержа Густава и его юного друга, портье Зеро Мустафы.`,
    `Сотрудники гостиницы становятся свидетелями кражи и поисков бесценных картин эпохи Возрождения, борьбы за огромное состояние богатой семьи и… драматических изменений в Европе между двумя кровопролитными войнами XX века.`
  ],
};

const NO_FILTER = `All genres`;

const GENRES: Array<string> = [`Drama`, `Fantasy`];

const Movies: Array<Movie> = [
  {
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
    isFavorite: false,
    ratingScore: 8.9,
    ratingCount: 240,
    backgroundColor: `#AABBCC`,
    video: ``,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    directors: [`Уэс Андерсон`],
    starrings: [`Брюс Уиллис`, `Эдвард Нортон`, `Билл Мюррей`, `Фрэнсис МакДорманд`, `Джаред Гилман`, `Кара Хэйуорд`, `Боб Бэлабан`, `Тильда Суинтон`, `Джейсон Шварцман`, `Харви Кейтель`],
    descriptions: [
      `60-е годы XX века. Пара влюблённых подростков, живущих на острове в Новой Англии, убегает из-под присмотра взрослых.`,
      `Сэм Шакаски — бойскаут, сирота, от которого отказались приемные родители, из-за своего непростого характера ставший изгоем среди других бойскаутов, и Сьюзи Бишоп — замкнутая двенадцатилетняя неуравновешенная девочка, живущая мечтами о волшебных мирах. После обнаружения пропажи местный шериф начинает расследование, а вожатый лагеря бойскаутов организует поисковый отряд.`,
    ],
  },
];

const MyMovies: Array<Movie> = [
  {
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
  }];

it(`Render App with Main screen`, () => {

  const store = mockStore({
    [NameSpace.STATE]: {
      renderedMoviesCount: 2,
    },
  });

  const tree = renderer.create(
      <Provider store = {store}>
        <App
          authorizationStatus = {AuthorizationStatus.NO_AUTH}
          login = {() => null}
          avatarUrl = {``}
          savingMovieCommentStatus = {SavingStatus.SUCCESS}
          savingMovieFavoriteStatus = {SavingStatus.SUCCESS}
          promoMovie = {PromoMovie}
          movies = {Movies}
          myMovies = {MyMovies}
          genres = {GENRES}
          currentGenreFilter = {NO_FILTER}
          onMovieFilterClick = {emptyFunction}
          movieComments = {[]}
          getComments = {() => null}
          saveComment = {() => null}
          setFavoriteStatus = {() => null}
        />
      </Provider>, {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
