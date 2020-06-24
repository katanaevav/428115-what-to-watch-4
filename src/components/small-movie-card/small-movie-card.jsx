import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";

class SmallMovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this._movieTitleClickHandler = this._movieTitleClickHandler.bind(this);
    this._movieCardMouseOverHandler = this._movieCardMouseOverHandler.bind(this);
  }

  _movieTitleClickHandler(evt) {
    evt.preventDefault();
    this.props.onMovieTitleClick(evt.currentTarget.parentElement.parentElement.dataset.key);
  }

  _movieCardMouseOverHandler(evt) {
    this.props.onMovieMouseOver(evt.currentTarget.parentElement.dataset.key);
  }

  render() {
    const {movieId, movieTitle, movieSmallPoster, preview} = this.props;

    return (
      <article
        className="small-movie-card catalog__movies-card"
        data-key={movieId}
      >
        {/* <div
          className="small-movie-card__image"
          onMouseOver={this._movieCardMouseOverHandler}
        > */}
        {/* <img src={movieSmallPoster} alt={movieTitle} width="280" height="175"/> */}
        <VideoPlayer
          poster={movieSmallPoster}
          preview={preview}
          volume={0.0}
          delayBeforePlay={1000}
        />
        {/* </div> */}
        <h3 className="small-movie-card__title">
          <a
            className="small-movie-card__link"
            href="movie-page.html"
            onClick={this._movieTitleClickHandler}
          >
            {movieTitle}
          </a>
        </h3>
      </article>
    );
  }
}

SmallMovieCard.propTypes = {
  movieId: PropTypes.number.isRequired,
  movieTitle: PropTypes.string.isRequired,
  movieSmallPoster: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  onMovieMouseOver: PropTypes.func.isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
};

export default SmallMovieCard;
