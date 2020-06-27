import React, {PureComponent} from 'react';
import VideoPlayer from '../../components/video-player/video-player.jsx';

const MIN_VOLUME = 0.0;
const DELAY_BEFORE_START_PLAYING = 1000;

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

        renderPlayer={(preview, poster, height, width, onMovieMouseOver, onMovieMouseOut) => {
          const {isPlaying, isPaused} = this.state;

          return (
            <div
              className="small-movie-card__image"
              onMouseOver={() => {
                this._timer = setTimeout(() => {
                  this.setState({
                    isPlaying: true,
                    isPaused: false,
                  });
                }, DELAY_BEFORE_START_PLAYING);
                onMovieMouseOver(this.state);
              }}

              onMouseOut={() => {
                clearTimeout(this._timer);
                this.setState({
                  isPlaying: false,
                  isPaused: false,
                });
                onMovieMouseOut(this.state);
              }}
            >
              <VideoPlayer
                playerHeight={height}
                playerWidth={width}
                poster={poster}
                preview={preview}
                volume={MIN_VOLUME}
                isPlaying={isPlaying}
                isPaused={isPaused}
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
