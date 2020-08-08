import * as React from "react";
import {AuthorizationStatus} from "../../const";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";


interface Props {
  authorizationStatus: string,
  avatarUrl?: string,
}


class UserBlock extends React.PureComponent<Props, {}> {
  constructor(props) {
    super(props);
  }

  _generateUserAvatar() {
    const {avatarUrl} = this.props;

    return (
      <div className="user-block__avatar">
        <Link to = {AppRoute.MY_LIST}>
          <img src = {avatarUrl} alt="User avatar" width="63" height="63" />
        </Link>
      </div>
    );
  }

  _generateSignIn() {
    return (
      <Link
        className="user-block__link"
        to = {AppRoute.LOGIN}
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


export default UserBlock;
