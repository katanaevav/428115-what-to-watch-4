import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import ReviewsColumn from "../reviews-column/reviews-column.jsx";

const COLUMNS_COUNT = 2;

class MovieReviews extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {reviews} = this.props;
    const firsColumnReviews = Math.ceil(reviews.length / COLUMNS_COUNT);

    return (
      <React.Fragment>
        <div className="movie-card__reviews movie-card__row">
          <ReviewsColumn reviews = {reviews.slice(0, firsColumnReviews)} />
          {reviews.length > 1 ? <ReviewsColumn reviews = {reviews.slice(firsColumnReviews)} /> : ``}
        </div>
      </React.Fragment>
    );
  }
}

MovieReviews.propTypes = {
  reviews: PropTypes.array.isRequired,
};

export default MovieReviews;
