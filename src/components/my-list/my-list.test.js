import React from "react";
import renderer from "react-test-renderer";
import MyList from "./my-list.jsx";
import {AuthorizationStatus} from "../../const.js";
import {Router} from "react-router-dom";
import history from "../../history.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";

const mockStore = configureStore([]);

const Movies = [
  {
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
  },
  {
    id: 1,
    title: `Moonrise kingdom`,
    smallPoster: `img/moonrise-kingdom.jpg`,
    genre: `Fantasy`,
    year: 2012,
    bigPoster: `img/moonrise-kingdom.jpg`,
    cover: `img/moonrise-kingdom.jpg`,
    ratingScore: 8.9,
    runTime: 170,
    ratingCount: 240,
    isFavorite: true,
    backgroundColor: `#AABBCC`,
    video: ``,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    directors: [`Уэс Андерсон`],
    starrings: [`Брюс Уиллис, Эдвард Нортон, Билл Мюррей, Фрэнсис МакДорманд, Джаред Гилман, Кара Хэйуорд, Боб Бэлабан, Тильда Суинтон, Джейсон Шварцман, Харви Кейтель и другие`],
    descriptions: [`60-е годы XX века. Пара влюблённых подростков, живущих на острове в Новой Англии, убегает из-под присмотра взрослых. Сэм Шакаски — бойскаут, сирота, от которого отказались приемные родители, из-за своего непростого характера ставший изгоем среди других бойскаутов, и Сьюзи Бишоп — замкнутая двенадцатилетняя неуравновешенная девочка, живущая мечтами о волшебных мирах. После обнаружения пропажи местный шериф начинает расследование, а вожатый лагеря бойскаутов организует поисковый отряд.`],
  },
];

it(`Render My list component`, () => {

  const store = mockStore({
    [NameSpace.STATE]: {
      renderedMoviesCount: 2,
    },
  });

  const tree = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <MyList
            myMovies = {Movies}
            authorizationStatus = {AuthorizationStatus.AUTH}
            avatarUrl = {``}
          />
        </Router>
      </Provider>, {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
