import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import Logo from "../logo/logo.jsx";
import UserBlock from "../user-block/user-block.jsx";

class AddReview extends PureComponent {
  constructor(props) {
    super(props);

    this._reviewTextRef = createRef();

    this.state = {
      disableForm: false,
      selectedMark: 5,
      reviewText: ``,
    };

    this._postButtonClickHandler = this._postButtonClickHandler.bind(this);
    this._markChangeHandler = this._markChangeHandler.bind(this);
    this._reviewTextChangeHandler = this._reviewTextChangeHandler.bind(this);
  }

  _postButtonClickHandler(evt) {
    evt.preventDefault();

    if (this._reviewTextRef.current.value.length < 14) {
      this._reviewTextRef.current.style.border = `2px solid red`;
    } else {
      this._reviewTextRef.current.style.border = `none`;
    }

    console.log(this.state);
  }

  _markChangeHandler(evt) {
    this.setState({
      selectedMark: parseInt(evt.target.value, 10),
    });
  }

  _reviewTextChangeHandler(evt) {
    this.setState({
      reviewText: evt.target.value,
    });
    console.log(evt.target.value);
  }

  render() {
    const {movie, onOpenAuthScreen, authorizationStatus, avatarUrl} = this.props;

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
                  <a href="movie-page.html" className="breadcrumbs__link">{movie.title}</a>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            <UserBlock
              onOpenAuthScreen = {onOpenAuthScreen}
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
                <input className="rating__input" id="star-1" type="radio" name="rating" value="1" onChange={this._markChangeHandler} disabled={this.state.disableForm}/>
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input className="rating__input" id="star-2" type="radio" name="rating" value="2" onChange={this._markChangeHandler} disabled={this.state.disableForm}/>
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input className="rating__input" id="star-3" type="radio" name="rating" value="3" onChange={this._markChangeHandler} disabled={this.state.disableForm}/>
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input className="rating__input" id="star-4" type="radio" name="rating" value="4" onChange={this._markChangeHandler} disabled={this.state.disableForm}/>
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input className="rating__input" id="star-5" type="radio" name="rating" value="5" onChange={this._markChangeHandler} disabled={this.state.disableForm}/>
                <label className="rating__label" htmlFor="star-5">Rating 5</label>
              </div>
            </div>

            <div className="add-review__text">
              <textarea
                className="add-review__textarea"
                name="review-text" id="review-text"
                placeholder="Review text"
                ref={this._reviewTextRef}
                disabled={this.state.disableForm}
                maxLength="400"
                onChange={this._reviewTextChangeHandler}
              ></textarea>
              <div className="add-review__submit">
                <button
                  className="add-review__btn"
                  type="submit"
                  disabled={this.state.disableForm}
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
  onOpenAuthScreen: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
};

export default AddReview;
