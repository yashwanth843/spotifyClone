import {Component} from 'react'
import Cookies from 'js-cookie'
import CategoryItems from '../CategoryItems'
import './index.css'

const apiStatusContant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Categories extends Component {
  state = {categorieData: [], apiStatus: apiStatusContant.initial}

  componentDidMount() {
    this.getCategorieData()
  }

  getCategorieData = async () => {
    this.setState({apiStatus: apiStatusContant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis2.ccbp.in/spotify-clone/categories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedCategories = data.categories.items.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        icons: eachItem.icons,
      }))
      this.setState({
        apiStatus: apiStatusContant.success,
        categorieData: updatedCategories,
      })
    } else {
      this.setState({apiStatus: apiStatusContant.failure})
    }
  }

  renderCategorieySuccess = () => {
    const {categorieData} = this.state
    return (
      <ul className="categoriesmainList">
        {categorieData.map(eachItem => (
          <CategoryItems categorieData={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  onClickRetry = () => {
    this.getCategorieData()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dlaypemls/image/upload/v1732531817/alert-triangle_imousq.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button type="button" className="trybutton" onClick={this.onClickRetry}>
        Try Again
      </button>
    </div>
  )

  renderCategoryLoading = () => (
    <div className="home-loading-container" data-testid="loader">
      <img
        src="https://res.cloudinary.com/dlaypemls/image/upload/v1732184809/Vector_kflop7.png"
        alt="loader"
        className="loader-image"
      />
      <p className="loader-text">Loading...</p>
    </div>
  )

  renderCategoriesResultView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContant.success:
        return this.renderCategorieySuccess()
      case apiStatusContant.failure:
        return this.renderFailureView()
      case apiStatusContant.inProgress:
        return this.renderCategoryLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="categoriesContainer">
        <h1 className="categories-heading">Genres & Moods</h1>
        <div className="category-containter">
          {this.renderCategoriesResultView()}
        </div>
      </div>
    )
  }
}

export default Categories
