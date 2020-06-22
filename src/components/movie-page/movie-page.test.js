import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";

const Movie = {
  id: 0,
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
  bigPoster: `img/the-grand-budapest-hotel-poster.jpg`,
  cover: `img/bg-the-grand-budapest-hotel.jpg`,
  ratingScore: `8,9`,
  ratingCount: 240,
  director: `Уэс Андерсон`,
  starring: `Рэйф Файнс, Тони Револори, Сирша Ронан, Эдриан Броуди, Уиллем Дефо, Эдвард Нортон, Матьё Амальрик, Харви Кейтель, Ф. Мюррэй Абрахам, Тильда Суинтон и другие`,
  description: `Фильм рассказывает об увлекательных приключениях легендарного консьержа Густава и его юного друга, портье Зеро Мустафы. Сотрудники гостиницы становятся свидетелями кражи и поисков бесценных картин эпохи Возрождения, борьбы за огромное состояние богатой семьи и… драматических изменений в Европе между двумя кровопролитными войнами XX века.`
};

it(`Render App`, () => {
  const tree = renderer.create(
      <MoviePage
        id = {Movie.id}
        title = {Movie.title}
        genre = {Movie.genre}
        year = {Movie.year}
        bigPoster = {Movie.bigPoster}
        cover = {Movie.cover}
        ratingScore = {Movie.ratingScore}
        ratingCount = {Movie.ratingCount}
        director = {Movie.director}
        starring = {Movie.starring}
        description = {Movie.description}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
