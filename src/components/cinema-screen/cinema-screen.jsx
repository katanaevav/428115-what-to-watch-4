import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class CinemaScreen extends PureComponent {
  constructor(props) {
    super(props);

    this._fullScreenButtonClickHandler = this._fullScreenButtonClickHandler.bind(this);
  }

  _fullScreenButtonClickHandler() {
    const {onFullScreenButtonClick} = this.props;
    onFullScreenButtonClick();
  }

  render() {
    const {movie, renderPlayer, renderProgress, renderPlayButton} = this.props;
    const {title, video, bigPoster} = movie;

    return (
      <div className="player">
        {renderPlayer(video, bigPoster)}

        <button type="button" className="player__exit">Exit</button>

        <div className="player__controls">
          {renderProgress()}

          <div className="player__controls-row">

            {renderPlayButton()}

            <div className="player__name">{title}</div>

            <button type="button" className="player__full-screen" onClick={this._fullScreenButtonClickHandler}>
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="/sprite.svg#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

CinemaScreen.propTypes = {
  movie: PropTypes.object.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  renderProgress: PropTypes.func.isRequired,
  renderPlayButton: PropTypes.func.isRequired,
  onFullScreenButtonClick: PropTypes.func.isRequired,
};

export default CinemaScreen;
