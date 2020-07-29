import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {SavingStatus} from "../../const.js";

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
    }

    _enableForm() {
      const {savingMovieCommentStatus} = this.props;

      this.setState({
        disableForm: false,
        errorSaving: savingMovieCommentStatus,
      });
    }

    _disableForm() {
      this.setState({
        disableForm: true,
      });
    }

    render() {
      const {disableForm, selectedMark, errorSaving} = this.state;
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
          {errorSaving === SavingStatus.FAIL ? <p style={pStyle}>{`Can't save review to this movie! Please? try again later.`}</p> : ``}
          <Component
            {...this.props}

            disableForm = {disableForm}

            onPostButtonClick = {(reviewText) => {
              this._disableForm();

              this.props.onSaveComment({
                mark: selectedMark,
                text: reviewText,
                movieId: this.props.movie.id,
              }, this._enableForm);
            }}

            onMarkChange = {(evt) => {
              this.setState({
                selectedMark: parseInt(evt.target.value, 10),
              });
            }}
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
