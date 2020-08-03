import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";
import withSmallVideoPlayer from "../../hoc/with-small-video-player/with-small-video-player.js";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";
import {DELAY_BEFORE_START_PREVIEW, MAX_RENDERED_MOVIES_AT_TIME, MOVIE_PROP_TYPE} from "../../const.js";


const SmallMovieCardWrapped = withSmallVideoPlayer(SmallMovieCard);


class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.timer = null;

    this._movieMouseOverHandler = this._movieMouseOverHandler.bind(this);
    this._movieMouseOutHandler = this._movieMouseOutHandler.bind(this);
    this._showMoreButtonClickHandler = this._showMoreButtonClickHandler.bind(this);
    this._renderShowMoreButton = this._renderShowMoreButton.bind(this);
  }

  _movieMouseOverHandler(action) {
    this._timer = setTimeout(() => {
      action();
    }, DELAY_BEFORE_START_PREVIEW);
  }

  _movieMouseOutHandler(action) {
    clearTimeout(this._timer);
    action();
  }

  _renderShowMoreButton() {
    const {movies, renderedMoviesCount} = this.props;

    const buttonComponent = movies.length > (renderedMoviesCount) ?
      <ShowMoreButton
        onShowMoreButtonClick={this._showMoreButtonClickHandler}
      />
      : ``;

    return buttonComponent;
  }

  _showMoreButtonClickHandler() {
    const {movies, renderedMoviesCount, onShowMoreButtonClick} = this.props;
    let newMoviesCount = movies.length < (renderedMoviesCount + MAX_RENDERED_MOVIES_AT_TIME) ? movies.length : renderedMoviesCount + MAX_RENDERED_MOVIES_AT_TIME;

    onShowMoreButtonClick(newMoviesCount);
  }

  render() {
    const {movies, renderedMoviesCount} = this.props;

    const moviesToRender = movies.slice(0, renderedMoviesCount);
    const movieCards = moviesToRender.map((movie) => (
      <SmallMovieCardWrapped
        key={movie.id}
        movieId={movie.id}
        movieTitle={movie.title}
        movieSmallPoster={movie.smallPoster}
        preview={movie.preview}
        onMovieMouseOver={this._movieMouseOverHandler}
        onMovieMouseOut={this._movieMouseOutHandler}
      />
    ));

    return (
      <React.Fragment>
        <div className="catalog__movies-list">
          {movieCards}
        </div>
        {this._renderShowMoreButton()}
      </React.Fragment>
    );
  }
}


MoviesList.propTypes = {
  movies: PropTypes.arrayOf(MOVIE_PROP_TYPE).isRequired,
  renderedMoviesCount: PropTypes.number.isRequired,
  onShowMoreButtonClick: PropTypes.func.isRequired,
};


export default MoviesList;
