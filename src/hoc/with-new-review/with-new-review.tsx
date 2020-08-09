import * as React from 'react';
import {SavingStatus} from "../../const";
import history from "../../history";
import {AppRoute} from "../../const";
import {Movie} from "../../types";

interface Comment {
  mark: number;
  text: string;
  movieId: number;
}

interface Props {
  movie: Movie;
  onSaveComment: (
    comment: Comment,
    action: (() => void),
  ) => void;
  savingMovieCommentStatus?: string;
}

interface State {
  disableForm: boolean;
  selectedMark: number;
  errorSaving: string;
}


const withNewReview = (Component) => {
  class WithNewReview extends React.PureComponent<Props, State> {
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
        zIndex: 2,
        color: `red`,
        backgroundColor: `white`,
      };

      return (
        <div>
          {errorSaving === SavingStatus.FAIL ? <p style = {pStyle}>{`Can't save review to this movie! Please? try again later.`}</p> : ``}
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

  return WithNewReview;
};


export default withNewReview;
