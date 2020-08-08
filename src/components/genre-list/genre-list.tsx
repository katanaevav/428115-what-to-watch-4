import * as React from "react";


interface Props {
  currentGenre: string,
  genres: Array<string>,
  onGenreClick: (evt: Event) => void;
}


class GenreList extends React.PureComponent<Props, {}> {
  constructor(props) {
    super(props);

    this._genreClickHandler = this._genreClickHandler.bind(this);
  }

  _genreClickHandler(evt) {
    const {onGenreClick} = this.props;

    evt.preventDefault();
    onGenreClick(evt.currentTarget.dataset.key);
  }

  render() {
    const {currentGenre, genres} = this.props;

    return (
      <ul className="catalog__genres-list">
        {
          genres.map((genre) => {
            return (
              <li
                key = {genre}
                className = {`catalog__genres-item ${currentGenre === genre ? `catalog__genres-item--active` : ``}`}
              >
                <a
                  data-key = {genre}
                  href="#"
                  className="catalog__genres-link"
                  onClick = {this._genreClickHandler}
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


export default GenreList;
