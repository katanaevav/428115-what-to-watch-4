import React, {PureComponent} from 'react';
import {MAX_RENDERED_MOVIES_AT_TIME} from "../../const.js";


const withMoviesList = (Component) => {
  class WithMoviesList extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        renderedMoviesCount: MAX_RENDERED_MOVIES_AT_TIME,
      };

      this._showMoreButtonClickHandler = this._showMoreButtonClickHandler.bind(this);
    }

    _showMoreButtonClickHandler(moviesRendered) {
      this.setState({
        renderedMoviesCount: moviesRendered,
      });
    }

    render() {
      const {renderedMoviesCount} = this.state;

      return <Component
        {...this.props}
        renderedMoviesCount = {renderedMoviesCount}
        onShowMoreButtonClick = {this._showMoreButtonClickHandler}
      >
      </Component>;
    }
  }


  return WithMoviesList;
};


export default withMoviesList;
