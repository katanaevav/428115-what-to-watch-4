import * as React from "react";


interface Props {
  onShowMoreButtonClick: () => void,
}


class ShowMoreButton extends React.PureComponent<Props, {}> {
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
          onClick = {this._showMoreButtonClickHandler}
        >Show more</button>
      </div>
    );
  }
}


export default ShowMoreButton;
