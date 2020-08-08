import * as React from "react";
import {Movie} from "../../types";


interface Props {
  movie: Movie,
  renderPlayer: (video: string, cover: string) => void;
  renderProgress: () => void;
  renderPlayButton: () => void;
  onFullScreenButtonClick: () => void;
  onExitVideoPlayer: () => void;
}


class CinemaScreen extends React.PureComponent<Props, {}> {
  constructor(props) {
    super(props);

    this._fullScreenButtonClickHandler = this._fullScreenButtonClickHandler.bind(this);
  }

  _fullScreenButtonClickHandler() {
    const {onFullScreenButtonClick} = this.props;
    onFullScreenButtonClick();
  }

  render() {
    const {movie, renderPlayer, renderProgress, renderPlayButton, onExitVideoPlayer} = this.props;
    const {title, video, cover} = movie;

    return (
      <div className="player">
        {renderPlayer(video, cover)}

        <button type="button" className="player__exit" onClick = {onExitVideoPlayer}>Exit</button>

        <div className="player__controls">
          {renderProgress()}

          <div className="player__controls-row">

            {renderPlayButton()}

            <div className="player__name">{title}</div>

            <button type="button" className="player__full-screen" onClick = {this._fullScreenButtonClickHandler}>
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


export default CinemaScreen;
