import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const SECONDS_IN_HOUR = 3600;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;
const MAX_DURATION_IN_PERCENT = 100;

class VideoProgress extends PureComponent {
  constructor(props) {
    super(props);

  }

  _getDurationTime() {
    const {currentProgress, duration} = this.props;
    const timeLeft = duration - currentProgress;

    const hours = Math.floor(timeLeft / SECONDS_IN_HOUR);
    const minutes = Math.floor(timeLeft / SECONDS_IN_MINUTE) - (hours * MINUTES_IN_HOUR);
    const seconds = timeLeft - (minutes * SECONDS_IN_MINUTE);
    return `${hours > 0 ? `${hours}:` : ``}${minutes > 0 ? `${minutes}:` : ``}${seconds > 0 ? `${seconds}` : ``}`;
  }

  _getCurrentProgress() {
    const {currentProgress, duration} = this.props;

    return duration === 0 ? 0 : Math.floor(MAX_DURATION_IN_PERCENT * currentProgress / duration);
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
