import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const SmallVideoPlayerSize = {
  HEIGHT: 175,
  WIDTH: 280,
};

class SmallMovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this._timer = null;

    this._movieTitleClickHandler = this._movieTitleClickHandler.bind(this);
    this._movieMouseOverHandler = this._movieMouseOverHandler.bind(this);
    this._movieMouseOutHandler = this._movieMouseOutHandler.bind(this);
  }

  _movieTitleClickHandler(evt) {
    evt.preventDefault();
    this.props.onMovieTitleClick(evt.currentTarget.parentElement.parentElement.dataset.key);
  }

  _movieMouseOverHandler() {
    this.props.onMovieMouseOver();
  }

  _movieMouseOutHandler() {
    this.props.onMovieMouseOut();
  }

  render() {
    const {movieId, movieTitle, renderPlayer, movieSmallPoster, preview} = this.props;

    return (
      <article
        className="small-movie-card catalog__movies-card"
        data-key={movieId}
      >
        {renderPlayer(preview, movieSmallPoster, SmallVideoPlayerSize.HEIGHT, SmallVideoPlayerSize.WIDTH, this._movieMouseOverHandler, this._movieMouseOutHandler)}
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
  onMovieTitleClick: PropTypes.func.isRequired,
  onMovieMouseOver: PropTypes.func.isRequired,
  onMovieMouseOut: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
};

export default SmallMovieCard;
