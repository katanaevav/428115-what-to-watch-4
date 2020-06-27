import React, {PureComponent} from 'react';
import VideoPlayer from '../../components/video-player/video-player.jsx';

const MIN_VOLUME = 0.0;

const withSmallVideoPlayer = (Component) => {
  class WithSmallVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
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
                  });
                });
              }}

              onMouseOut={() => {
                onMovieMouseOut(() => {
                  this.setState({
                    isPlaying: false,
                  });
                });
              }}
            >
              <VideoPlayer
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
