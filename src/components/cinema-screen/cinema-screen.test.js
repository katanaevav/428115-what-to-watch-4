import React from "react";
import renderer from "react-test-renderer";
import CinemaScreen from "./cinema-screen.jsx";

const Movie = {
  id: 0,
  title: `Aviator`,
  smallPoster: `img/aviator.jpg`,
  genre: `Drama`,
  year: 2004,
  runTime: 180,
  bigPoster: `img/aviator.jpg`,
  cover: `img/aviator.jpg`,
  ratingScore: 7.5,
  ratingCount: 121697,
  isFavorite: false,
  backgroundColor: `#AABBCC`,
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  video: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  directors: [`Мартин Скорсезе`],
  starrings: [`Леонардо ДиКаприо`, `Кейт Бланшетт`, `Мэтт Росс`, `Джон Си Райли`, `Алан Алда`, `Кейт Бекинсейл`, `Алек Болдуин`, `Иэн Холм`, `Адам Скотт`, `Дэнни Хьюстон`],
  descriptions: [
    `Получив от отца небольшую фабрику, Говард Хьюз превратил ее в гигантское, фантастически прибыльное предприятие. Став владельцем огромной кинокомпании, он снял самый дорогой для своего времени фильм и покорил сердца прелестнейших голливудских актрис.`,
    `Ему принадлежали самые престижные казино Лас-Вегаса и он установил рекорд скоростных полетов, приобрел вторую по величине коммерческую авиакомпанию…`,
    `Деньги жгут сердце Хьюза, они не дают ему покоя, а душа его рвется ввысь. Только там, на высоте нескольких тысяч метров он счастлив по-настоящему. Только там, где все решает лишь мастерство пилота и Бог, ничто не ценится так дорого, как верность и честь.`
  ],
};

it(`Render cinema screen`, () => {
  const tree = renderer.create(
      <CinemaScreen
        movie = {Movie}
        renderPlayer = {() => {}}
        renderProgress = {() => {}}
        renderPlayButton = {() => {}}
        onFullScreenButtonClick = {() => {}}
        onExitVideoPlayer = {() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
