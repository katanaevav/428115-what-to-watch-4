import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, ActionType, Operation} from "./data.js";
import {SavingStatus} from "../../const.js";
import {createMovie, createMovies, createComments} from "../../adapter/films.js";

const api = createAPI(() => {});

const Comments = [
  {
    id: 1,
    user: {
      id: 4,
      name: `Kate Muir`
    },
    rating: 8.9,
    comment: `Discerning travellers and Wes Anderson`,
    date: `2019-05-08T14:13:56.569Z`
  },
];

const PromoMovie = {
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

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    promoMovie: {},
    movies: [],
    myMovies: [],
    movieComments: [],
    savingMovieCommentStatus: ``,
    savingMovieFavoriteStatus: ``,
  });
});

it(`Reducer should load movies by LOAD_MOVIES`, () => {
  expect(reducer({
    promoMovie: {},
    movies: [],
    myMovies: [],
    movieComments: [],
    savingMovieCommentStatus: ``,
    savingMovieFavoriteStatus: ``,
  }, {
    type: ActionType.LOAD_MOVIES,
    payload: Movies,
  })).toEqual({
    movieComments: [],
    movies: Movies,
    myMovies: [],
    promoMovie: {},
    savingMovieCommentStatus: ``,
    savingMovieFavoriteStatus: ``,
  });
});

it(`Reducer should load my movies by LOAD_MY_MOVIES`, () => {
  expect(reducer({
    promoMovie: {},
    movies: [],
    myMovies: [],
    movieComments: [],
    savingMovieCommentStatus: ``,
    savingMovieFavoriteStatus: ``,
  }, {
    type: ActionType.LOAD_MY_MOVIES,
    payload: Movies,
  })).toEqual({
    movieComments: [],
    movies: [],
    myMovies: Movies,
    promoMovie: {},
    savingMovieCommentStatus: ``,
    savingMovieFavoriteStatus: ``,
  });
});

it(`Reducer should load promo movie by LOAD_PROMO_MOVIE`, () => {
  expect(reducer({
    promoMovie: {},
    movies: [],
    myMovies: [],
    movieComments: [],
    savingMovieCommentStatus: ``,
    savingMovieFavoriteStatus: ``,
  }, {
    type: ActionType.LOAD_PROMO_MOVIE,
    payload: PromoMovie,
  })).toEqual({
    promoMovie: PromoMovie,
    movies: [],
    myMovies: [],
    movieComments: [],
    savingMovieCommentStatus: ``,
    savingMovieFavoriteStatus: ``,
  });
});

it(`Reducer should load comments by LOAD_MOVIE_COMMENTS`, () => {
  expect(reducer({
    promoMovie: {},
    movies: [],
    myMovies: [],
    movieComments: [],
    savingMovieCommentStatus: ``,
    savingMovieFavoriteStatus: ``,
  }, {
    type: ActionType.LOAD_MOVIE_COMMENTS,
    payload: Comments,
  })).toEqual({
    promoMovie: {},
    movies: [],
    myMovies: [],
    movieComments: Comments,
    savingMovieCommentStatus: ``,
    savingMovieFavoriteStatus: ``,
  });
});

it(`Reducer should update savingMovieCommentStatus by SAVE_MOVIE_COMMENT`, () => {
  expect(reducer({
    savingMovieCommentStatus: ``,
  }, {
    type: ActionType.SAVE_MOVIE_COMMENT,
    payload: SavingStatus.SUCCESS,
  })).toEqual({
    savingMovieCommentStatus: SavingStatus.SUCCESS,
  });
});

it(`Reducer should update savingMovieFavoriteStatus by CHANGE_FAVORITE_STATUS`, () => {
  expect(reducer({
    savingMovieFavoriteStatus: ``,
  }, {
    type: ActionType.CHANGE_FAVORITE_STATUS,
    payload: SavingStatus.SUCCESS,
  })).toEqual({
    savingMovieFavoriteStatus: SavingStatus.SUCCESS,
  });
});

