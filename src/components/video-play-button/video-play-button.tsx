import * as React from "react";


interface Props {
  onPlayButtonClick: () => void;
  isPlaying: boolean;
}


class VideoPlayButton extends React.PureComponent<Props, {}> {
  constructor(props) {
    super(props);

    this._renderPlayButton = this._renderPlayButton.bind(this);
  }

  _renderPlayButton(isPlaying) {
    const playButton = (
      <React.Fragment>
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="/sprite.svg#play-s"></use>
        </svg>
        <span>Play</span>
      </React.Fragment>
    );

    const pauseButton = (
      <React.Fragment>
        <svg viewBox="0 0 14 21" width="14" height="21">
          <use xlinkHref="/sprite.svg#pause"></use>
        </svg>
        <span>Pause</span>
      </React.Fragment>
    );

    return isPlaying ? pauseButton : playButton;
  }

  render() {
    const {onPlayButtonClick, isPlaying} = this.props;
    return (
      <button
        type="button"
        className="player__play"
        onClick = {onPlayButtonClick}
      >
        {this._renderPlayButton(isPlaying)}
      </button>
    );
  }
}


export default VideoPlayButton;
