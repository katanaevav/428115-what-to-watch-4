import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";
import withVideoPlayer from "../../hoc/with-small-video-player/with-small-video-player.js";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";

const DELAY_BEFORE_START_PLAYING = 1000;
const MAX_RENDERED_MOVIES = 8;

const SmallMovieCardWrapped = withVideoPlayer(SmallMovieCard);

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.timer = null;

    this.movieMouseOverHandler = this.movieMouseOverHandler.bind(this);
    this.movieMouseOutHandler = this.movieMouseOutHandler.bind(this);
    this.showMoreButtonClickHandler = this.showMoreButtonClickHandler.bind(this);
    this.renderShowMoreButton = this.renderShowMoreButton.bind(this);

    this.state = {
      renderedMovies: MAX_RENDERED_MOVIES,
    };
  }

  movieMouseOverHandler(action) {
    this._timer = setTimeout(() => {
      action();
    }, DELAY_BEFORE_START_PLAYING);
  }

  movieMouseOutHandler(action) {
    clearTimeout(this._timer);
    action();
  }

  renderShowMoreButton() {
    const {movies} = this.props;
    const {renderedMovies} = this.state;

    const buttonComponent = movies.length > (renderedMovies) ?
      <ShowMoreButton
        onShowMoreButtonClick={this.showMoreButtonClickHandler}
      />
      : ``;

    return buttonComponent;
  }

  showMoreButtonClickHandler() {
    const {movies} = this.props;
    const {renderedMovies} = this.state;
    let newMoviesCount = movies.length < (renderedMovies + MAX_RENDERED_MOVIES) ? movies.length : renderedMovies + MAX_RENDERED_MOVIES;

    this.setState({
      renderedMovies: newMoviesCount,
    });
  }

  render() {
    const {movies, onMovieTitleClick} = this.props;
    const {renderedMovies} = this.state;

    const moviesToRender = movies.slice(0, renderedMovies);
    const movieCards = moviesToRender.map((movie) => (
      <SmallMovieCardWrapped
        key={movie.id}
        movieId={movie.id}
        movieTitle={movie.title}
        movieSmallPoster={movie.smallPoster}
        preview={movie.preview}
        onMovieMouseOver={this.movieMouseOverHandler}
        onMovieMouseOut={this.movieMouseOutHandler}
        onMovieTitleClick={onMovieTitleClick}
      />
    ));

    return (
      <React.Fragment>
        <div className="catalog__movies-list">
          {movieCards}
        </div>
        {this.renderShowMoreButton()}
      </React.Fragment>
    );
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        smallPoster: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
      })).isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
};

export default MoviesList;
