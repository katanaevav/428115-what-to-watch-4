import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

const EMAIL_VALIDATION_CHECK_ERROR = `Please enter a valid email address`;
const EMAIL_VALIDATION_CLASS_ERROR = `sign-in__field sign-in__field--error`;
const EMAIL_VALIDATION_CLASS = `sign-in__field`;

class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this.emailRef = createRef();
    this.passwordRef = createRef();
    this.messageRef = createRef();
    this.emailContainerRef = createRef();

    this._generateMessageText = this._generateMessageText.bind(this);
    this._submitButtonClickHandler = this._submitButtonClickHandler.bind(this);
    this._emailInputChageHandler = this._emailInputChageHandler.bind(this);
  }

  _testEmail(email) {
    const regExpr = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExpr.test(String(email).toLowerCase());
  }

  _generateMessageText() {
    const {message} = this.props;

    return (
      <div className="sign-in__message">
        <p ref={this.messageRef}>{message}</p>
      </div>
    );
  }

  _submitButtonClickHandler(evt) {
    const {onSubmit} = this.props;

    evt.preventDefault();

    if (this._testEmail(this.emailRef.current.value)) {
      onSubmit({
        login: this.emailRef.current.value,
        password: this.passwordRef.current.value,
      });
    } else {
      this.messageRef.current.innerHTML = EMAIL_VALIDATION_CHECK_ERROR;
      this.emailContainerRef.current.className = EMAIL_VALIDATION_CLASS_ERROR;
    }
  }

  _emailInputChageHandler() {
    this.messageRef.current.innerHTML = ``;
    this.emailContainerRef.current.className = EMAIL_VALIDATION_CLASS;
  }

  render() {

    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <a href="main.html" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          {this._generateMessageText()}
          <form
            action=""
            className="sign-in__form"
          >
            <div className="sign-in__fields">
              <div ref={this.emailContainerRef} className="sign-in__field">
                <input
                  className="sign-in__input"
                  type="email"
                  placeholder="Email address"
                  name="user-email"
                  id="user-email"
                  ref={this.emailRef}
                  onInput={this._emailInputChageHandler}
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" ref={this.passwordRef} />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button
                className="sign-in__btn"
                onClick={this._submitButtonClickHandler}
              >Sign in</button>
            </div>
          </form>
        </div>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    );
  }
}

SignIn.propTypes = {
  message: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default SignIn;
