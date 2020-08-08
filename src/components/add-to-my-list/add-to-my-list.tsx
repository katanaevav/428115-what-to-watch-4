import * as React from "react";


interface Props {
  isFavorite: boolean,
  onButtonClick: () => void;
}


class AddToMyList extends React.PureComponent<Props, {}> {
  constructor(props) {
    super(props);
  }

  _renderAddIcon() {
    return (
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref="/sprite.svg#add"></use>
      </svg>
    );
  }

  _renderInListIcon() {
    return (
      <svg viewBox="0 0 18 14" width="18" height="14">
        <use xlinkHref="/sprite.svg#in-list"></use>
      </svg>
    );
  }

  render() {
    const {isFavorite, onButtonClick} = this.props;

    return (
      <button
        className="btn btn--list movie-card__button"
        type="button"
        onClick = {onButtonClick}
      >
        {isFavorite ? this._renderInListIcon() : this._renderAddIcon()}
        <span>My list</span>
      </button>
    );
  }
}


export default AddToMyList;
