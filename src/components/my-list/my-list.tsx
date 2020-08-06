import React from "react";
import PropTypes from "prop-types";
import Logo from "../logo/logo.jsx";
import MoviesList from "../movies-list/movies-list.jsx";
import UserBlock from "../user-block/user-block.jsx";
import {MOVIE_PROP_TYPE} from "../../const.js";


const MyList = (props) => {
  const {myMovies, authorizationStatus, avatarUrl} = props;
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">My list</h1>
        <UserBlock
          authorizationStatus = {authorizationStatus}
          avatarUrl = {avatarUrl}
        />
      </header>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <MoviesList
          movies = {myMovies}
          showAll = {true}
        />
      </section>
      <footer className="page-footer">
        <Logo
          light = {true}
        />
        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};


MyList.propTypes = {
  myMovies: PropTypes.arrayOf(MOVIE_PROP_TYPE).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
};


export default MyList;
