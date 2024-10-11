import { Component } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { withRouter } from "../../components/withRouter/withRouter"; // Import your withRouter HOC
import "./index.css";

class Login extends Component {
  state = {
    username: "",
    password: "",
    showError: false,
    errorMsg: "",
  };

  onSubmitSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30, path: "/" });
    this.props.navigate("/"); // Now you can use navigate!
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ errorMsg, showError: true });
  };

  submitCredentials = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const userdetails = { username, password };
    const options = {
      method: "POST",
      body: JSON.stringify(userdetails),
    };
    const response = await fetch("https://apis.ccbp.in/login", options);
    const data = await response.json();
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token);
    } else {
      this.onSubmitFailure(data.error_msg);
    }
  };

  onChangeUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    const { username, password, showError, errorMsg } = this.state;
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
      return <Navigate to="/" replace />;
    }

    return (
      <div className="login-main-container">
        <img
          src="https://res.cloudinary.com/dr5hjrycv/image/upload/v1720260111/Illustration_tk2xzm.jpg"
          className="login-image-large"
          alt="website login"
        />
        <form
          className="login-form-container"
          onSubmit={this.submitCredentials}
        >
          <img
            src="https://res.cloudinary.com/dr5hjrycv/image/upload/v1728637846/instagram_rpbabt.png"
            alt="website logo"
            className="website-logo"
          />
          <h1 className="insta-share">Insta Share</h1>

          <div className="input-label-container">
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              id="username"
              className="input"
              onChange={this.onChangeUsername}
              value={username}
            />
          </div>

          <div className="input-label-container">
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              id="password"
              className="input"
              type="password"
              onChange={this.onChangePassword}
              value={password}
            />
          </div>

          {showError && <p className="error-msg">{errorMsg}</p>}
          <button type="submit" className="login">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(Login); // Wrap with withRouter
