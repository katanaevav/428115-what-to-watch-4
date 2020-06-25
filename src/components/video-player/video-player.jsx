import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();

    this.state = {
      isPlaying: props.isPlaying,
      isPaused: props.isPaused,
    };
  }

  componentDidMount() {
    const video = this._videoRef.current;

    if (video) {
      video.onplay = () => {
        this.setState({
          isPlaying: true,
          isPaused: false,
        });
      };

      video.onpause = () => this.setState({
        isPlaying: false,
        isPaused: true,
      });
    }
  }

  componentWillUnmount() {
    const video = this._videoRef.current;
    video.onloadedmetadata = null;
    video.onplay = null;
    video.onpause = null;
    video.src = ``;
  }

  componentDidUpdate() {
    const video = this._videoRef.current;
    const {preview, volume} = this.props;

    if (this.props.isPlaying) {
      video.src = preview;
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
        width="auto"
        height="100%"
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
  isPaused: PropTypes.bool.isRequired,
};

export default VideoPlayer;
