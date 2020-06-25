import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";

import withVideoPlayer from "../../hoc/with-video-player/with-video-player.js";

const SmallMovieCardWrapped = withVideoPlayer(SmallMovieCard);

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this._movieCardMouseOverHandler = this._movieCardMouseOverHandler.bind(this);

    this.state = {
      activeMovieTitle: ``,
    };
  }

  _movieCardMouseOverHandler(key) {
    this.setState({
      activeMovieTitle: key,
    });
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
        onMovieMouseOver={this._movieCardMouseOverHandler}
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
  onMovieMouseOver: PropTypes.func.isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
};

export default MoviesList;
