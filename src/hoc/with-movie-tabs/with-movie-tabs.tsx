import React, {PureComponent} from 'react';
import MovieTabs from "../../components/movie-tabs/movie-tabs.jsx";
import {Tabs} from "../../const.js";


const withMovieTabs = (Component) => {
  class WithMovieTabs extends PureComponent {
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

      return <Component
        {...this.props}
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

  WithMovieTabs.propTypes = {};

  return WithMovieTabs;
};


export default withMovieTabs;
