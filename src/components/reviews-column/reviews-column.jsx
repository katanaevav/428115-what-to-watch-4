import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Review from "../review/review.jsx";

class ReviewsColumn extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {reviews} = this.props;

    return (
      <div className="movie-card__reviews-col">
        {
          reviews.map((review) => (
            <Review
              key = {review.id}
              text = {review.text}
              author = {review.author}
              date = {review.date}
              mark = {review.mark}
            />
          ))
        }
      </div>
    );
  }
}

ReviewsColumn.propTypes = {
  reviews: PropTypes.array.isRequired,
};

export default ReviewsColumn;
