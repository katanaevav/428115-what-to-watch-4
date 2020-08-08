import * as React from "react";
import SmallMovieCard from "../small-movie-card/small-movie-card";
import withSmallVideoPlayer from "../../hoc/with-small-video-player/with-small-video-player";
import ShowMoreButton from "../show-more-button/show-more-button";
import {DELAY_BEFORE_START_PREVIEW, MAX_RENDERED_MOVIES_AT_TIME} from "../../const";
import {connect} from "react-redux";
import {getRenderedMoviesCount} from "../../reducer/state/selectors";
import {ActionCreator} from "../../reducer/state/state";
import {Movie} from "../../types";


interface Props {
  movies: Array<Movie>,
  renderedMoviesCount: number,
  setRenderedMoviesCount: (number) => void,
  showAll?: boolean,
}


const SmallMovieCardWrapped = withSmallVideoPlayer(SmallMovieCard);


class MoviesList extends React.PureComponent<Props, {}> {
  private timer: NodeJS.Timeout;

  constructor(props) {
    super(props);

    this.timer = null;

    this._movieMouseOverHandler = this._movieMouseOverHandler.bind(this);
    this._movieMouseOutHandler = this._movieMouseOutHandler.bind(this);
    this._showMoreButtonClickHandler = this._showMoreButtonClickHandler.bind(this);
    this._renderShowMoreButton = this._renderShowMoreButton.bind(this);
  }

  _movieMouseOverHandler(action) {
    this.timer = setTimeout(() => {
      action();
    }, DELAY_BEFORE_START_PREVIEW);
  }

  _movieMouseOutHandler(action) {
    clearTimeout(this.timer);
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
