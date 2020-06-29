import React, {PureComponent} from "react";
// import PropTypes from "prop-types";

class MovieTabs extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          <li className="movie-nav__item movie-nav__item--active">
            <a href="#" className="movie-nav__link">Overview</a>
          </li>
          <li className="movie-nav__item">
            <a href="#" className="movie-nav__link">Details</a>
          </li>
          <li className="movie-nav__item">
            <a href="#" className="movie-nav__link">Reviews</a>
          </li>
        </ul>
      </nav>
    );
  }
}

MovieTabs.propTypes = {};

export default MovieTabs;
