import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();
  }

  componentWillUnmount() {
    this._videoRef.current.src = ``;
  }

  componentDidUpdate() {
    const video = this._videoRef.current;
    const {preview, volume} = this.props;

    if (this.props.isPlaying) {
      video.src = preview;
      video.volume = volume;
      video.onloadedmetadata = () => video.play();
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
  preview: PropTypes.string.isRequired,
  volume: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default VideoPlayer;
