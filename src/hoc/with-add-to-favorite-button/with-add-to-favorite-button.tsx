import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {SavingStatus, AppRoute, AuthorizationStatus} from "../../const.js";
import history from "../../history.js";


const withAddToFavoriteButton = (Component) => {
  class WithAddToFavoriteButton extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isFavorite: this.props.isFavorite,
        errorSaving: SavingStatus.SUCCESS,
      };

      this._setSavingStatus = this._setSavingStatus.bind(this);
      this._favoriteButtonClickHandler = this._favoriteButtonClickHandler.bind(this);
    }

    _favoriteButtonClickHandler() {
      const {isFavorite} = this.state;

      if (this.props.authorizationStatus === AuthorizationStatus.NO_AUTH) {
        history.push(AppRoute.LOGIN);
      } else {
        this.props.setFavoriteStatus({
          isFavorite: !isFavorite,
          movieId: this.props.movieId,
        }, this._setSavingStatus);
      }
    }

    _setSavingStatus(response) {
      const {savingMovieFavoriteStatus} = this.props;

      this.setState({
        isFavorite: response.isFavorite,
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
          {errorSaving === SavingStatus.FAIL ? <p style = {pStyle}>{`Can't save review to this movie! Please? try again later.`}</p> : ``}
          <Component
            {...this.props}
            isFavorite = {isFavorite}

            onFavoriteButtonClick = {this._favoriteButtonClickHandler}
          >
          </Component>
        </div>
      );
    }
  }


  WithAddToFavoriteButton.propTypes = {
    authorizationStatus: PropTypes.string.isRequired,
    savingMovieFavoriteStatus: PropTypes.string,
    setFavoriteStatus: PropTypes.func.isRequired,
    movieId: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  };

  return WithAddToFavoriteButton;
};


export default withAddToFavoriteButton;
