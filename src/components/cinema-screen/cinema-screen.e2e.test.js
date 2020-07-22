import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CinemaScreen from "./cinema-screen.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const Movie = {
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

it(`Should pressed on exit button in cinema video player`, () => {
  const onExitVideoPlayer = jest.fn();

  const main = mount(
      <CinemaScreen
        movie = {Movie}
        renderPlayer = {() => {}}
        renderProgress = {() => {}}
        renderPlayButton = {() => {}}
        onFullScreenButtonClick = {() => {}}
        onExitVideoPlayer = {onExitVideoPlayer}
      />
  );

  const exitButton = main.find(`.player__exit`);

  exitButton.simulate(`click`, {});
  expect(onExitVideoPlayer.mock.calls.length).toBe(1);

});
