import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {AuthorizationStatus} from "../../const.js";

class UserBlock extends PureComponent {
  constructor(props) {
    super(props);
  }

  _generateUserAvatar() {
    return (
      <div className="user-block__avatar">
        <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
      </div>
    );
  }

  _generateSignIn() {
    const {onOpenAuthScreen} = this.props;

    return (
      <a
        href="#"
        className="user-block__link"
        onClick={onOpenAuthScreen}
      >Sign in</a>
    );
  }

  render() {
    const {authorizationStatus} = this.props;

    return (
      <div className="user-block">
        {authorizationStatus === AuthorizationStatus.NO_AUTH ? this._generateSignIn() : this._generateUserAvatar()}
      </div>
    );
  }
}

UserBlock.propTypes = {
  onOpenAuthScreen: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

export default UserBlock;
