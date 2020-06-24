import React, {PureComponent} from "react";
import PropTypes from "prop-types";

// const SMALL_CARD_SIZE = `width="280" height="175"`;

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

  }

  render() {
    const {poster, previews} = this.props;

    return (
      <video width="280" height="175" poster={poster}>
        {previews.map((preview) => (
          <source key={preview.src} src={preview.src} type={preview.type} />
        ))}
      </video>
    );
  }
}

VideoPlayer.propTypes = {
  poster: PropTypes.string.isRequired,
  previews: PropTypes.array,
};

export default VideoPlayer;
