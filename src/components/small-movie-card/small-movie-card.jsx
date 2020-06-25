import React, {PureComponent} from "react";
import PropTypes from "prop-types";


class SmallMovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this._movieTitleClickHandler = this._movieTitleClickHandler.bind(this);
  }

  _movieTitleClickHandler(evt) {
    evt.preventDefault();
    this.props.onMovieTitleClick(evt.currentTarget.parentElement.parentElement.dataset.key);
  }

  render() {
    const {movieId, movieTitle, renderPlayer, movieSmallPoster, preview} = this.props;

    return (
      <article
        className="small-movie-card catalog__movies-card"
        data-key={movieId}
      >
        {renderPlayer(preview, movieSmallPoster)}
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
  renderPlayer: PropTypes.func.isRequired,
};

export default SmallMovieCard;
