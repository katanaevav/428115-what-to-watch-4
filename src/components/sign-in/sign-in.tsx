import * as React from "react";
import Logo from "../logo/logo";


interface AuthData {
  login: string,
  password: string,
}

interface Props {
  onSubmit: (
    authData: AuthData,
    action: (text: any, hightlightEmail?: boolean) => void
  ) => void,
}


const EMAIL_VALIDATION_CHECK_ERROR = `Please enter a valid email address`;
const EMAIL_VALIDATION_CLASS_ERROR = `sign-in__field sign-in__field--error`;
const EMAIL_VALIDATION_CLASS = `sign-in__field`;


class SignIn extends React.PureComponent<Props, {}> {
  private emailRef: React.RefObject<HTMLInputElement>;
  private passwordRef: React.RefObject<HTMLInputElement>;
  private messageRef: React.RefObject<HTMLInputElement>;
  private emailContainerRef: React.RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);

    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.messageRef = React.createRef();
    this.emailContainerRef = React.createRef();

    this._setMessageText = this._setMessageText.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this._emailInputChageHandler = this._emailInputChageHandler.bind(this);
  }

  _testEmail(email) {
    const regExpr = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExpr.test(String(email).toLowerCase());
  }

  _setMessageText(text, hightlightEmail = false) {
    this.messageRef.current.innerHTML = text;
    if (hightlightEmail) {
      this.emailContainerRef.current.className = EMAIL_VALIDATION_CLASS_ERROR;
    }
  }

  _submitHandler(evt) {
    const {onSubmit} = this.props;

    evt.preventDefault();

    if (this._testEmail(this.emailRef.current.value)) {
      onSubmit({
        login: this.emailRef.current.value,
        password: this.passwordRef.current.value,
      }, this._setMessageText);
    } else {
      this._setMessageText(EMAIL_VALIDATION_CHECK_ERROR, true);
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

          <Logo />

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <div className="sign-in__message">
            <p ref = {this.messageRef}></p>
          </div>
          <form
            action=""
            className="sign-in__form"
          >
            <div className="sign-in__fields">
              <div ref = {this.emailContainerRef} className="sign-in__field">
                <input
                  className="sign-in__input"
                  type="email"
                  placeholder="Email address"
                  name="user-email"
                  id="user-email"
                  ref = {this.emailRef}
                  onInput = {this._emailInputChageHandler}
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" ref = {this.passwordRef} />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button
                className="sign-in__btn"
                onClick = {this._submitHandler}
              >Sign in</button>
            </div>
          </form>
        </div>

        <footer className="page-footer">

          <Logo
            light = {true}
          />

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    );
  }
}


export default SignIn;
