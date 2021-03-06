import * as React from "react";


interface Props {
  ratingScore: number;
  ratingCount: number;
  descriptions: Array<string>;
  directors: Array<string>;
  starrings: Array<string>;
}


class MovieOverview extends React.PureComponent<Props, {}> {
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
          <div className="movie-rating__score">{ratingScore.toFixed(1)}</div>
          <p className="movie-rating__meta">
            <span className="movie-rating__level">{ratingLevel}</span>
            <span className="movie-rating__count">{ratingCount} ratings</span>
          </p>
        </div>

        <div className="movie-card__text">
          {descriptions.map((description) => (<p key = {description}>{description}</p>))}

          <p className="movie-card__director"><strong>Director: {directors.join(`, `)}</strong></p>

          <p className="movie-card__starring"><strong>Starring: {starrings.slice(0, 4).join(`, `)} and others</strong></p>
        </div>
      </React.Fragment>
    );
  }
}


export default MovieOverview;
