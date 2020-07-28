import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, ActionType, Operation} from "./data.js";
import {SavingStatus} from "../../const.js";

const api = createAPI(() => {});

const comments = [
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
];

const PromoMovie = {
  id: 9,
  title: `The Grand Budapest Hotel`,
  smallPoster: `img/the-grand-budapest-hotel-poster.jpg`,
  genre: `Drama`,
  year: 2014,
  runTime: `1h 35m`,
  bigPoster: `img/the-grand-budapest-hotel-poster.jpg`,
  cover: `img/bg-the-grand-budapest-hotel.jpg`,
  ratingScore: `8,9`,
  ratingCount: 240,
  backgroundColor: `#AABBCC`,
  preview: `http://dl5.webmfiles.org/elephants-dream.webm`,
  video: `http://dl5.webmfiles.org/elephants-dream.webm`,
  directors: [`Уэс Андерсон`],
  starrings: [`Рэйф Файнс`, `Тони Револори`, `Сирша Ронан`, `Эдриан Броуди`, `Уиллем Дефо`, `Эдвард Нортон`, `Матьё Амальрик`, `Харви Кейтель`, `Ф. Мюррэй Абрахам`, `Тильда Суинтон`],
  descriptions: [
    `Фильм рассказывает об увлекательных приключениях легендарного консьержа Густава и его юного друга, портье Зеро Мустафы.`,
    `Сотрудники гостиницы становятся свидетелями кражи и поисков бесценных картин эпохи Возрождения, борьбы за огромное состояние богатой семьи и… драматических изменений в Европе между двумя кровопролитными войнами XX века.`
  ],
};

const movies = [
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
    backgroundColor: `#AABBCC`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    video: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    directors: [`Брайан Сингер`],
    starrings: [`Рами Малек`, `Люси Бойнтон`, `Гвилим Ли`, `Бен Харди`, `Джозеф Маццелло`, `Эйдан Гиллен`, `Аллен Лич`, `Том Холландер`, `Майк Майерс`, `Аарон МакКаскер`],
    descriptions: [
      `Чествование группы Queen, их музыки и их выдающегося вокалиста Фредди Меркьюри, который бросил вызов стереотипам и победил условности, чтобы стать одним из самых любимых артистов на планете.`,
      `Фильм прослеживает головокружительный путь группы к успеху благодаря их культовым песням и революционному звуку, практически распад коллектива, поскольку образ жизни Меркьюри выходит из-под контроля, и их триумфальное воссоединение накануне концерта Live Aid, ставшим одним из величайших выступлений в истории рок-музыки.`,
    ],
  },
  {
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
    backgroundColor: `#AABBCC`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    video: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    directors: [`Оливер Паркер`],
    starrings: [`Роуэн Эткинсон`, `Джиллиан Андерсон`, `Доминик Уэст`, `Розамунд Пайк`, `Дэниэл Калуя`, `Марк Иванир`, `Берн Горман`, `Жозефин де ла Буме`, `Тим Макиннерни`, `Пик Сен Лим`],
    descriptions: [
      `Действие фильма разворачивается через 8 лет после событий предшествующего фильма и с тех пор карьера сэра Джонни Инглиша ухудшается.`,
      `За 5 лет до начала фильма его направили с заданием в Мозамбик, но миссия пошла ужасно плохо. С тех пор он живёт в пещере в горах Тибета, прячась ото всех из-за стыда, сожалений и обвинений в провале миссии.`,
      `Фильм начинается, когда герой находится на крайне низком моральном уровне, пока ему не дают ещё один шанс. Британская разведка МИ-7 снова нуждается в нём и ей надо вернуть агента, чтобы тот сорвал заговор группы киллеров, планирующих убить китайского премьер-министра.`,
    ],
  },
  {
    id: 3,
    title: `Moonrise kingdom`,
    smallPoster: `img/moonrise-kingdom.jpg`,
    genre: `Fantasy`,
    year: 2012,
    runTime: `2h 10m`,
    bigPoster: `img/moonrise-kingdom.jpg`,
    cover: `img/moonrise-kingdom.jpg`,
    ratingScore: `8,9`,
    ratingCount: 240,
    backgroundColor: `#AABBCC`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    video: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    directors: [`Уэс Андерсон`],
    starrings: [`Брюс Уиллис`, `Эдвард Нортон`, `Билл Мюррей`, `Фрэнсис МакДорманд`, `Джаред Гилман`, `Кара Хэйуорд`, `Боб Бэлабан`, `Тильда Суинтон`, `Джейсон Шварцман`, `Харви Кейтель`],
    descriptions: [
      `60-е годы XX века. Пара влюблённых подростков, живущих на острове в Новой Англии, убегает из-под присмотра взрослых.`,
      `Сэм Шакаски — бойскаут, сирота, от которого отказались приемные родители, из-за своего непростого характера ставший изгоем среди других бойскаутов, и Сьюзи Бишоп — замкнутая двенадцатилетняя неуравновешенная девочка, живущая мечтами о волшебных мирах. После обнаружения пропажи местный шериф начинает расследование, а вожатый лагеря бойскаутов организует поисковый отряд.`,
    ],
  },
];

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    promoMovie: {},
    movies: [],
    movieComments: [],
    savingMovieCommentStatus: ``,
    savingMovieFavoriteStatus: ``,
  });
});

