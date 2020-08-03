import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {TABS_NAMES} from "../../const.js";


class MovieTabs extends PureComponent {
  constructor(props) {
    super(props);

    this._movieTabClickHandler = this._movieTabClickHandler.bind(this);
  }

  _movieTabClickHandler(evt) {
    evt.preventDefault();
    this.props.onMovieTabClick(evt.currentTarget.dataset.key);
  }

  render() {
    const {currentTab} = this.props;

    return (
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          {
            TABS_NAMES.map((movieTab, index) => {
              return (
                <li key= {movieTab}
                  className= {`movie-nav__item ${currentTab === index ? `movie-nav__item--active` : ``}`}>
                  <a
                    data-key= {index}
                    href="#"
                    className="movie-nav__link"
                    onClick= {this._movieTabClickHandler}
                  >
                    {movieTab}
                  </a>
                </li>
              );
            })
          }
        </ul>
      </nav>
    );
  }
}


MovieTabs.propTypes = {
  currentTab: PropTypes.number.isRequired,
  onMovieTabClick: PropTypes.func.isRequired,
};


export default MovieTabs;
