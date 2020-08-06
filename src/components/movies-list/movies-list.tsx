import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";
import withSmallVideoPlayer from "../../hoc/with-small-video-player/with-small-video-player.js";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";
import {DELAY_BEFORE_START_PREVIEW, MAX_RENDERED_MOVIES_AT_TIME, MOVIE_PROP_TYPE} from "../../const.js";
import {connect} from "react-redux";
import {getRenderedMoviesCount} from "../../reducer/state/selectors.js";
import {ActionCreator} from "../../reducer/state/state.js";


const SmallMovieCardWrapped = withSmallVideoPlayer(SmallMovieCard);


class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.timer = null;

    this._movieMouseOverHandler = this._movieMouseOverHandler.bind(this);
    this._movieMouseOutHandler = this._movieMouseOutHandler.bind(this);
    this._showMoreButtonClickHandler = this._showMoreButtonClickHandler.bind(this);
    this._renderShowMoreButton = this._renderShowMoreButton.bind(this);
  }

  _movieMouseOverHandler(action) {
    this._timer = setTimeout(() => {
      action();
    }, DELAY_BEFORE_START_PREVIEW);
  }

  _movieMouseOutHandler(action) {
    clearTimeout(this._timer);
    action();
  }

  _renderShowMoreButton() {
    const {movies, renderedMoviesCount, showAll} = this.props;

    const buttonComponent = movies.length > (renderedMoviesCount) && !showAll ?
      <ShowMoreButton
        onShowMoreButtonClick = {this._showMoreButtonClickHandler}
      />
      : ``;

    return buttonComponent;
  }

  _showMoreButtonClickHandler() {
    const {movies, renderedMoviesCount, setRenderedMoviesCount} = this.props;
    let newMoviesCount = movies.length < (renderedMoviesCount + MAX_RENDERED_MOVIES_AT_TIME) ? movies.length : renderedMoviesCount + MAX_RENDERED_MOVIES_AT_TIME;

    setRenderedMoviesCount(newMoviesCount);
  }

  render() {
    const {movies, renderedMoviesCount, showAll} = this.props;

    const moviesToRender = movies.slice(0, showAll ? movies.length : renderedMoviesCount);
    const movieCards = moviesToRender.map((movie) => (
      <SmallMovieCardWrapped
        key = {movie.id}
        movieId = {movie.id}
        movieTitle = {movie.title}
        movieSmallPoster = {movie.smallPoster}
        preview = {movie.preview}
        onMovieMouseOver = {this._movieMouseOverHandler}
        onMovieMouseOut = {this._movieMouseOutHandler}
      />
    ));

    return (
      <React.Fragment>
        <div className="catalog__movies-list">
          {movieCards}
        </div>
        {this._renderShowMoreButton()}
      </React.Fragment>
    );
  }
}


MoviesList.propTypes = {
  movies: PropTypes.arrayOf(MOVIE_PROP_TYPE).isRequired,
  renderedMoviesCount: PropTypes.number.isRequired,
  setRenderedMoviesCount: PropTypes.func.isRequired,
  showAll: PropTypes.bool,
};


const mapStateToProps = (state) => ({
  renderedMoviesCount: getRenderedMoviesCount(state),
});

const mapDispatchToProps = (dispatch) => ({
  setRenderedMoviesCount(moviesCount) {
    dispatch(ActionCreator.setRenderedMoviesCount(moviesCount));
  },
});


export {MoviesList};
export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
