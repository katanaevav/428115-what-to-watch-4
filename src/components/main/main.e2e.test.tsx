import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import Main from "./main";
import {AuthorizationStatus} from "../../const";
import {Movie} from "../../types";


configure({
  adapter: new Adapter(),
});


const NO_FILTER = `All genres`;

const GENRES: Array<string> = [`Drama`, `Fantasy`];

const PromoMovie: Movie = {
  id: 10,
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
  isFavorite: false,
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  video: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  directors: [`Уэс Андерсон`],
  starrings: [`Рэйф Файнс`, `Тони Револори`, `Сирша Ронан`, `Эдриан Броуди`, `Уиллем Дефо`, `Эдвард Нортон`, `Матьё Амальрик`, `Харви Кейтель`, `Ф. Мюррэй Абрахам`, `Тильда Суинтон`],
  descriptions: [
    `Фильм рассказывает об увлекательных приключениях легендарного консьержа Густава и его юного друга, портье Зеро Мустафы.`,
    `Сотрудники гостиницы становятся свидетелями кражи и поисков бесценных картин эпохи Возрождения, борьбы за огромное состояние богатой семьи и… драматических изменений в Европе между двумя кровопролитными войнами XX века.`
  ],
};

const Movies: Array<Movie> = [
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
    isFavorite: false,
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


it(`Should filter be pressed`, () => {
  const onMovieFilterClick = jest.fn();

  const main = shallow(
      <Main
        authorizationStatus = {AuthorizationStatus.NO_AUTH}
        avatarUrl = {``}
        promoMovie = {PromoMovie}
        genres = {GENRES}
        movies = {Movies}
        currentGenreFilter = {NO_FILTER}
        onMovieFilterClick = {onMovieFilterClick}
        savingMovieFavoriteStatus = {``}
        setFavoriteStatus = {() => null}
      />
  );

  const filterButtons = main.find(`a.catalog__genres-link`);

  filterButtons.forEach((filterButton, index) => {
    filterButtons.props().onClick();
    expect(onMovieFilterClick.mock.calls.length).toBe(index + 1);
  });
});
