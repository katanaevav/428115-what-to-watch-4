import React from "react";
import Main from "../main/main.jsx";

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {promoMovieTitle, promoMovieGenre, promoMovieYear, movies} = props;

  return (
    <Main
      promoMovieTitle = {promoMovieTitle}
      promoMovieGenre = {promoMovieGenre}
      promoMovieYear = {promoMovieYear}
      movies = {movies}
    />
  );
};

export default App;
