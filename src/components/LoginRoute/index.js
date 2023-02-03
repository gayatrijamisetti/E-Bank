import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {
  BgContainer,
  LoginCardContainer,
  LoginImage,
  FormContainer,
  LoginHeading,
  InputContainer,
  LoginButton,
  ErrorMsg,
  Label,
  Input,
} from './styledComponents'

class LoginRoute extends Component {
  state = {
    userInput: '',
    passwordInput: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUserInput = event => {
    this.setState({userInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      showSubmitError: true,
      errorMsg,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userInput, passwordInput} = this.state
    const userDetails = {user_id: userInput, pin: passwordInput}
    const apiUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUserIdField = () => {
    const {userInput} = this.state

    return (
      <>
        <Label htmlFor="userId">User ID</Label>
        <Input
          type="text"
          id="userId"
          value={userInput}
          placeholder="Enter User ID"
          onChange={this.onChangeUserInput}
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {passwordInput} = this.state

    return (
      <>
        <Label htmlFor="passwordId">PIN</Label>
        <Input
          type="password"
          id="passwordId"
          value={passwordInput}
          placeholder="Enter PIN"
          onChange={this.onChangePasswordInput}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <BgContainer>
        <LoginCardContainer>
          <LoginImage
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
          />
          <FormContainer onSubmit={this.onSubmitForm}>
            <LoginHeading>Welcome Back!</LoginHeading>
            <InputContainer>{this.renderUserIdField()}</InputContainer>
            <InputContainer>{this.renderPasswordField()}</InputContainer>
            <LoginButton type="submit">Login</LoginButton>
            {showSubmitError && <ErrorMsg>{errorMsg}</ErrorMsg>}
          </FormContainer>
        </LoginCardContainer>
      </BgContainer>
    )
  }
}

export default LoginRoute
