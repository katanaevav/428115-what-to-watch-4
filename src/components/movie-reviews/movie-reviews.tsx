import * as React from "react";
import ReviewsColumn from "../reviews-column/reviews-column";
import {REVIEWS_COLUMNS_COUNT} from "../../const";
import {Comment} from "../../types";


interface Props {
  reviews: Array<Comment>;
}


const MovieReviews: React.FunctionComponent<Props> = (props: Props) => {
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


export default MovieReviews;
