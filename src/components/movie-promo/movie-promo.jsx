import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import UserBlock from "../user-block/user-block.jsx";
import Logo from "../logo/logo.jsx";

class MoviePromo extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {promoMovieTitle, promoMovieGenre, promoMovieYear, cover, bigPoster, onPlayPromoMovieClick} = this.props;

    return (
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={cover} alt={promoMovieTitle} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <Logo />
          <UserBlock />
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={bigPoster} alt={promoMovieTitle} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{promoMovieTitle}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{promoMovieGenre}</span>
                <span className="movie-card__year">{promoMovieYear}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button" onClick={onPlayPromoMovieClick}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="/sprite.svg#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="/sprite.svg#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

MoviePromo.propTypes = {
  promoMovieTitle: PropTypes.string.isRequired,
  promoMovieGenre: PropTypes.string.isRequired,
  promoMovieYear: PropTypes.number.isRequired,
  cover: PropTypes.string.isRequired,
  bigPoster: PropTypes.string.isRequired,
  onPlayPromoMovieClick: PropTypes.func.isRequired,
};

export default MoviePromo;
