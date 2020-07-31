import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MovieOverview from "../movie-overview/movie-overview.jsx";
import MovieDetails from "../movie-details/movie-details.jsx";
import MovieReviews from "../movie-reviews/movie-reviews.jsx";
import MoviesList from "../movies-list/movies-list.jsx";
import withMoviesList from "../../hoc/with-movies-list/with-movies-list.js";
import UserBlock from "../user-block/user-block.jsx";
import Logo from "../logo/logo.jsx";
import withAddToFavoriteButton from "../../hoc/with-add-to-favorite-button/with-add-to-favorite-button.js";
import MovieButtons from "../movie-buttons/movie-buttons.jsx";

const MoviesListWrapper = withMoviesList(MoviesList);
const MovieButtonsWrapper = withAddToFavoriteButton(MovieButtons);

const Tabs = {
  OVERVIEW_TAB: 0,
  DETAILS_TAB: 1,
  REVIEWS_TAB: 2,
};

class MoviePage extends PureComponent {
  constructor(props) {
    super(props);

    this.props.getComments(this.props.movie.id);

    this._renderTab = this._renderTab.bind(this);
    this._playMovieClickHandler = this._playMovieClickHandler.bind(this);
    this._addReviewClickHandler = this._addReviewClickHandler.bind(this);
  }


  _renderTab() {
    const {movie, currentTab, comments} = this.props;
    const {genre, year, runTime, ratingScore, ratingCount, directors, starrings, descriptions} = movie;

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
            reviews = {comments}
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

  _playMovieClickHandler() {
    const {movie, onPlayMovieClick} = this.props;
    const {id} = movie;
    onPlayMovieClick(id);
  }

  _addReviewClickHandler() {
    const {movie, onAddReviewClick} = this.props;
    const {id} = movie;

    onAddReviewClick(id);
  }

  render() {
    const {authorizationStatus, avatarUrl, movie, similarMovies, renderTabs, savingMovieFavoriteStatus, setFavoriteStatus} = this.props;
    const {id, title, genre, year, bigPoster, cover, backgroundColor, isFavorite} = movie;

    return (
      <React.Fragment>
        <section className="movie-card movie-card--full" data-key={id} style={{backgroundColor: `${backgroundColor}`}}>
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={cover} alt={title} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header movie-card__head">
              <Logo />
              <UserBlock
                authorizationStatus = {authorizationStatus}
                avatarUrl = {avatarUrl}
              />
            </header>

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genre}</span>
                  <span className="movie-card__year">{year}</span>
                </p>

                <MovieButtonsWrapper
                  isMainScreen = {false}
                  movieId = {id}
                  authorizationStatus = {authorizationStatus}
                  isFavorite = {isFavorite}
                  savingMovieFavoriteStatus = {savingMovieFavoriteStatus}
                  setFavoriteStatus = {setFavoriteStatus}
                />

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
              // onMovieTitleClick = {onMovieTitleClick}
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
  authorizationStatus: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
  movie: PropTypes.object.isRequired,
  comments: PropTypes.array,
  similarMovies: PropTypes.array.isRequired,
  // onMovieTitleClick: PropTypes.func.isRequired,
  renderTabs: PropTypes.func.isRequired,
  currentTab: PropTypes.number.isRequired,
  onPlayMovieClick: PropTypes.func.isRequired,
  onAddReviewClick: PropTypes.func.isRequired,
  savingMovieFavoriteStatus: PropTypes.string,
  setFavoriteStatus: PropTypes.func.isRequired,
  getComments: PropTypes.func.isRequired,
};

export default MoviePage;
