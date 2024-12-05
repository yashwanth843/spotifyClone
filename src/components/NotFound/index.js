import {Link} from 'react-router-dom'
import {FaArrowLeft} from 'react-icons/fa'
import Header from '../Header'
import './index.css'

const NotFound = () => (
  <div className="NotFoundContainer">
    <button type="button" className="back-button">
      <FaArrowLeft size="18" />
      Back
    </button>
    <div className="not-foundHeader">
      <Header />
    </div>
    <div className="maincontainer">
      <img
        src="https://res.cloudinary.com/dlaypemls/image/upload/v1732895381/Frame_153_dhzbg9.png"
        alt="page not found"
        className="notFound"
      />
      <h1 className="not-heading">Page Not Found</h1>
      <Link to="/">
        <button type="button" className="home-button">
          Home Page
        </button>
      </Link>
    </div>
  </div>
)
export default NotFound
