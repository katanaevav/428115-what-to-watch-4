import * as React from "react";
import Logo from "../logo/logo";
import UserBlock from "../user-block/user-block";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";
import {Movie} from "../../types";

interface Props {
  movie: Movie;
  authorizationStatus: string;
  avatarUrl?: string;
  disableForm: boolean;
  onPostButtonClick: (string) => void;
  onMarkChange: () => void;
}

class AddReview extends React.PureComponent<Props, {}> {
  private reviewTextRef: React.RefObject<HTMLTextAreaElement>;

  constructor(props) {
    super(props);

    this.reviewTextRef = React.createRef();

    this._postButtonClickHandler = this._postButtonClickHandler.bind(this);
  }

  _postButtonClickHandler(evt) {
    evt.preventDefault();

    if (this.reviewTextRef.current.value.length < 14) {
      this.reviewTextRef.current.style.border = `2px solid red`;
    } else {
      this.reviewTextRef.current.style.border = `none`;
      this.props.onPostButtonClick(this.reviewTextRef.current.value);
    }
  }

  render() {
    const {movie, authorizationStatus, avatarUrl, onMarkChange, disableForm} = this.props;

    return (
      <section className="movie-card movie-card--full">
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src = {movie.cover} alt = {movie.title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <Logo />

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link
                    to = {`${AppRoute.FILMS}/${movie.id}`}
                    className="breadcrumbs__link"
                  >
                    {movie.title}
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            <UserBlock
              authorizationStatus = {authorizationStatus}
              avatarUrl = {avatarUrl}
            />
          </header>

          <div className="movie-card__poster movie-card__poster--small">
            <img src = {movie.bigPoster} alt = {movie.title} width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <form action="#" className="add-review__form">
            <div className="rating">
              <div className="rating__stars">
                <input className="rating__input" id="star-1" type="radio" name="rating" value="1" onChange = {onMarkChange} disabled = {disableForm}/>
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input className="rating__input" id="star-2" type="radio" name="rating" value="2" onChange = {onMarkChange} disabled = {disableForm}/>
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input className="rating__input" id="star-3" type="radio" name="rating" value="3" onChange = {onMarkChange} disabled = {disableForm}/>
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input className="rating__input" id="star-4" type="radio" name="rating" value="4" onChange = {onMarkChange} disabled = {disableForm}/>
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input className="rating__input" id="star-5" type="radio" name="rating" value="5" onChange = {onMarkChange} disabled = {disableForm}/>
                <label className="rating__label" htmlFor="star-5">Rating 5</label>
              </div>
            </div>

            <div className="add-review__text">
              <textarea
                className="add-review__textarea"
                name="review-text" id="review-text"
                placeholder="Review text"
                ref = {this.reviewTextRef}
                disabled = {disableForm}
                maxLength = {400}
              ></textarea>
              <div className="add-review__submit">
                <button
                  className="add-review__btn"
                  type="submit"
                  disabled = {disableForm}
                  onClick = {this._postButtonClickHandler}
                >Post</button>
              </div>

            </div>
          </form>
        </div>

      </section>
    );
  }
}


export default AddReview;
