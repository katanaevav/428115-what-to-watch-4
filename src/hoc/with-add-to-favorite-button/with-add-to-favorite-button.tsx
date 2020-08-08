import * as React from 'react';
import {SavingStatus, AppRoute, AuthorizationStatus} from "../../const";
import history from "../../history";
import {Subtract} from "utility-types";


interface Props {
  authorizationStatus: string;
  savingMovieFavoriteStatus?: string;
  setFavoriteStatus: (
    favoriteStatus: {
      isFavorite: boolean;
      movieId: number;
    },
    action: (resonse: {isFavorite: boolean}) => void,
  ) => void;
  movieId: number;
  isFavorite: boolean;
}

interface InjectedProps {
  isMainScreen: boolean;
  movieId: number;
}

interface State {
  isFavorite: boolean;
  errorSaving: string;
}


const withAddToFavoriteButton = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;

  class WithAddToFavoriteButton extends React.PureComponent<T, State> {
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
      const {isMainScreen, movieId} = this.props;
      const pStyle = {
        margin: 0,
        marginLeft: `auto`,
        padding: `10px`,
        top: `90px`,
        left: `10px`,
        display: `inline-block`,
        zIndex: 2,
        color: `red`,
        backgroundColor: `white`,
      };

      return (
        <div>
          {errorSaving === SavingStatus.FAIL ? <p style = {pStyle}>{`Can't save review to this movie! Please? try again later.`}</p> : ``}
          <Component
            // {...this.props}
            movieId = {movieId}
            isMainScreen = {isMainScreen}
            isFavorite = {isFavorite}
            onFavoriteButtonClick = {this._favoriteButtonClickHandler}
          >
          </Component>
        </div>
      );
    }
  }

  return WithAddToFavoriteButton;
};


export default withAddToFavoriteButton;
