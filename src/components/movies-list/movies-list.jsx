import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";
import withSmallVideoPlayer from "../../hoc/with-small-video-player/with-small-video-player.js";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";
import {DELAY_BEFORE_START_PREVIEW, MAX_RENDERED_MOVIES_AT_TIME} from "../../const.js";

const SmallMovieCardWrapped = withSmallVideoPlayer(SmallMovieCard);

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.timer = null;

    this.movieMouseOverHandler = this.movieMouseOverHandler.bind(this);
    this.movieMouseOutHandler = this.movieMouseOutHandler.bind(this);
    this.showMoreButtonClickHandler = this.showMoreButtonClickHandler.bind(this);
    this.renderShowMoreButton = this.renderShowMoreButton.bind(this);
  }

  movieMouseOverHandler(action) {
    this._timer = setTimeout(() => {
      action();
    }, DELAY_BEFORE_START_PREVIEW);
  }

  movieMouseOutHandler(action) {
    clearTimeout(this._timer);
    action();
  }

  renderShowMoreButton() {
    const {movies, renderedMoviesCount} = this.props;

    const buttonComponent = movies.length > (renderedMoviesCount) ?
      <ShowMoreButton
        onShowMoreButtonClick={this.showMoreButtonClickHandler}
      />
      : ``;

    return buttonComponent;
  }

  showMoreButtonClickHandler() {
    const {movies, renderedMoviesCount, onShowMoreButtonClick} = this.props;
    let newMoviesCount = movies.length < (renderedMoviesCount + MAX_RENDERED_MOVIES_AT_TIME) ? movies.length : renderedMoviesCount + MAX_RENDERED_MOVIES_AT_TIME;

    onShowMoreButtonClick(newMoviesCount);
  }

  render() {
    const {movies, onMovieTitleClick, renderedMoviesCount} = this.props;

    const moviesToRender = movies.slice(0, renderedMoviesCount);
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
  renderedMoviesCount: PropTypes.number.isRequired,
  onShowMoreButtonClick: PropTypes.func.isRequired,
};

export default MoviesList;
