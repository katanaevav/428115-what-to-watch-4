import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieOverview from "../movie-overview/movie-overview.jsx";
import MovieDetails from "../movie-details/movie-details.jsx";
import MovieReviews from "../movie-reviews/movie-reviews.jsx";
import MoviesList from "../movies-list/movies-list.jsx";
import withMoviesList from "../../hoc/with-movies-list/with-movies-list.js";
import UserBlock from "../user-block/user-block.jsx";
import Logo from "../logo/logo.jsx";

const MoviesListWrapper = withMoviesList(MoviesList);

const Tabs = {
  OVERVIEW_TAB: 0,
  DETAILS_TAB: 1,
  REVIEWS_TAB: 2,
};

class MoviePage extends PureComponent {
  constructor(props) {
    super(props);

    this._renderTab = this._renderTab.bind(this);
  }


  _renderTab() {
    const {genre, year, runTime, ratingScore, ratingCount, directors, starrings, descriptions, reviews, currentTab} = this.props;

    switch (currentTab) {
      case Tabs.DETAILS_TAB:
        return (
          <MovieDetails
            runTime = {runTime}
            genre = {genre}
            year = {year}
            directors = {directors}
            starrings = {starrings}
          />
        );

      case Tabs.REVIEWS_TAB:
        return (
          <MovieReviews
            reviews = {reviews}
          />
        );

      default:
        return (
          <MovieOverview
            ratingScore = {ratingScore}
            ratingCount = {ratingCount}
            descriptions = {descriptions}
            directors = {directors}
            starrings = {starrings}
          />
        );
    }
  }

  render() {
    const {id, title, genre, year, bigPoster, cover, similarMovies, onMovieTitleClick, renderTabs} = this.props;

    return (
      <React.Fragment>
        <section className="movie-card movie-card--full" data-key={id}>
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={cover} alt={title} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header movie-card__head">
              <Logo />
              <UserBlock />
            </header>

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genre}</span>
                  <span className="movie-card__year">{year}</span>
                </p>

                <div className="movie-card__buttons">
                  <button className="btn btn--play movie-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="/sprite.svg#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list movie-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="/sprite.svg#add"></use>
                    </svg>
                    <span>My list</span>
                  </button>
                  <a href="add-review.html" className="btn movie-card__button">Add review</a>
                </div>
              </div>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src={bigPoster} alt={title} width="218" height="327" />
              </div>

              <div className="movie-card__desc">
                {renderTabs()}

                {this._renderTab()}
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <MoviesListWrapper
              movies = {similarMovies}
              onMovieTitleClick = {onMovieTitleClick}
            />

          </section>

          <footer className="page-footer">
            <Logo
              light = {true}
            />

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

MoviePage.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  runTime: PropTypes.string.isRequired,
  bigPoster: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  ratingScore: PropTypes.string.isRequired,
  ratingCount: PropTypes.number.isRequired,
  directors: PropTypes.arrayOf(PropTypes.string).isRequired,
  starrings: PropTypes.arrayOf(PropTypes.string).isRequired,
  descriptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  reviews: PropTypes.array.isRequired,
  similarMovies: PropTypes.array.isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
  renderTabs: PropTypes.func.isRequired,
  currentTab: PropTypes.number.isRequired,
};

export default MoviePage;
