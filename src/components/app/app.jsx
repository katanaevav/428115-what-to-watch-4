import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import {PromoMovie} from "../../mocks/films.js";

const Screens = {
  MAIN_SCREEN: 0,
  MOVIE_PAGE_SCREEN: 1,
};

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
    const {promoMovieTitle, promoMovieGenre, promoMovieYear, movies} = this.props;
    const {selectedMovieId, currentPage} = this.state;

    switch (currentPage) {
      case Screens.MOVIE_PAGE_SCREEN:
        const {id, title, genre, year, bigPoster, cover, ratingScore, ratingCount, director, starring, description} = this._getMovieById(selectedMovieId);
        return (
          <MoviePage
            id = {id}
            title = {title}
            genre = {genre}
            year = {year}
            bigPoster = {bigPoster}
            cover = {cover}
            ratingScore = {ratingScore}
            ratingCount = {ratingCount}
            director = {director}
            starring = {starring}
            description = {description}
          />
        );

      default:
        return (
          <Main
            promoMovieTitle = {promoMovieTitle}
            promoMovieGenre = {promoMovieGenre}
            promoMovieYear = {promoMovieYear}
            movies = {movies}
            onMovieTitleClick = {this._movieTitleClickHandler}
          />
        );
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film">
            <MoviePage
              id = {0}
              title = {PromoMovie.title}
              genre = {PromoMovie.genre}
              year = {PromoMovie.year}
              bigPoster = {PromoMovie.bigPoster}
              cover = {PromoMovie.cover}
              ratingScore = {PromoMovie.ratingScore}
              ratingCount = {PromoMovie.ratingCount}
              director = {PromoMovie.director}
              starring = {PromoMovie.starring}
              description = {PromoMovie.description}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

}

App.propTypes = {
  promoMovieTitle: PropTypes.string.isRequired,
  promoMovieGenre: PropTypes.string.isRequired,
  promoMovieYear: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        smallPoster: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
      })).isRequired,
};

export default App;
