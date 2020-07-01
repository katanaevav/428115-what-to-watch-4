import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieTabs from "../movie-tabs/movie-tabs.jsx";
import MovieOverview from "../movie-overview/movie-overview.jsx";
import MovieDetails from "../movie-details/movie-details.jsx";
import MovieReviews from "../movie-reviews/movie-reviews.jsx";
import MoviesList from "../movies-list/movies-list.jsx";

const Tabs = {
  OVERVIEW_TAB: 0,
  DETAILS_TAB: 1,
  REVIEWS_TAB: 2,
};

class MoviePage extends PureComponent {
  constructor(props) {
    super(props);

    this._movieTabClickHandler = this._movieTabClickHandler.bind(this);
    this._renderTab = this._renderTab.bind(this);

    this.state = {
      currentTab: Tabs.OVERVIEW_TAB,
    };
  }

  _movieTabClickHandler(tabIndex) {
    this.setState({
      currentTab: parseInt(tabIndex, 10),
    });
  }

  _renderTab() {
    const {genre, year, runTime, ratingScore, ratingCount, directors, starrings, descriptions, reviews} = this.props;
    const tabIndex = this.state.currentTab;
    switch (tabIndex) {
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
    const {id, title, genre, year, bigPoster, cover, similarMovies, onMovieTitleClick} = this.props;

    return (
      <React.Fragment>
        <section className="movie-card movie-card--full" data-key={id}>
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={cover} alt={title} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header movie-card__head">
              <div className="logo">
                <a href="main.html" className="logo__link">
                  <span className="logo__letter logo__letter--1">W</span>
                  <span className="logo__letter logo__letter--2">T</span>
                  <span className="logo__letter logo__letter--3">W</span>
                </a>
              </div>

              <div className="user-block">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </div>
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
                <MovieTabs
                  currentTab = {this.state.currentTab}
                  onMovieTabClick = {this._movieTabClickHandler}
                />

                {this._renderTab()}
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <MoviesList
              movies = {similarMovies}
              onMovieTitleClick = {onMovieTitleClick}
            />

          </section>

          <footer className="page-footer">
            <div className="logo">
              <a href="main.html" className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

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
};

export default MoviePage;
