import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import {PromoMovie} from "../../mocks/films.js";

const movieTitleClickHandler = () => {};

const movieCardMouseOverHandler = () => {};

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderApp() {
    const {promoMovieTitle, promoMovieGenre, promoMovieYear, movies} = this.props;

    return (
      <Main
        promoMovieTitle = {promoMovieTitle}
        promoMovieGenre = {promoMovieGenre}
        promoMovieYear = {promoMovieYear}
        movies = {movies}
        onMovieMouseOver = {movieCardMouseOverHandler}
        onMovieTitleClick = {movieTitleClickHandler}
      />
    );
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
