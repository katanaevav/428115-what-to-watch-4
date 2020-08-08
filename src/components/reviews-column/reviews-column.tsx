import * as React from "react";
import Review from "../review/review";
import {Comment} from "../../types";


interface Props {
  reviews: Array<Comment>;
}


const ReviewsColumn: React.FunctionComponent<Props> = (props: Props) => {
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


export default ReviewsColumn;
