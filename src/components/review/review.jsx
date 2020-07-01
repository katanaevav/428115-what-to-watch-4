import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class Review extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {text, author, date, mark} = this.props;

    return (
      <div className="review">
        <blockquote className="review__quote">
          <p className="review__text">{text}</p>

          <footer className="review__details">
            <cite className="review__author">{author}</cite>
            <time className="review__date" dateTime="2016-12-24">{date}</time>
          </footer>
        </blockquote>

        <div className="review__rating">{mark}</div>
      </div>
    );
  }
}

Review.propTypes = {
  text: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  mark: PropTypes.string.isRequired,
};

export default Review;
