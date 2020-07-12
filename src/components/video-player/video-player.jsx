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
    this._videoRef.current.src = ``;
  }

  componentDidMount() {
    const video = this._videoRef.current;

    video.ontimeupdate = () => {
      console.log(Math.floor(video.currentTime), Math.floor(video.duration));
    };
  }

  componentDidUpdate() {
    const video = this._videoRef.current;
    const {src, volume} = this.props;

    if (this.props.isPlaying) {
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
        width="280"
        height="175"
        poster={poster}
        preload="metadata"
        ref={this._videoRef}
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
};

export default VideoPlayer;
