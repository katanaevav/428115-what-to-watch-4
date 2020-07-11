import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const NO_FILTER = `All genres`;

const GENRES = [`Drama`, `Fantasy`];

const PromoMovie = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
  bigPoster: `img/the-grand-budapest-hotel-poster.jpg`,
  cover: `img/bg-the-grand-budapest-hotel.jpg`,
};

const Movies = [
  {
    id: 0,
    title: `Bohemian rhapsody`,
    smallPoster: `img/bohemian-rhapsody.jpg`,
    genre: `Drama`,
    year: 2018,
    bigPoster: `img/bohemian-rhapsody.jpg`,
    cover: `img/bohemian-rhapsody.jpg`,
    ratingScore: `7,9`,
    ratingCount: 284651,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    director: `Брайан Сингер`,
    starring: `Рами Малек, Люси Бойнтон, Гвилим Ли, Бен Харди, Джозеф Маццелло, Эйдан Гиллен, Аллен Лич, Том Холландер, Майк Майерс, Аарон МакКаскер и другие`,
    description: `Чествование группы Queen, их музыки и их выдающегося вокалиста Фредди Меркьюри, который бросил вызов стереотипам и победил условности, чтобы стать одним из самых любимых артистов на планете. Фильм прослеживает головокружительный путь группы к успеху благодаря их культовым песням и революционному звуку, практически распад коллектива, поскольку образ жизни Меркьюри выходит из-под контроля, и их триумфальное воссоединение накануне концерта Live Aid, ставшим одним из величайших выступлений в истории рок-музыки.`,
  },
  {
    id: 1,
    title: `Moonrise kingdom`,
    smallPoster: `img/moonrise-kingdom.jpg`,
    genre: `Fantasy`,
    year: 2012,
    bigPoster: `img/moonrise-kingdom.jpg`,
    cover: `img/moonrise-kingdom.jpg`,
    ratingScore: `8,9`,
    ratingCount: 240,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    director: `Уэс Андерсон`,
    starring: `Брюс Уиллис, Эдвард Нортон, Билл Мюррей, Фрэнсис МакДорманд, Джаред Гилман, Кара Хэйуорд, Боб Бэлабан, Тильда Суинтон, Джейсон Шварцман, Харви Кейтель и другие`,
    description: `60-е годы XX века. Пара влюблённых подростков, живущих на острове в Новой Англии, убегает из-под присмотра взрослых. Сэм Шакаски — бойскаут, сирота, от которого отказались приемные родители, из-за своего непростого характера ставший изгоем среди других бойскаутов, и Сьюзи Бишоп — замкнутая двенадцатилетняя неуравновешенная девочка, живущая мечтами о волшебных мирах. После обнаружения пропажи местный шериф начинает расследование, а вожатый лагеря бойскаутов организует поисковый отряд.`,
  },
];

it(`Should Main component render correctly`, () => {
  const tree = renderer.create(
      <Main
        promoMovieTitle = {PromoMovie.title}
        promoMovieGenre = {PromoMovie.genre}
        promoMovieYear = {PromoMovie.year}
        promoMovieCover = {PromoMovie.cover}
        promoMovieBigPoster = {PromoMovie.bigPoster}
        genres = {GENRES}
        movies = {Movies}
        onMovieTitleClick = {() => {}}
        currentGenreFilter = {NO_FILTER}
        onMovieFilterClick = {() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
