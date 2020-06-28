import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";
import withVideoPlayer from "../../hoc/with-small-video-player/with-small-video-player.js";

const DELAY_BEFORE_START_PLAYING = 1000;

const SmallMovieCardWrapped = withVideoPlayer(SmallMovieCard);

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.timer = null;

    this.movieMouseOverHandler = this.movieMouseOverHandler.bind(this);
    this.movieMouseOutHandler = this.movieMouseOutHandler.bind(this);

    this.state = {
      activeMovieTitle: ``,
    };
  }

  movieMouseOverHandler(action) {
    this._timer = setTimeout(() => {
      action();
    }, DELAY_BEFORE_START_PLAYING);
  }

  movieMouseOutHandler(action) {
    clearTimeout(this._timer);
    action();
  }

  render() {
    const {movies, onMovieTitleClick} = this.props;

    const movieCards = movies.map((movie) => (
      <SmallMovieCardWrapped
        key={movie.id}
        movieId={movie.id}
        movieTitle={movie.title}
        movieSmallPoster={movie.smallPoster}
        preview={movie.preview}
        onMovieMouseOver={this.movieMouseOverHandler}
        onMovieMouseOut={this.movieMouseOutHandler}
        onMovieTitleClick={onMovieTitleClick}
      />
    ));

    return (
      <div className="catalog__movies-list">
        {movieCards}
      </div>
    );
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        smallPoster: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
      })).isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
};

export default MoviesList;
