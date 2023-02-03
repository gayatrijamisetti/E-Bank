import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {NavBarContainer, HeaderLogo, LogoutButton} from './styledComponents'

const Header = props => {
  const onClickButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }
  return (
    <>
      <NavBarContainer>
        <HeaderLogo
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
        <LogoutButton type="button" onClick={onClickButton}>
          Logout
        </LogoutButton>
      </NavBarContainer>
    </>
  )
}

export default withRouter(Header)
