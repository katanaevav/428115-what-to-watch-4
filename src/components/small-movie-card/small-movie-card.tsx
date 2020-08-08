import * as React from "react";
import {AppRoute} from "../../const";
import {Link} from "react-router-dom";


interface Props {
  movieId: number;
  movieTitle: string;
  movieSmallPoster: string;
  preview: string;
  onMovieMouseOver: () => {};
  onMovieMouseOut: () => {};
  renderPlayer: (
    preview: string,
    movieSmallPoster: string,
    onMouseOver: () => {},
    onMouseOut: () => {},
  ) => {};
}


const SmallMovieCard: React.FunctionComponent<Props> = (props: Props) => {
  const {movieId, movieTitle, renderPlayer, movieSmallPoster, preview, onMovieMouseOver, onMovieMouseOut} = props;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      data-key = {movieId}
    >
      {renderPlayer(preview, movieSmallPoster, onMovieMouseOver, onMovieMouseOut)}
      <h3 className="small-movie-card__title">
        <Link
          className="small-movie-card__link"
          href="movie-page.html"
          to = {`${AppRoute.FILMS}/${movieId}`}
        >
          {movieTitle}
        </Link>
      </h3>
    </article>
  );
};


export default SmallMovieCard;
