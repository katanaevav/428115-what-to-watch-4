import * as React from "react";
import UserBlock from "../user-block/user-block";
import Logo from "../logo/logo";
import withAddToFavoriteButton from "../../hoc/with-add-to-favorite-button/with-add-to-favorite-button";
import MovieButtons from "../movie-buttons/movie-buttons";


interface Props {
  authorizationStatus: string,
  avatarUrl?: string,
  promoMovieTitle: string,
  promoMovieGenre: string,
  promoMovieYear: number,
  movieId: number,
  isFavorite: boolean,
  cover: string,
  bigPoster: string,
  savingMovieFavoriteStatus?: string,
  setFavoriteStatus: () => void,
}


const MovieButtonsWrapper = withAddToFavoriteButton(MovieButtons);


const MoviePromo: React.FunctionComponent<Props> = (props: Props) => {
  const {
    authorizationStatus,
    avatarUrl,
    movieId,
    promoMovieTitle,
    promoMovieGenre,
    promoMovieYear,
    isFavorite,
    cover,
    bigPoster,
    savingMovieFavoriteStatus,
    setFavoriteStatus
  } = props;

  return (
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src = {cover} alt = {promoMovieTitle} />
      </div>
      <h1 className="visually-hidden">WTW</h1>
      <header className="page-header movie-card__head">
        <Logo
          isMainScreen = {true}
        />
        <UserBlock
          authorizationStatus = {authorizationStatus}
          avatarUrl = {avatarUrl}
        />
      </header>
      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src = {bigPoster} alt = {promoMovieTitle} width="218" height="327" />
          </div>
          <div className="movie-card__desc">
            <h2 className="movie-card__title">{promoMovieTitle}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{promoMovieGenre}</span>
              <span className="movie-card__year">{promoMovieYear}</span>
            </p>
            <MovieButtonsWrapper
              isMainScreen = {true}
              movieId = {movieId}
              authorizationStatus = {authorizationStatus}
              isFavorite = {isFavorite}
              savingMovieFavoriteStatus = {savingMovieFavoriteStatus}
              setFavoriteStatus = {setFavoriteStatus}
            />
          </div>
        </div>
      </div>
    </section>
  );
};


export default MoviePromo;
