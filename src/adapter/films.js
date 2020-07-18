export const createMovie = (movie) => {
  return {
    id: movie.id,
    title: movie.name,
    smallPoster: movie.preview_image,
    genre: movie.genre,
    year: movie.released,
    runTime: movie.run_time,
    bigPoster: movie.poster_image,
    cover: movie.background_image,
    ratingScore: movie.rating,
    ratingCount: movie.scores_count,
    preview: movie.preview_video_link,
    video: movie.video_link,
    directors: [movie.director],
    starrings: movie.starring,
    descriptions: [movie.description],
    backgroundColor: movie.background_color,
    isFavorite: movie.is_favorite,
  };
};

export const createMovies = (movies) => {
  return movies.map((movie) => createMovie(movie));
};

const createComment = (comment) => {
  return {
    id: comment.id,
    text: comment.comment,
    author: comment.user.name,
    date: Date.parse(comment.date),
    mark: comment.rating,
  };
};

export const createComments = (comments) => {
  return comments.map((comment) => createComment(comment));
};
