import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();
  }

  render() {
    const {poster, preview, volume, delayBeforePlay} = this.props;
    let startPlaying = false;

    return (
      <div
        className="small-movie-card__image"
        onMouseOver={() => {
          startPlaying = true;
          setTimeout(() => {
            if (startPlaying) {
              const video = this._videoRef.current;
              video.src = preview;
              video.volume = volume;
              video.onloadedmetadata = () => video.play();
            }
          }, delayBeforePlay);
        }}
        onMouseOut={() => {
          startPlaying = false;
          const video = this._videoRef.current;
          video.src = ``;
        }}
      >
        <video
          width="280"
          height="175"
          poster={poster}
          preload="metadata"
          ref={this._videoRef}
        >
        </video>
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  poster: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  volume: PropTypes.number.isRequired,
  delayBeforePlay: PropTypes.number.isRequired,
};

export default VideoPlayer;
