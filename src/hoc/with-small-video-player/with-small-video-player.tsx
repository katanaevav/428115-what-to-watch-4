import * as React from 'react';
import VideoPlayer from '../../components/video-player/video-player';
import {MIN_VOLUME, NO_FULLSCREEN} from "../../const";
import {Subtract} from "utility-types";


interface Props {}

interface InjectedProps {
  authorizationStatus: string,
  onMovieMouseOver: () => void,
  onMovieMouseOut: () => void,
}

interface State {
  isPlaying: boolean,
  isPaused: boolean,
}


const withSmallVideoPlayer = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;

  class WithSmallVideoPlayer extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
        isPaused: false,
      };
    }

    render() {
      const {movieId, movieSmallPoster, movieTitle, preview, onMovieMouseOut, onMovieMouseOver} = this.props;

      return <Component

        movieId = {movieId}
        movieSmallPoster = {movieSmallPoster}
        movieTitle = {movieTitle}
        preview = {preview}
        onMovieMouseOut = {onMovieMouseOut}
        onMovieMouseOver = {onMovieMouseOver}

        renderPlayer = {(preview, poster, onMovieMouseOver, onMovieMouseOut) => {
          const {isPlaying, isPaused} = this.state;

          return (
            <div
              className="small-movie-card__image"
              onMouseOver = {() => {
                onMovieMouseOver(() => {
                  this.setState({
                    isPlaying: true,
                    isPaused: false,
                  });
                });
              }}

              onMouseOut = {() => {
                onMovieMouseOut(() => {
                  this.setState({
                    isPlaying: false,
                    isPaused: false,
                  });
                });
              }}
            >
              <VideoPlayer
                poster = {poster}
                src = {preview}
                volume = {MIN_VOLUME}
                isPlaying = {isPlaying}
                isPaused = {isPaused}
                onUpdateTime = {() => {}}
                onSetFullScreen = {() => {}}
                isFullScreen = {NO_FULLSCREEN}
              />
            </div>
          );
        }}
      />;
    }
  }

  return WithSmallVideoPlayer;
};


export default withSmallVideoPlayer;
