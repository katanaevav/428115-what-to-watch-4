import * as React from "react";
import {MONTH_NAMES} from "../../const";


interface Props {
  text: string;
  author: string;
  date: number;
  mark: number;
}


class Review extends React.PureComponent<Props, {}> {
  constructor(props) {
    super(props);
  }

  _setDateToHTMLFormat(dateInInt) {
    const date = new Date(dateInInt);
    return (
      `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}`
    );
  }

  _setDateToMonthDDYYYYFormat(dateInInt) {
    const date = new Date(dateInInt);
    return (
      `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    );
  }

  render() {
    const {text, author, date, mark} = this.props;

    return (
      <div className="review">
        <blockquote className="review__quote">
          <p className="review__text">{text}</p>

          <footer className="review__details">
            <cite className="review__author">{author}</cite>
            <time className="review__date" dateTime = {this._setDateToHTMLFormat(date)}>{this._setDateToMonthDDYYYYFormat(date)}</time>
          </footer>
        </blockquote>

        <div className="review__rating">{mark.toFixed(1)}</div>
      </div>
    );
  }
}


export default Review;
