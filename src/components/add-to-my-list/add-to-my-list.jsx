import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {AuthorizationStatus, AppRoute} from "../../const.js";
import {Link} from 'react-router-dom';

class AddToMyList extends PureComponent {
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
    const {isInList, onButtonClick, authorizationStatus} = this.props;

    return (authorizationStatus === AuthorizationStatus.AUTH ?
      <button
        className="btn btn--list movie-card__button"
        type="button"
        onClick = {onButtonClick}
      >
        {isInList ? this._renderInListIcon() : this._renderAddIcon()}
        <span>My list</span>
      </button> :

      <Link
        className="btn btn--list movie-card__button"
        to={AppRoute.LOGIN}
      >
        {isInList ? this._renderInListIcon() : this._renderAddIcon()}
        <span>My list</span>
      </Link>);
  }
}

AddToMyList.propTypes = {
  isInList: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

export default AddToMyList;
