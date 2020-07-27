import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {AuthorizationStatus} from "../../const.js";

class AddToMyList extends PureComponent {
  constructor(props) {
    super(props);

    this._renderIcon = this._renderIcon.bind(this);
    this._buttonClickHandler = this._buttonClickHandler.bind(this);
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

  _renderIcon() {
    const {isInList} = this.props;

    return isInList ? this._renderInListIcon() : this._renderAddIcon();
  }

  render() {
    const {onButtonClick} = this.props;
    return (
      <button
        className="btn btn--list movie-card__button"
        type="button"
        onClick={onButtonClick}
      >
        {this._renderIcon()}
        <span>My list</span>
      </button>
    );
  }
}

AddToMyList.propTypes = {
  isInList: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default AddToMyList;
