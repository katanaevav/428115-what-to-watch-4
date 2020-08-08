import * as React from 'react';
import VideoPlayer from '../../components/video-player/video-player';
import {MIN_VOLUME, NO_FULLSCREEN} from "../../const";
import {emptyFunction} from "../../utils";
import {Subtract} from "utility-types";


interface Props {
  movieId: number;
  movieSmallPoster: string;
  movieTitle: string;
  preview: string;
  onMovieMouseOver: (callback: () => void) => void;
  onMovieMouseOut: (callback: () => void) => void;
}

interface State {
  isPlaying: boolean;
  isPaused: boolean;
}


const withSmallVideoPlayer = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, Props>;

  class WithSmallVideoPlayer extends React.PureComponent<Props, State> {
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

        renderPlayer = {(moviePreview, poster, onMouseMovieOver, onMouseMovieOut) => {
          const {isPlaying, isPaused} = this.state;

          return (
            <div
              className="small-movie-card__image"
              onMouseOver = {() => {
                onMouseMovieOver(() => {
                  this.setState({
                    isPlaying: true,
                    isPaused: false,
                  });
                });
              }}

              onMouseOut = {() => {
                onMouseMovieOut(() => {
                  this.setState({
                    isPlaying: false,
                    isPaused: false,
                  });
                });
              }}
            >
              <VideoPlayer
                poster = {poster}
                src = {moviePreview}
                volume = {MIN_VOLUME}
                isPlaying = {isPlaying}
                isPaused = {isPaused}
                onUpdateTime = {emptyFunction}
                onSetFullScreen = {emptyFunction}
                isFullScreen = {NO_FULLSCREEN}
              />
            </div>
          );
        }}

        preview = {preview}
        onMovieMouseOut = {onMovieMouseOut}
        onMovieMouseOver = {onMovieMouseOver}
      />;
    }
  }

  return WithSmallVideoPlayer;
};


export default withSmallVideoPlayer;
