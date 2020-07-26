import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {AuthorizationStatus} from "../../const.js";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";

class UserBlock extends PureComponent {
  constructor(props) {
    super(props);
  }

  _generateUserAvatar() {
    const {avatarUrl} = this.props;

    return (
      <div className="user-block__avatar">
        <Link to={AppRoute.MY_LIST}>
          <img src={avatarUrl} alt="User avatar" width="63" height="63" />
        </Link>
      </div>
    );
  }

  _generateSignIn() {
    // const {onOpenAuthScreen} = this.props;

    return (
      <Link
        // href=""
        className="user-block__link"
        to={AppRoute.LOGIN}
        // onClick={onOpenAuthScreen}
      >Sign in</Link>
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
  avatarUrl: PropTypes.string,
};

export default UserBlock;
