import * as React from "react";
import Logo from "../logo/logo";
import MoviesList from "../movies-list/movies-list";
import UserBlock from "../user-block/user-block";
import {Movie} from "../../types";


interface Props {
  myMovies: Array<Movie>,
  authorizationStatus: string,
  avatarUrl?: string,
}


const MyList: React.FunctionComponent<Props> = (props: Props) => {
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


export default MyList;
