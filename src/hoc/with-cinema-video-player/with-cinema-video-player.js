import React, {PureComponent} from 'react';
import VideoPlayer from '../../components/video-player/video-player.jsx';
import {MIN_VOLUME} from "../../const.js";

const withCinemaVideoPlayer = (Component) => {
  class WithCinemaVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this._updateTimeHandler = this._updateTimeHandler.bind(this);

      this.state = {
        isPlaying: false,
        isPaused: false,
        progress: 0,
        duration: 0,
      };
    }

    _updateTimeHandler(currentTime, duration) {
      return currentTime;
      // console.log(currentTime, duration);
    }

    render() {
      return <Component
        {...this.props}

        onPlay={() => {
          this.setState({
            isPlaying: true,
            isPaused: false,
          });
        }}

        onPause={() => {
          this.setState({
            isPlaying: false,
            isPaused: true,
          });
        }}

        onTimeUpdate={this._updateTimeHandler}

        renderPlayer={(movie, poster) => {
          const {isPlaying, isPaused} = this.state;

          return (
            <VideoPlayer
              poster={poster}
              src={movie}
              volume={1.0}
              isPlaying={isPlaying}
              isPaused={isPaused}
              onUpdateTime={this._updateTimeHandler}
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
