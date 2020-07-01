import React from "react";
import renderer from "react-test-renderer";
import MovieOverview from "./movie-overview.jsx";

const Movie = {
  id: 2,
  title: `Johnny english`,
  smallPoster: `img/johnny-english.jpg`,
  genre: `Comedy`,
  year: 2011,
  runTime: `1h 50m`,
  bigPoster: `img/johnny-english.jpg`,
  cover: `img/johnny-english.jpg`,
  ratingScore: `6,5`,
  ratingCount: 34786,
  preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  directors: [`Оливер Паркер`],
  starrings: [`Роуэн Эткинсон`, `Джиллиан Андерсон`, `Доминик Уэст`, `Розамунд Пайк`, `Дэниэл Калуя`, `Марк Иванир`, `Берн Горман`, `Жозефин де ла Буме`, `Тим Макиннерни`, `Пик Сен Лим`],
  descriptions: [
    `Действие фильма разворачивается через 8 лет после событий предшествующего фильма и с тех пор карьера сэра Джонни Инглиша ухудшается.`,
    `За 5 лет до начала фильма его направили с заданием в Мозамбик, но миссия пошла ужасно плохо. С тех пор он живёт в пещере в горах Тибета, прячась ото всех из-за стыда, сожалений и обвинений в провале миссии.`,
    `Фильм начинается, когда герой находится на крайне низком моральном уровне, пока ему не дают ещё один шанс. Британская разведка МИ-7 снова нуждается в нём и ей надо вернуть агента, чтобы тот сорвал заговор группы киллеров, планирующих убить китайского премьер-министра.`,
  ],
  reviews: [
    {
      id: 0,
      text: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
      author: `Kate Muir`,
      date: Date.parse(`June 3, 2019`),
      mark: `5`,
    },
    {
      id: 1,
      text: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`,
      author: `Paula Fleri-Soler`,
      date: Date.parse(`December 11, 2019`),
      mark: `5`,
    },
    {
      id: 2,
      text: `I didn't find it amusing, and while I can appreciate the creativity, it's an hour and 40 minutes I wish I could take back.`,
      author: `Amanda Greever`,
      date: Date.parse(`November 6, 2019`),
      mark: `4`,
    },
  ],
};

it(`Render App`, () => {
  const tree = renderer.create(
      <MovieOverview
        ratingScore = {Movie.ratingScore}
        ratingCount = {Movie.ratingCount}
        descriptions = {Movie.descriptions}
        directors = {Movie.directors}
        starrings = {Movie.starrings}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
