import React from "react";
import PropTypes from "prop-types";
import ReviewsColumn from "../reviews-column/reviews-column.jsx";
import {REVIEWS_COLUMNS_COUNT} from "../../const.js";
import {COMMENT_PROP_TYPE} from "../../const.js";


const MovieReviews = (props) => {
  const {reviews} = props;
  const firsColumnReviews = Math.ceil(reviews.length / REVIEWS_COLUMNS_COUNT);

  return (
    <React.Fragment>
      <div className="movie-card__reviews movie-card__row">
        <ReviewsColumn reviews = {reviews.slice(0, firsColumnReviews)} />
        {reviews.length > 1 ? <ReviewsColumn reviews = {reviews.slice(firsColumnReviews)} /> : ``}
      </div>
    </React.Fragment>
  );
};


MovieReviews.propTypes = {
  reviews: PropTypes.arrayOf(COMMENT_PROP_TYPE).isRequired,
};


export default MovieReviews;
