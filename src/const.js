import PropTypes from "prop-types";

export const MOVIE_PROP_TYPE = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  smallPoster: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  runTime: PropTypes.number.isRequired,
  bigPoster: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  ratingScore: PropTypes.number.isRequired,
  ratingCount: PropTypes.number.isRequired,
  preview: PropTypes.string.isRequired,
  video: PropTypes.string.isRequired,
  directors: PropTypes.arrayOf(PropTypes.string).isRequired,
  starrings: PropTypes.arrayOf(PropTypes.string).isRequired,
  descriptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  backgroundColor: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
});

export const START_URL = `https://4.react.pages.academy`;

export const NO_FILTER = `All genres`;

export const DELAY_BEFORE_START_PREVIEW = 1000;
export const MAX_RENDERED_MOVIES_AT_TIME = 8;

export const MAX_SIMILAR_MOVIES_COUNT = 4;

export const REVIEWS_COLUMNS_COUNT = 2;

export const MIN_VOLUME = 0.0;
export const NO_FULLSCREEN = false;

export const TABS_NAMES = [`Overview`, `Details`, `Reviews`];

export const SavingStatus = {
  SUCCESS: `SUCCESS`,
  FAIL: `FAIL`,
};

export const Tabs = {
  OVERVIEW_TAB: 0,
  DETAILS_TAB: 1,
  REVIEWS_TAB: 2,
};

export const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

export const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

export const AppRoute = {
  MY_LIST: `/mylist`,
  ADD_REVIEW: `/films/:id/review`,
  ROOT: `/`,
  LOGIN: `/login`,
  FILM: `/films/:id`,
  PLAYER: `/player/:id`,
};
