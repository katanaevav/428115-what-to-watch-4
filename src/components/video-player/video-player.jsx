import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";


class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();
  }

  componentWillUnmount() {
    const video = this._videoRef.current;
    video.ontimeupdate = null;
    video.onfullscreenchange = null;
    video.src = ``;
  }

  componentDidMount() {
    const video = this._videoRef.current;
    const {onUpdateTime} = this.props;

    video.ontimeupdate = () => {
      onUpdateTime(Math.floor(video.currentTime), Math.floor(video.duration));
    };

    video.onfullscreenchange = () => {
      const {onSetFullScreen} = this.props;
      onSetFullScreen(!!document.fullscreenElement);
    };
  }

  componentDidUpdate() {
    const video = this._videoRef.current;
    const {src, volume} = this.props;

    if (this.props.isFullScreen) {
      video.requestFullscreen();
    }

    if (this.props.isPlaying && video.currentTime > 0) {
      video.play();
    } else if (this.props.isPlaying && !this.props.isPaused) {
      video.src = src;
      video.volume = volume;
      video.onloadedmetadata = () => video.play();
    } else if (!this.props.isPlaying && this.props.isPaused) {
      video.pause();
    } else {
      video.src = ``;
    }
  }

  render() {
    const {poster} = this.props;

    return (
      <video
        className="player__video"
        poster = {poster}
        preload="metadata"
        ref = {this._videoRef}
      >
      </video>
    );
  }
}


VideoPlayer.propTypes = {
  poster: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  volume: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isPaused: PropTypes.bool.isRequired,
  onUpdateTime: PropTypes.func.isRequired,
  onSetFullScreen: PropTypes.func.isRequired,
  isFullScreen: PropTypes.bool.isRequired,
};


export default VideoPlayer;
