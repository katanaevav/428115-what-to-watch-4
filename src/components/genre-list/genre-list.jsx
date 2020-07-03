import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class GenreList extends PureComponent {
  constructor(props) {
    super(props);

    this._genreClickHandler = this._genreClickHandler.bind(this);
  }

  _genreClickHandler(evt) {
    evt.preventDefault();
    this.props.onGenreClick(evt.currentTarget.dataset.key);
  }

  render() {
    const {currentGenre, genres} = this.props;

    return (
      <ul className="catalog__genres-list">
        {
          genres.map((genre) => {
            return (
              <li
                key={genre}
                className={`catalog__genres-item ${currentGenre === genre ? `catalog__genres-item--active` : ``}`}
              >
                <a
                  data-key={genre}
                  href="#"
                  className="catalog__genres-link"
                  onClick={this._genreClickHandler}
                >
                  {genre}
                </a>
              </li>
            );
          })
        }
      </ul>
    );
  }
}

GenreList.propTypes = {
  currentGenre: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired,
  onGenreClick: PropTypes.func.isRequired,
};

export default GenreList;
