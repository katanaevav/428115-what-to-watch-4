import React from "react";
import PropTypes from "prop-types";
import Review from "../review/review.jsx";
import {COMMENT_PROP_TYPE} from "../../const.js";


const ReviewsColumn = (props) => {
  const {reviews} = props;

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
};


ReviewsColumn.propTypes = {
  reviews: PropTypes.arrayOf(COMMENT_PROP_TYPE).isRequired,
};


export default ReviewsColumn;
