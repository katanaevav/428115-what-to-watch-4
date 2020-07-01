import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";

const Movies = [
  {
    id: 0,
    title: `Aviator`,
    smallPoster: `img/aviator.jpg`,
    genre: `Drama`,
    year: 2004,
    runTime: `1h 39m`,
    bigPoster: `img/aviator.jpg`,
    cover: `img/aviator.jpg`,
    ratingScore: `7,5`,
    ratingCount: 121697,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    directors: [`Мартин Скорсезе`],
    starrings: [`Леонардо ДиКаприо`, `Кейт Бланшетт`, `Мэтт Росс`, `Джон Си Райли`, `Алан Алда`, `Кейт Бекинсейл`, `Алек Болдуин`, `Иэн Холм`, `Адам Скотт`, `Дэнни Хьюстон`],
    descriptions: [
      `Получив от отца небольшую фабрику, Говард Хьюз превратил ее в гигантское, фантастически прибыльное предприятие. Став владельцем огромной кинокомпании, он снял самый дорогой для своего времени фильм и покорил сердца прелестнейших голливудских актрис.`,
      `Ему принадлежали самые престижные казино Лас-Вегаса и он установил рекорд скоростных полетов, приобрел вторую по величине коммерческую авиакомпанию…`,
      `Деньги жгут сердце Хьюза, они не дают ему покоя, а душа его рвется ввысь. Только там, на высоте нескольких тысяч метров он счастлив по-настоящему. Только там, где все решает лишь мастерство пилота и Бог, ничто не ценится так дорого, как верность и честь.`
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
  },
  {
    id: 1,
    title: `Bohemian rhapsody`,
    smallPoster: `img/bohemian-rhapsody.jpg`,
    genre: `Drama`,
    year: 2018,
    runTime: `2h 30m`,
    bigPoster: `img/bohemian-rhapsody.jpg`,
    cover: `img/bohemian-rhapsody.jpg`,
    ratingScore: `7,9`,
    ratingCount: 284651,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    directors: [`Брайан Сингер`],
    starrings: [`Рами Малек`, `Люси Бойнтон`, `Гвилим Ли`, `Бен Харди`, `Джозеф Маццелло`, `Эйдан Гиллен`, `Аллен Лич`, `Том Холландер`, `Майк Майерс`, `Аарон МакКаскер`],
    descriptions: [
      `Чествование группы Queen, их музыки и их выдающегося вокалиста Фредди Меркьюри, который бросил вызов стереотипам и победил условности, чтобы стать одним из самых любимых артистов на планете.`,
      `Фильм прослеживает головокружительный путь группы к успеху благодаря их культовым песням и революционному звуку, практически распад коллектива, поскольку образ жизни Меркьюри выходит из-под контроля, и их триумфальное воссоединение накануне концерта Live Aid, ставшим одним из величайших выступлений в истории рок-музыки.`,
    ],
    reviews: [
      {
        id: 0,
        text: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
        author: `Kate Muir`,
        date: Date.parse(`May 24, 2020`),
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
        date: Date.parse(`November 18, 2019`),
        mark: `4`,
      },
      {
        id: 3,
        text: `I didn't find it amusing, and while I can appreciate the creativity, it's an hour and 40 minutes I wish I could take back.`,
        author: `Amanda Greever`,
        date: Date.parse(`November 18, 2019`),
        mark: `4`,
      },
    ],
  },
];

it(`Render App`, () => {
  const tree = renderer.create(
      <MoviePage
        id = {Movies[0].id}
        title = {Movies[0].title}
        genre = {Movies[0].genre}
        year = {Movies[0].year}
        runTime = {Movies[0].runTime}
        bigPoster = {Movies[0].bigPoster}
        cover = {Movies[0].cover}
        ratingScore = {Movies[0].ratingScore}
        ratingCount = {Movies[0].ratingCount}
        directors = {Movies[0].directors}
        starrings = {Movies[0].starrings}
        descriptions = {Movies[0].descriptions}
        reviews = {Movies[0].reviews}
        similarMovies = {Movies}
        onMovieTitleClick = {() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
