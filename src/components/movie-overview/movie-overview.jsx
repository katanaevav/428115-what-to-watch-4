import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class MovieOverview extends PureComponent {
  constructor(props) {
    super(props);
  }

  _getRatingLevel(score) {
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
    const {ratingScore, ratingCount, descriptions, directors, starrings} = this.props;
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
          {descriptions.map((description) => (<p key={description}>{description}</p>))}

          <p className="movie-card__director"><strong>Director: {directors.join(`, `)}</strong></p>

          <p className="movie-card__starring"><strong>Starring: {starrings.slice(0, 4).join(`, `)} and others</strong></p>
        </div>
      </React.Fragment>
    );
  }
}

MovieOverview.propTypes = {
  ratingScore: PropTypes.number.isRequired,
  ratingCount: PropTypes.number.isRequired,
  descriptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  directors: PropTypes.arrayOf(PropTypes.string).isRequired,
  starrings: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MovieOverview;
