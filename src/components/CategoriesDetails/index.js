import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaArrowLeft} from 'react-icons/fa'
import Header from '../Header'
import CategoriesList from '../CategoriesList'
import './index.css'

const apiStatusContant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CategoriesDetails extends Component {
  state = {categoriesData: {}, apiStatus: apiStatusContant.initial}

  componentDidMount() {
    this.getCategoriesData()
  }

  getCategoriesData = async () => {
    this.setState({apiStatus: apiStatusContant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis2.ccbp.in/spotify-clone/category-playlists/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedData = data.playlists.items.map(eachItem => ({
        id: eachItem.id,
        description: eachItem.description,
        imageUrl: eachItem.images[0].url,
        name: eachItem.name,
        total: eachItem.tracks.total,
      }))
      this.setState({
        categoriesData: updatedData,
        apiStatus: apiStatusContant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusContant.failure})
    }
  }

  onClickBack1 = () => {
    const {history} = this.props
    history.replace('/')
  }

  renderCategorySuccessView = () => {
    const {categoriesData} = this.state

    return (
      <div className="categoriesContainer">
        <button
          type="button"
          className="back-button1"
          onClick={this.onClickBack1}
        >
          <FaArrowLeft size="18" />
          Back
        </button>

        <ul className="categoriesDataUl">
          {categoriesData.map(eachItem => (
            <CategoriesList details={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingViews = () => (
    <div className="play-loading-container" data-testid="loader">
      <img
        src="https://res.cloudinary.com/dlaypemls/image/upload/v1732184809/Vector_kflop7.png"
        alt="loader"
        className="loader-image"
      />
      <p className="loader-text">Loading...</p>
    </div>
  )

  renderResultCategory = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContant.success:
        return this.renderCategorySuccessView()
      case apiStatusContant.inProgress:
        return this.renderLoadingViews()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="categoriesDetails">
        <div className="header-container2">
          <Header />
        </div>
        <div className="categoriesMainContainer">
          {this.renderResultCategory()}
        </div>
      </div>
    )
  }
}

export default CategoriesDetails
