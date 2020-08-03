import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import {AppRoute} from "../../const.js";

class Logo extends PureComponent {
  constructor(props) {
    super(props);

    this._renderNoLink = this._renderNoLink.bind(this);
    this._renderAsLink = this._renderAsLink.bind(this);
  }

  _renderLogo() {
    return (
      <React.Fragment>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </React.Fragment>
    );
  }

  _renderNoLink() {
    const {light} = this.props;

    return (
      <a
        className = {`logo__link ${light ? `logo__link--light` : ``}`}
      >
        {this._renderLogo()}
      </a>
    );
  }

  _renderAsLink() {
    const {light} = this.props;

    return (
      <Link
        className = {`logo__link ${light ? `logo__link--light` : ``}`}
        to = {AppRoute.ROOT}
      >
        {this._renderLogo()}
      </Link>
    );
  }

  render() {
    const {isMainScreen} = this.props;

    return (
      <div className="logo">
        {isMainScreen ? this._renderNoLink() : this._renderAsLink()}
      </div>
    );
  }
}

Logo.propTypes = {
  light: PropTypes.bool,
  isMainScreen: PropTypes.bool,
};

export default Logo;
