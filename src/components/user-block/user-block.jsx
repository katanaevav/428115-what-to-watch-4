import React, {PureComponent} from "react";

class UserBlock extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="user-block">
        <div className="user-block__avatar">
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
        </div>
      </div>
    );
  }
}

UserBlock.propTypes = {};

export default UserBlock;
