import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {SavingStatus} from "../../const.js";

const withAddToFavoriteButton = (Component) => {
  class WithAddToFavoriteButton extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isFavorite: this.props.movieIsFavorite,
        errorSaving: SavingStatus.SUCCESS,
      };

      this._getSavingStatus = this._getSavingStatus.bind(this);
    }

    _getSavingStatus(response) {
      const {savingMovieFavoriteStatus} = this.props;

      this.setState({
        isFavorite: response.is_favorite,
        errorSaving: savingMovieFavoriteStatus,
      });
    }

    render() {
      const {errorSaving, isFavorite} = this.state;
      const pStyle = {
        margin: 0,
        marginLeft: `auto`,
        padding: `10px`,
        top: `90px`,
        left: `10px`,
        display: `inline-block`,
        position: `absolute`,
        zIndex: 2,
        color: `red`,
        backgroundColor: `white`,
      };

      return (
        <div>
          {errorSaving === SavingStatus.FAIL ? <p style={pStyle}>{`Can't save review to this movie! Please? try again later.`}</p> : ``}
          <Component
            {...this.props}
            movieIsFavorite = {isFavorite}

            onFavoriteButtonClick = {() => {
              this.props.setFavoriteStatus({
                isFavorite: !isFavorite,
                movieId: this.props.movieId,
              }, this._getSavingStatus);
            }}
          >
          </Component>
        </div>
      );
    }
  }

  WithAddToFavoriteButton.propTypes = {
    savingMovieFavoriteStatus: PropTypes.string,
    setFavoriteStatus: PropTypes.func.isRequired,
    movieId: PropTypes.number.isRequired,
    movieIsFavorite: PropTypes.bool.isRequired,
  };

  return WithAddToFavoriteButton;
};

export default withAddToFavoriteButton;
