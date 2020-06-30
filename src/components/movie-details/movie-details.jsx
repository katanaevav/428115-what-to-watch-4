import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class MovieDetails extends PureComponent {
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
    const {runTime, genre, year, directors, starrings} = this.props;

    return (
      <React.Fragment>
        <div className="movie-card__text movie-card__row">
          <div className="movie-card__text-col">
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Director</strong>
              <span className="movie-card__details-value">{directors.join(`, `)}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Starring</strong>
              <span className="movie-card__details-value">
                {starrings.map((starring, index) => {
                  return (
                    <React.Fragment key={starring}>
                      {starring}{index < starrings.length - 1 ? <br /> : ``}
                    </React.Fragment>
                  );
                })}
              </span>
            </p>
          </div>
          <div className="movie-card__text-col">
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Run Time</strong>
              <span className="movie-card__details-value">{runTime}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Genre</strong>
              <span className="movie-card__details-value">{genre}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Released</strong>
              <span className="movie-card__details-value">{year}</span>
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

MovieDetails.propTypes = {
  runTime: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  directors: PropTypes.arrayOf(PropTypes.string).isRequired,
  starrings: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MovieDetails;
