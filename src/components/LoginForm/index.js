import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    isShowError: false,
    errorMsg: '',
  }

  submitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitFailure = errorMsg => {
    this.setState({isShowError: true, errorMsg})
  }

  onChangeName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  render() {
    const {isShowError, errorMsg, username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="loginFormContainer">
        <form className="loginFormCardContainer" onSubmit={this.submitForm}>
          <div className="loginLogoContainer">
            <img
              className="loginLogo"
              src="https://res.cloudinary.com/dlaypemls/image/upload/v1732184809/Vector_kflop7.png"
              alt="login website logo"
            />
            <h1 className="logoHeading">Spotify Remix</h1>
            <div className="userInfoContainer">
              <label className="label-name" htmlFor="username">
                USERNAME
              </label>
              <input
                className="userName"
                type="text"
                id="username"
                onChange={this.onChangeName}
                value={username}
              />
            </div>
            <div className="userInfoContainer">
              <label className="label-name" htmlFor="password">
                PASSWORD
              </label>
              <input
                className="userName"
                type="password"
                id="password"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>
            <button className="loginButton" type="submit">
              Login
            </button>
            {isShowError && <p className="errorMsg">{errorMsg}</p>}
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm
