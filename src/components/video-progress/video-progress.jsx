import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class VideoProgress extends PureComponent {
  constructor(props) {
    super(props);

  }

  _getDurationTime() {
    const {duration} = this.props;

    return duration;
  }

  _getCurrentProgress() {
    const {currentProgress, duration} = this.props;

    return duration === 0 ? 0 : Math.floor(100 * currentProgress / duration);
  }

  render() {
    return (
      <div className="player__controls-row">
        <div className="player__time">
          <progress className="player__progress" value={this._getCurrentProgress()} max="100"></progress>
          <div className="player__toggler" style={{left: `${this._getCurrentProgress()}%`}}>Toggler</div>
        </div>
        <div className="player__time-value">{this._getDurationTime()}</div>
      </div>
    );
  }
}

VideoProgress.propTypes = {
  currentProgress: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
};

export default VideoProgress;
