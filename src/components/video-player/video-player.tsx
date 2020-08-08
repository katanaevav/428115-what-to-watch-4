import * as React from "react";


interface Props {
  poster: string,
  src: string,
  volume: number,
  isPlaying: boolean,
  isPaused: boolean,
  onUpdateTime: (currentTime: number, movieDuration: number) => void,
  onSetFullScreen: (fullScreenStatus: boolean) => void,
  isFullScreen: boolean,
}


class VideoPlayer extends React.PureComponent<Props, {}> {
  private videoRef: React.RefObject<HTMLVideoElement>;

  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentWillUnmount() {
    const video = this.videoRef.current;
    video.ontimeupdate = null;
    video.onfullscreenchange = null;
    video.src = ``;
  }

  componentDidMount() {
    const video = this.videoRef.current;
    const {onUpdateTime} = this.props;

    video.ontimeupdate = () => {
      onUpdateTime(Math.floor(video.currentTime), Math.floor(video.duration));
    };

    video.onfullscreenchange = () => {
      const {onSetFullScreen} = this.props;
      onSetFullScreen(!!document.fullscreenElement);
    };
  }

  componentDidUpdate() {
    const video = this.videoRef.current;
    const {src, volume} = this.props;

    if (this.props.isFullScreen) {
      video.requestFullscreen();
    }

    if (this.props.isPlaying && video.currentTime > 0) {
      video.play();
    } else if (this.props.isPlaying && !this.props.isPaused) {
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
        className="player__video"
        poster = {poster}
        preload="metadata"
        ref = {this.videoRef}
      >
      </video>
    );
  }
}


export default VideoPlayer;
