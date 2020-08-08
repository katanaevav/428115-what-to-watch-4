import * as React from "react";
import AddToMyList from "../add-to-my-list/add-to-my-list";
import {Link} from 'react-router-dom';
import {AppRoute} from "../../const";


interface Props {
  isMainScreen: boolean;
  movieId: number;
  isFavorite: boolean;
  onFavoriteButtonClick: () => void;
}


const MovieButtons: React.FunctionComponent<Props> = (props: Props) => {
  const {movieId, isFavorite, onFavoriteButtonClick, isMainScreen} = props;

  return (
    <div className="movie-card__buttons">
      <Link
        className="btn btn--play movie-card__button"
        type="button"
        to = {`${AppRoute.PLAYER}/${movieId}`}
      >
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="/sprite.svg#play-s"></use>
        </svg>
        <span>Play</span>
      </Link>
      <AddToMyList
        isFavorite = {isFavorite}
        onButtonClick = {onFavoriteButtonClick}
      />
      {!isMainScreen ?
        <Link
          to = {`${AppRoute.FILMS}/${movieId}${AppRoute.ADD_REVIEW}`}
          className="btn movie-card__button"
        >
          {`Add review`}
        </Link> : ``
      }
    </div>
  );
};


export default MovieButtons;
