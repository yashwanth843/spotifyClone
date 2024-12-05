import {useState} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoReorderThree} from 'react-icons/io5'
import {AiOutlineLogout} from 'react-icons/ai'
import './index.css'

const Header = props => {
  const {history} = props
  const [isShow, setShow] = useState(false)
  const onClickBarButton = () => {
    setShow(prevState => !prevState)
  }
  const onClickLogoutButton = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="header-container">
      <Link to="/" className="logo-link">
        <img
          src="https://res.cloudinary.com/dlaypemls/image/upload/v1732184809/Vector_kflop7.png"
          alt="website logo"
          className="website logo"
        />
      </Link>
      <div className="logoutContainer">
        <button className="button-bar" onClick={onClickBarButton} type="button">
          <IoReorderThree size="25" />
        </button>
        {isShow ? (
          <button
            className="logout"
            onClick={onClickLogoutButton}
            type="button"
          >
            <AiOutlineLogout size="20" />
            Logout
          </button>
        ) : (
          ''
        )}
      </div>
      <button className="logout1" onClick={onClickLogoutButton} type="button">
        <AiOutlineLogout size="20" />
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
