import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class MovieOverview extends PureComponent {
  constructor(props) {
    super(props);
  }

  _getRatingLevel(ratingScore) {
    const score = Number.parseFloat(ratingScore);

    switch (true) {
      case score < 3:
        return `Bad`;
      case score >= 3 && score < 5:
        return `Normal`;
      case score >= 5 && score < 8:
        return `Good`;
      case score >= 8 && score < 10:
        return `Very good`;
      case score === 10:
        return `Awesome`;
      default:
        return `N/A`;
    }
  }

  render() {
    const {ratingScore, ratingCount, description, director, starring} = this.props;
    const ratingLevel = this._getRatingLevel(ratingScore);

    return (
      <React.Fragment>
        <div className="movie-rating">
          <div className="movie-rating__score">{ratingScore}</div>
          <p className="movie-rating__meta">
            <span className="movie-rating__level">{ratingLevel}</span>
            <span className="movie-rating__count">{ratingCount} ratings</span>
          </p>
        </div>

        <div className="movie-card__text">
          <p>{description}</p>

          <p className="movie-card__director"><strong>Director: {director}</strong></p>

          <p className="movie-card__starring"><strong>Starring: {starring}</strong></p>
        </div>
      </React.Fragment>
    );
  }
}

MovieOverview.propTypes = {
  ratingScore: PropTypes.string.isReqired,
  ratingCount: PropTypes.string.isReqired,
  description: PropTypes.string.isReqired,
  director: PropTypes.string.isReqired,
  starring: PropTypes.string.isReqired,
};

export default MovieOverview;
