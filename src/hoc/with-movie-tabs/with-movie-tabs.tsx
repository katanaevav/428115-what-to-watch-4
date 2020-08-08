import * as React from 'react';
import MovieTabs from "../../components/movie-tabs/movie-tabs";
import {Tabs} from "../../const";
import {Subtract} from "utility-types";
import {Movie, Comment} from "../../types";


interface Props {}

interface InjectedProps {
  authorizationStatus: string,
  avatarUrl?: string,
  comments: Array<Comment>,
  getComments: () => void,
  movie: Movie,
  savingMovieFavoriteStatus: string,
  setFavoriteStatus: () => void,
  similarMovies: Array<Movie>,
}

interface State {
  currentTab: number,
}


const withMovieTabs = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;

  class WithMovieTabs extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        currentTab: Tabs.OVERVIEW_TAB,
      };

      this._movieTabClickHandler = this._movieTabClickHandler.bind(this);
    }

    _movieTabClickHandler(tabIndex) {
      this.setState({
        currentTab: parseInt(tabIndex, 10),
      });
    }

    render() {
      const {currentTab} = this.state;
      const {
        authorizationStatus,
        avatarUrl,
        comments,
        getComments,
        movie,
        savingMovieFavoriteStatus,
        setFavoriteStatus,
        similarMovies,
      } = this.props;

      return <Component
        avatarUrl = {avatarUrl}
        comments = {comments}
        getComments = {getComments}
        movie = {movie}
        savingMovieFavoriteStatus = {savingMovieFavoriteStatus}
        setFavoriteStatus = {setFavoriteStatus}
        similarMovies = {similarMovies}
        authorizationStatus = {authorizationStatus}
        currentTab = {currentTab}
        renderTabs = {() => {
          return (
            <MovieTabs
              currentTab = {currentTab}

              onMovieTabClick = {this._movieTabClickHandler}
            />
          );
        }}
      >
      </Component>;
    }
  }

  return WithMovieTabs;
};


export default withMovieTabs;
