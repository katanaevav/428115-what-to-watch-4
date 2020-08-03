import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {SavingStatus} from "../../const.js";
import history from "../../history.js";
import {AppRoute} from "../../const.js";


const withNewReview = (Component) => {
  class WithNewReview extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        disableForm: false,
        selectedMark: 5,
        errorSaving: SavingStatus.SUCCESS,
      };

      this._enableForm = this._enableForm.bind(this);
      this._disableForm = this._disableForm.bind(this);
      this._postButtonClickHandler = this._postButtonClickHandler.bind(this);
      this._markChangeHandler = this._markChangeHandler.bind(this);
    }

    _enableForm() {
      const {savingMovieCommentStatus, movie} = this.props;

      this.setState({
        disableForm: false,
        errorSaving: savingMovieCommentStatus,
      });

      history.push(`${AppRoute.FILMS}/${movie.id}`);
    }

    _disableForm() {
      this.setState({
        disableForm: true,
      });
    }

    _postButtonClickHandler(reviewText) {
      const {selectedMark} = this.state;
      const {onSaveComment, movie} = this.props;
      this._disableForm();

      onSaveComment({
        mark: selectedMark,
        text: reviewText,
        movieId: movie.id,
      }, this._enableForm);
    }

    _markChangeHandler(evt) {
      this.setState({
        selectedMark: parseInt(evt.target.value, 10),
      });
    }

    render() {
      const {disableForm, errorSaving} = this.state;
      const pStyle = {
        margin: 0,
        marginLeft: `auto`,
        padding: `10px`,
        top: `90px`,
        left: `10px`,
        display: `inline-block`,
        position: `absolute`,
        zIndex: 2,
        color: `red`,
        backgroundColor: `white`,
      };

      return (
        <div>
          {errorSaving === SavingStatus.FAIL ? <p style= {pStyle}>{`Can't save review to this movie! Please? try again later.`}</p> : ``}
          <Component
            {...this.props}

            disableForm = {disableForm}

            onPostButtonClick = {this._postButtonClickHandler}

            onMarkChange = {this._markChangeHandler}
          >
          </Component>
        </div>
      );
    }
  }


  WithNewReview.propTypes = {
    movie: PropTypes.object.isRequired,
    onSaveComment: PropTypes.func.isRequired,
    savingMovieCommentStatus: PropTypes.string,
  };

  return WithNewReview;
};


export default withNewReview;