it(`Reducer should update movies by LOAD_MOVIES`, () => {
  expect(reducer({
    promoMovie: {},
    movies: [],
    movieComments: [],
    savingMovieCommentStatus: ``,
  }, {
    type: ActionType.LOAD_MOVIES,
    payload: movies,
  })).toEqual({
    promoMovie: {},
    movies,
    movieComments: [],
    savingMovieCommentStatus: ``,
  });
});

it(`Reducer should update promo movie by LOAD_PROMO_MOVIE`, () => {
  expect(reducer({
    promoMovie: {},
    movies: [],
    movieComments: [],
    savingMovieCommentStatus: ``,
  }, {
    type: ActionType.LOAD_PROMO_MOVIE,
    payload: PromoMovie,
  })).toEqual({
    promoMovie: PromoMovie,
    movies: [],
    movieComments: [],
    savingMovieCommentStatus: ``,
  });
});

it(`Reducer should update comments by LOAD_MOVIE_COMMENTS`, () => {
  expect(reducer({
    promoMovie: {},
    movies: [],
    movieComments: [],
    savingMovieCommentStatus: ``,
  }, {
    type: ActionType.LOAD_MOVIE_COMMENTS,
    payload: comments,
  })).toEqual({
    promoMovie: {},
    movies: [],
    movieComments: comments,
    savingMovieCommentStatus: ``,
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


describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /films`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = Operation.loadMovies();

    apiMock
      .onGet(`/films`)
      .reply(200, [{fake: true}]);

    return moviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_MOVIES,
          payload: [{fake: true}],
        });
      });
  });

  it(`Should make a correct API call to /films/promo`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const promoMovieLoader = Operation.loadPromoMovie();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, [{fake: true}]);

    return promoMovieLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PROMO_MOVIE,
          payload: [{fake: true}],
        });
      });
  });

  it(`Should make a correct API call to /comments/1`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const movieCommentsLoader = Operation.loadMovieComments(1);

    apiMock
      .onGet(`/comments/1`)
      .reply(200, [{fake: true}]);

    return movieCommentsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_MOVIE_COMMENTS,
          payload: [{fake: true}],
        });
      });
  });

  it(`Should make a correct API call to save comment /comments/1`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const saveMovieCommentCallback = jest.fn();
    const saveMovieComment = Operation.saveMovieComment({movieId: 1, rating: 5, comment: ``}, saveMovieCommentCallback);

    apiMock
      .onPost(`/comments/1`)
      .reply(200, [{fake: true}]);

    return saveMovieComment(dispatch, () => {}, api)
      .then(() => {
        expect(saveMovieCommentCallback).toHaveBeenCalledTimes(1);
      });
  });

  it(`Should make a correct API call to change favorite status /favorite/1/1`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const saveStatusCallback = jest.fn();
    const saveMovieFavoriteStatus = Operation.saveMovieFavoriteStatus({isFavorite: true, movieId: 1}, saveStatusCallback);

    apiMock
      .onPost(`/favorite/1/1`)
      .reply(200, [{fake: true}]);

    return saveMovieFavoriteStatus(dispatch, () => {}, api)
      .then(() => {
        expect(saveStatusCallback).toHaveBeenCalledTimes(1);
      });
  });
});
