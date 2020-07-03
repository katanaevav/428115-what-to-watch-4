import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import {connect} from "react-redux";

const Screens = {
  MAIN_SCREEN: 0,
  MOVIE_PAGE_SCREEN: 1,
};

const MAX_SIMILAR_MOVIES_COUNT = 4;

class App extends PureComponent {
  constructor(props) {
    super(props);

    this._movieTitleClickHandler = this._movieTitleClickHandler.bind(this);
    this._movieCardMouseOverHandler = this._movieCardMouseOverHandler.bind(this);

    this.state = {
      selectedMovieId: -1,
      currentPage: Screens.MAIN_SCREEN,
    };
  }

  _getMovieById(movieId) {
    const {movies} = this.props;

    return movies.find((movie) => movie.id === Number.parseInt(movieId, 10));
  }

  _movieCardMouseOverHandler() {}

  _movieTitleClickHandler(key) {
    this.setState({
      selectedMovieId: key,
      currentPage: Screens.MOVIE_PAGE_SCREEN,
    });
  }

  _renderApp() {
    const {promoMovie, movies, genres} = this.props;
    const {title: promoMovieTitle, genre: promoMovieGenre, year: promoMovieYear} = promoMovie;
    const {selectedMovieId, currentPage} = this.state;

    switch (currentPage) {
      case Screens.MOVIE_PAGE_SCREEN:
        const {id, title, genre, year, runTime, bigPoster, cover, ratingScore, ratingCount, directors, starrings, descriptions, reviews} = this._getMovieById(selectedMovieId);
        const similarMovies = movies.filter((movie) => (movie.genre === genre) && (movie.id !== id)).slice(0, MAX_SIMILAR_MOVIES_COUNT);
        return (
          <MoviePage
            id = {id}
            title = {title}
            genre = {genre}
            year = {year}
            runTime = {runTime}
            bigPoster = {bigPoster}
            cover = {cover}
            ratingScore = {ratingScore}
            ratingCount = {ratingCount}
            directors = {directors}
            starrings = {starrings}
            descriptions = {descriptions}
            reviews = {reviews}
            similarMovies = {similarMovies}
            onMovieTitleClick = {this._movieTitleClickHandler}
          />
        );

      default:
        return (
          <Main
            promoMovieTitle = {promoMovieTitle}
            promoMovieGenre = {promoMovieGenre}
            promoMovieYear = {promoMovieYear}
            genres = {genres}
            movies = {movies}
            onMovieTitleClick = {this._movieTitleClickHandler}
          />
        );
    }
  }

  render() {
    const {promoMovie} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film">
            <MoviePage
              id = {0}
              title = {promoMovie.title}
              genre = {promoMovie.genre}
              year = {promoMovie.year}
              runTime = {promoMovie.runTime}
              bigPoster = {promoMovie.bigPoster}
              cover = {promoMovie.cover}
              ratingScore = {promoMovie.ratingScore}
              ratingCount = {promoMovie.ratingCount}
              directors = {promoMovie.directors}
              starrings = {promoMovie.starrings}
              descriptions = {promoMovie.descriptions}
              reviews = {promoMovie.reviews}
              similarMovies = {this.props.movies}
              onMovieTitleClick = {this._movieTitleClickHandler}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

}

App.propTypes = {
  promoMovie: PropTypes.shape().isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        smallPoster: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
      })).isRequired,
  genres: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  promoMovie: state.PromoMovie,
  movies: state.movies,
  genres: state.genres,
});

export {App};
export default connect(mapStateToProps)(App);
