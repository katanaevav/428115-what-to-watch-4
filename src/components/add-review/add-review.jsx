import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import Logo from "../logo/logo.jsx";
import UserBlock from "../user-block/user-block.jsx";
import {Link} from 'react-router-dom';
import {AppRoute} from "../../const.js";


class AddReview extends PureComponent {
  constructor(props) {
    super(props);

    this._reviewTextRef = createRef();

    this._postButtonClickHandler = this._postButtonClickHandler.bind(this);
  }

  _postButtonClickHandler(evt) {
    evt.preventDefault();

    if (this._reviewTextRef.current.value.length < 14) {
      this._reviewTextRef.current.style.border = `2px solid red`;
    } else {
      this._reviewTextRef.current.style.border = `none`;
      this.props.onPostButtonClick(this._reviewTextRef.current.value);
    }
  }

  render() {
    const {movie, authorizationStatus, avatarUrl, onMarkChange, disableForm} = this.props;

    return (
      <section className="movie-card movie-card--full">
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={movie.cover} alt={movie.title} />
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
            <img src={movie.bigPoster} alt={movie.title} width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <form action="#" className="add-review__form">
            <div className="rating">
              <div className="rating__stars">
                <input className="rating__input" id="star-1" type="radio" name="rating" value="1" onChange={onMarkChange} disabled={disableForm}/>
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input className="rating__input" id="star-2" type="radio" name="rating" value="2" onChange={onMarkChange} disabled={disableForm}/>
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input className="rating__input" id="star-3" type="radio" name="rating" value="3" onChange={onMarkChange} disabled={disableForm}/>
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input className="rating__input" id="star-4" type="radio" name="rating" value="4" onChange={onMarkChange} disabled={disableForm}/>
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input className="rating__input" id="star-5" type="radio" name="rating" value="5" onChange={onMarkChange} disabled={disableForm}/>
                <label className="rating__label" htmlFor="star-5">Rating 5</label>
              </div>
            </div>

            <div className="add-review__text">
              <textarea
                className="add-review__textarea"
                name="review-text" id="review-text"
                placeholder="Review text"
                ref={this._reviewTextRef}
                disabled={disableForm}
                maxLength="400"
                onChange={this._reviewTextChangeHandler}
              ></textarea>
              <div className="add-review__submit">
                <button
                  className="add-review__btn"
                  type="submit"
                  disabled={disableForm}
                  onClick={this._postButtonClickHandler}
                >Post</button>
              </div>

            </div>
          </form>
        </div>

      </section>
    );
  }
}

AddReview.propTypes = {
  movie: PropTypes.object.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
  disableForm: PropTypes.bool.isRequired,
  onPostButtonClick: PropTypes.func.isRequired,
  onMarkChange: PropTypes.func.isRequired,
};

export default AddReview;
