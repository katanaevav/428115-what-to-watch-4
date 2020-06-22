import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class MoviePage extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {id, title, genre, year, bigPoster, cover, ratingScore, ratingCount, director, starring, description} = this.props;

    let ratingLevel;
    const score = Number.parseFloat(ratingScore);

    switch (true) {
      case score < 3:
        ratingLevel = `Bad`;
        break;
      case score >= 3 && score < 5:
        ratingLevel = `Normal`;
        break;
      case score >= 5 && score < 8:
        ratingLevel = `Good`;
        break;
      case score >= 8 && score < 10:
        ratingLevel = `Very good`;
        break;
      case score === 10:
        ratingLevel = `Awesome`;
        break;
      default:
        ratingLevel = `N/A`;
    }

    return (
      <React.Fragment>
        <section className="movie-card movie-card--full" data-key={id}>
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={cover} alt={title} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header movie-card__head">
              <div className="logo">
                <a href="main.html" className="logo__link">
                  <span className="logo__letter logo__letter--1">W</span>
                  <span className="logo__letter logo__letter--2">T</span>
                  <span className="logo__letter logo__letter--3">W</span>
                </a>
              </div>

              <div className="user-block">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </div>
            </header>

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genre}</span>
                  <span className="movie-card__year">{year}</span>
                </p>

                <div className="movie-card__buttons">
                  <button className="btn btn--play movie-card__button" type="button">
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
                  <a href="add-review.html" className="btn movie-card__button">Add review</a>
                </div>
              </div>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src={bigPoster} alt={title} width="218" height="327" />
              </div>

              <div className="movie-card__desc">
                <nav className="movie-nav movie-card__nav">
                  <ul className="movie-nav__list">
                    <li className="movie-nav__item movie-nav__item--active">
                      <a href="#" className="movie-nav__link">Overview</a>
                    </li>
                    <li className="movie-nav__item">
                      <a href="#" className="movie-nav__link">Details</a>
                    </li>
                    <li className="movie-nav__item">
                      <a href="#" className="movie-nav__link">Reviews</a>
                    </li>
                  </ul>
                </nav>

                <div className="movie-rating">
                  <div className="movie-rating__score">{ratingScore}</div>
                  <p className="movie-rating__meta">
                    <span className="movie-rating__level">{ratingLevel}</span>
                    <span className="movie-rating__count">{ratingCount} ratings</span>
                  </p>
                </div>

                <div className="movie-card__text">
                  <p>{description}</p>

                  {/* <p>Gustave prides himself on providing first-class service to the hotel&apos;s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave&apos;s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.</p> */}

                  <p className="movie-card__director"><strong>Director: {director}</strong></p>

                  <p className="movie-card__starring"><strong>Starring: {starring}</strong></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <div className="catalog__movies-list">
              <article className="small-movie-card catalog__movies-card">
                <div className="small-movie-card__image">
                  <img src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg" alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175" />
                </div>
                <h3 className="small-movie-card__title">
                  <a className="small-movie-card__link" href="movie-page.html">Fantastic Beasts: The Crimes of Grindelwald</a>
                </h3>
              </article>

              <article className="small-movie-card catalog__movies-card">
                <div className="small-movie-card__image">
                  <img src="img/bohemian-rhapsody.jpg" alt="Bohemian Rhapsody" width="280" height="175" />
                </div>
                <h3 className="small-movie-card__title">
                  <a className="small-movie-card__link" href="movie-page.html">Bohemian Rhapsody</a>
                </h3>
              </article>

              <article className="small-movie-card catalog__movies-card">
                <div className="small-movie-card__image">
                  <img src="img/macbeth.jpg" alt="Macbeth" width="280" height="175" />
                </div>
                <h3 className="small-movie-card__title">
                  <a className="small-movie-card__link" href="movie-page.html">Macbeth</a>
                </h3>
              </article>

              <article className="small-movie-card catalog__movies-card">
                <div className="small-movie-card__image">
                  <img src="img/aviator.jpg" alt="Aviator" width="280" height="175" />
                </div>
                <h3 className="small-movie-card__title">
                  <a className="small-movie-card__link" href="movie-page.html">Aviator</a>
                </h3>
              </article>
            </div>
          </section>

          <footer className="page-footer">
            <div className="logo">
              <a href="main.html" className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

MoviePage.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  bigPoster: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  ratingScore: PropTypes.string.isRequired,
  ratingCount: PropTypes.number.isRequired,
  director: PropTypes.string.isRequired,
  starring: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default MoviePage;