it(`Reducer should update movies by UPDATE_MOVIES`, () => {
  expect(reducer({
    promoMovie: {},
    movies: [],
    myMovies: [],
    movieComments: [],
    savingMovieCommentStatus: ``,
    savingMovieFavoriteStatus: ``,
  }, {
    type: ActionType.UPDATE_MOVIES,
    payload: Movies,
  })).toEqual({
    movieComments: [],
    movies: Movies,
    myMovies: [],
    promoMovie: {},
    savingMovieCommentStatus: ``,
    savingMovieFavoriteStatus: ``,
  });
});

it(`Reducer should update promo movie by UPDATE_PROMO_MOVIE`, () => {
  expect(reducer({
    promoMovie: {},
    movies: [],
    myMovies: [],
    movieComments: [],
    savingMovieCommentStatus: ``,
    savingMovieFavoriteStatus: ``,
  }, {
    type: ActionType.UPDATE_PROMO_MOVIE,
    payload: PromoMovie,
  })).toEqual({
    promoMovie: PromoMovie,
    movies: [],
    myMovies: [],
    movieComments: [],
    savingMovieCommentStatus: ``,
    savingMovieFavoriteStatus: ``,
  });
});

it(`Reducer should update my movies by UPDATE_MY_MOVIES`, () => {
  expect(reducer({
    promoMovie: {},
    movies: [],
    myMovies: [],
    movieComments: [],
    savingMovieCommentStatus: ``,
    savingMovieFavoriteStatus: ``,
  }, {
    type: ActionType.UPDATE_MY_MOVIES,
    payload: Movies,
  })).toEqual({
    movieComments: [],
    movies: [],
    myMovies: Movies,
    promoMovie: {},
    savingMovieCommentStatus: ``,
    savingMovieFavoriteStatus: ``,
  });
});


describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /films`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = Operation.loadMovies(() => {});

    apiMock
      .onGet(`/films`)
      .reply(200, [{fake: true}]);

    return moviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_MOVIES,
          payload: createMovies([{fake: true}]),
        });
      });
  });

  it(`Should make a correct API call to /films/promo`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const promoMovieLoader = Operation.loadPromoMovie(() => {});

    apiMock
      .onGet(`/films/promo`)
      .reply(200, {fake: true});

    return promoMovieLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PROMO_MOVIE,
          payload: createMovie({fake: true}),
        });
      });
  });

  it(`Should make a correct API call to /favorite`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = Operation.loadMyMovies(() => {});

    apiMock
      .onGet(`/favorite`)
      .reply(200, [{fake: true}]);

    return moviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_MY_MOVIES,
          payload: createMovies([{fake: true}]),
        });
      });
  });

  it(`Should make a correct API call to /comments/1`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const movieCommentsLoader = Operation.loadMovieComments(1);

    apiMock
      .onGet(`/comments/1`)
      .reply(200, Comments);

    return movieCommentsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_MOVIE_COMMENTS,
          payload: createComments(Comments),
        });
      });
  });

  it(`Should make a correct API call to save comment /comments/1`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const saveMovieCommentCallback = jest.fn();
    const saveComment = Operation.saveMovieComment({movieId: 1, rating: 5, comment: ``}, saveMovieCommentCallback);

    apiMock
      .onPost(`/comments/1`)
      .reply(200, [{fake: true}]);

    return saveComment(dispatch, () => {}, api)
      .then(() => {
        expect(saveMovieCommentCallback).toHaveBeenCalledTimes(1);
      });
  });

  it(`Should make a correct API call to change favorite status /favorite/1/1`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const saveStatusCallback = jest.fn();
    const saveFavoriteStatus = Operation.saveMovieFavoriteStatus({isFavorite: true, movieId: 1}, saveStatusCallback);

    apiMock
      .onPost(`/favorite/1/1`)
      .reply(200, [{fake: true}]);

    const mockState = {
      DATA: {
        promoMovie: Movies[0],
        movies: Movies,
        myMovies: Movies,
      }
    };

    const getState = () => mockState;

    return saveFavoriteStatus(dispatch, getState, api)
      .then(() => {
        expect(saveStatusCallback).toHaveBeenCalledTimes(1);
      });
  });
});
