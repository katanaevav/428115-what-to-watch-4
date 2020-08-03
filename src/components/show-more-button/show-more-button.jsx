import React, {PureComponent} from "react";
import PropTypes from "prop-types";


class ShowMoreButton extends PureComponent {
  constructor(props) {
    super(props);

    this._showMoreButtonClickHandler = this._showMoreButtonClickHandler.bind(this);
  }

  _showMoreButtonClickHandler() {
    this.props.onShowMoreButtonClick();
  }

  render() {
    return (
      <div className="catalog__more">
        <button
          className="catalog__button"
          type="button"
          onClick= {this._showMoreButtonClickHandler}
        >Show more</button>
      </div>
    );
  }
}


ShowMoreButton.propTypes = {
  onShowMoreButtonClick: PropTypes.func.isRequired,
};


export default ShowMoreButton;
