import * as React from "react";
import MoviesList from "../movies-list/movies-list";
import GenreList from "../genre-list/genre-list";
import MoviePromo from "../movie-promo/movie-promo";
import Logo from "../logo/logo";
import {Movie} from "../../types";


interface Props {
  authorizationStatus: string;
  avatarUrl?: string;
  promoMovie: Movie;
  genres: Array<string>;
  movies: Array<Movie>;
  currentGenreFilter: string;
  onMovieFilterClick: () => void;
  savingMovieFavoriteStatus?: string;
  setFavoriteStatus: () => void;
}


const Main: React.FunctionComponent<Props> = (props: Props) => {
  const {authorizationStatus, avatarUrl, promoMovie, genres, movies, currentGenreFilter, onMovieFilterClick, savingMovieFavoriteStatus, setFavoriteStatus} = props;
  const {title, genre, year, cover, bigPoster, isFavorite, id} = promoMovie;

  return (
    <React.Fragment>
      <MoviePromo
        authorizationStatus = {authorizationStatus}
        avatarUrl = {avatarUrl}
        promoMovieTitle = {title}
        promoMovieGenre = {genre}
        promoMovieYear = {year}
        isFavorite = {isFavorite}
        movieId = {id}
        cover = {cover}
        bigPoster = {bigPoster}
        savingMovieFavoriteStatus = {savingMovieFavoriteStatus}
        setFavoriteStatus = {setFavoriteStatus}
      />

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList
            currentGenre = {currentGenreFilter}
            genres = {genres}
            onGenreClick = {onMovieFilterClick}
          />

          <MoviesList
            movies = {movies}
          />
        </section>

        <footer className="page-footer">
          <Logo
            isMainScreen = {true}
            light = {true}
          />

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};


export default Main;
