import React, {PureComponent} from 'react';
import VideoPlayer from '../../components/video-player/video-player.jsx';
import {MIN_VOLUME, NO_FULLSCREEN} from "../../const.js";


const withSmallVideoPlayer = (Component) => {
  class WithSmallVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
        isPaused: false,
      };
    }

    render() {
      return <Component
        {...this.props}

        renderPlayer={(preview, poster, onMovieMouseOver, onMovieMouseOut) => {
          const {isPlaying, isPaused} = this.state;

          return (
            <div
              className="small-movie-card__image"
              onMouseOver={() => {
                onMovieMouseOver(() => {
                  this.setState({
                    isPlaying: true,
                    isPaused: false,
                  });
                });
              }}

              onMouseOut={() => {
                onMovieMouseOut(() => {
                  this.setState({
                    isPlaying: false,
                    isPaused: false,
                  });
                });
              }}
            >
              <VideoPlayer
                poster={poster}
                src={preview}
                volume={MIN_VOLUME}
                isPlaying={isPlaying}
                isPaused={isPaused}
                onUpdateTime={() => {}}
                onSetFullScreen={() => {}}
                isFullScreen={NO_FULLSCREEN}
              />
            </div>
          );
        }}
      />;
    }
  }


  WithSmallVideoPlayer.propTypes = {};

  return WithSmallVideoPlayer;
};


export default withSmallVideoPlayer;
