import * as React from "react";
import * as renderer from "react-test-renderer";
import MoviePromo from "./movie-promo";
import {AuthorizationStatus} from "../../const";
import {Router} from "react-router-dom";
import history from "../../history";
import {Movie} from "../../types";


const movie: Movie = {
  id: 2,
  title: `Johnny english`,
  smallPoster: `img/johnny-english.jpg`,
  genre: `Comedy`,
  year: 2011,
  runTime: 170,
  bigPoster: `img/johnny-english.jpg`,
  cover: `img/johnny-english.jpg`,
  ratingScore: 6.5,
  ratingCount: 34786,
  backgroundColor: `#AABBCC`,
  video: ``,
  isFavorite: false,
  preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  directors: [`Оливер Паркер`],
  starrings: [`Роуэн Эткинсон`, `Джиллиан Андерсон`, `Доминик Уэст`, `Розамунд Пайк`, `Дэниэл Калуя`, `Марк Иванир`, `Берн Горман`, `Жозефин де ла Буме`, `Тим Макиннерни`, `Пик Сен Лим`],
  descriptions: [
    `Действие фильма разворачивается через 8 лет после событий предшествующего фильма и с тех пор карьера сэра Джонни Инглиша ухудшается.`,
    `За 5 лет до начала фильма его направили с заданием в Мозамбик, но миссия пошла ужасно плохо. С тех пор он живёт в пещере в горах Тибета, прячась ото всех из-за стыда, сожалений и обвинений в провале миссии.`,
    `Фильм начинается, когда герой находится на крайне низком моральном уровне, пока ему не дают ещё один шанс. Британская разведка МИ-7 снова нуждается в нём и ей надо вернуть агента, чтобы тот сорвал заговор группы киллеров, планирующих убить китайского премьер-министра.`,
  ],
};


it(`Render promo movie section`, () => {
  const tree = renderer.create(
      <Router history = {history}>
        <MoviePromo
          authorizationStatus = {AuthorizationStatus.NO_AUTH}
          promoMovieTitle = {movie.title}
          movieId = {1}
          avatarUrl = {``}
          promoMovieGenre = {movie.genre}
          promoMovieYear = {movie.year}
          cover = {movie.cover}
          bigPoster = {movie.bigPoster}
          isFavorite = {false}
          savingMovieFavoriteStatus = {``}
          setFavoriteStatus = {() => null}
        />
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
