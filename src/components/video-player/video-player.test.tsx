import * as React from "react";
import * as renderer from "react-test-renderer";
import VideoPlayer from "./video-player";
import {Movie} from "../../types";
import {emptyFunction} from "../../utils";


interface MoviePlayerState {
  IS_PLAYING: boolean;
  IS_PAUSED: boolean;
  VOLUME: number;
}


const playerState: MoviePlayerState = {
  IS_PLAYING: true,
  IS_PAUSED: false,
  VOLUME: 0.0,
};

const movie: Movie = {
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
};


it(`Render video player`, () => {
  const tree = renderer.create(
      <VideoPlayer
        poster = {movie.smallPoster}
        src = {movie.preview}
        volume = {playerState.VOLUME}
        isPlaying = {playerState.IS_PLAYING}
        isPaused = {playerState.IS_PAUSED}
        onUpdateTime = {emptyFunction}
        onSetFullScreen = {emptyFunction}
        isFullScreen = {false}
      />, {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
