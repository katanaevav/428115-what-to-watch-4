import React, {PureComponent} from 'react';
import VideoPlayer from '../../components/video-player/video-player.jsx';

const DELAY_BEFORE_START_PLAYING = 1000;
const MIN_VOLUME = 0.0;

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
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
        renderPlayer={(preview, poster) => {
          let startPlaying = false;
          return (
            <div
              className="small-movie-card__image"
              onMouseOver={() => {
                startPlaying = true;
                setTimeout(() => {
                  if (startPlaying) {
                    this.setState({
                      isPlaying: true,
                      isPaused: false,
                    });
                  }
                }, DELAY_BEFORE_START_PLAYING);
              }}
              onMouseOut={() => {
                this.setState({
                  isPlaying: false,
                  isPaused: false,
                });
                startPlaying = false;
              }}
            >
              <VideoPlayer
                poster={poster}
                preview={preview}
                volume={MIN_VOLUME}
                isPlaying={this.state.isPlaying}
                isPaused={this.state.isPaused}
              />
            </div>
          );
        }}
      />;
    }
  }

  WithActivePlayer.propTypes = {};

  return WithActivePlayer;
};

export default withActivePlayer;
