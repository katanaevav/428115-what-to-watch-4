import React, {PureComponent} from "react";
import PropTypes from "prop-types";


class MovieDetails extends PureComponent {
  constructor(props) {
    super(props);
  }

  _getDurationTime(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration - (hours * 60);

    return `${hours > 0 ? `${hours}h ` : ``}${minutes > 0 ? `${minutes}m` : ``}`;
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
                    <React.Fragment key= {starring}>
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
              <span className="movie-card__details-value">{this._getDurationTime(runTime)}</span>
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
  runTime: PropTypes.number.isRequired,
  genre: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  directors: PropTypes.arrayOf(PropTypes.string).isRequired,
  starrings: PropTypes.arrayOf(PropTypes.string).isRequired,
};


export default MovieDetails;
