import React, {PureComponent} from "react";
import VideoPlayer from "../../components/video-player/video-player.jsx";
import VideoProgress from "../../components/video-progress/video-progress.jsx";

const withCinemaVideoPlayer = (Component) => {
  class WithCinemaVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this._updateTimeHandler = this._updateTimeHandler.bind(this);
      this._setFullScreenHandler = this._setFullScreenHandler.bind(this);

      this.state = {
        isPlaying: false,
        isPaused: false,
        progress: 0,
        duration: 0,
        isFullScreen: false,
      };
    }

    _setFullScreenHandler(fullScreenStatus) {
      this.setState({
        isFullScreen: fullScreenStatus,
      });
    }

    _updateTimeHandler(currentTime, movieDuration) {
      this.setState({
        progress: currentTime,
        duration: movieDuration,
      });

      if (currentTime === movieDuration && movieDuration > 0) {
        this.setState({
          isPlaying: false,
          isPaused: false,
        });
      }
    }

    render() {
      return <Component
        {...this.props}

        onPlayButtonClick={() => {
          this.setState({
            isPlaying: true,
            isPaused: false,
          });
        }}

        onPauseButtonClick={() => {
          this.setState({
            isPlaying: false,
            isPaused: true,
          });
        }}

        onFullScreenButtonClick={() => {
          this.setState({
            isFullScreen: true,
          });
        }}

        renderPlayer={(movie, poster) => {
          const {isPlaying, isPaused, isFullScreen} = this.state;

          return (
            <VideoPlayer
              poster={poster}
              src={movie}
              volume={1.0}
              isPlaying={isPlaying}
              isPaused={isPaused}
              onUpdateTime={this._updateTimeHandler}
              onSetFullScreen={this._setFullScreenHandler}
              isFullScreen={isFullScreen}
            />
          );
        }}

        renderProgress={() => {
          const {progress, duration} = this.state;

          return (
            <VideoProgress
              currentProgress={isNaN(progress) ? 0 : progress}
              duration={isNaN(duration) ? 0 : duration}
            />
          );
        }}
      />;
    }
  }

  WithCinemaVideoPlayer.propTypes = {};

  return WithCinemaVideoPlayer;
};

export default withCinemaVideoPlayer;
