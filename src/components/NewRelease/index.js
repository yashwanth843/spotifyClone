import {Component} from 'react'
import Cookies from 'js-cookie'
import NewReleaseLists from '../NewReleaseLists'
import './index.css'

const apiStatusContant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class NewRelease extends Component {
  state = {newReleaseData: [], apiStatus: apiStatusContant.initial}

  componentDidMount() {
    this.getNewReleaseData()
  }

  getNewReleaseData = async () => {
    this.setState({apiStatus: apiStatusContant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis2.ccbp.in/spotify-clone/new-releases'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedNewData = data.albums.items.map(eachNew => ({
        albumType: eachNew.album_type,
        artists: eachNew.artists,
        availableMarkets: eachNew.available_markets,
        externalUrls: eachNew.external_urls,
        href: eachNew.href,
        id: eachNew.id,
        images: eachNew.images,
        name: eachNew.name,
        releaseDate: eachNew.release_date,
        releaseDatePrecision: eachNew.release_date_precision,
        totalTracks: eachNew.total_tracks,
        type: eachNew.type,
        url: eachNew.uri,
      }))
      this.setState({
        newReleaseData: updatedNewData,
        apiStatus: apiStatusContant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusContant.failure})
    }
  }

  renderNewReleaseView = () => {
    const {newReleaseData} = this.state
    return (
      <ul className="new-release-container">
        {newReleaseData.map(each => (
          <NewReleaseLists newReleaseData={each} key={each.id} />
        ))}
      </ul>
    )
  }

  onClickRetry = () => {
    this.getNewReleaseData()
  }

  renderNewFailureView = () => (
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

  renderNewLoadingView = () => (
    <div className="home-loading-container" data-testid="loader">
      <img
        src="https://res.cloudinary.com/dlaypemls/image/upload/v1732184809/Vector_kflop7.png"
        alt="loader"
        className="loader-image"
      />
      <p className="loader-text">Loading...</p>
    </div>
  )

  renderNewResultView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContant.success:
        return this.renderNewReleaseView()
      case apiStatusContant.failure:
        return this.renderNewFailureView()
      case apiStatusContant.inProgress:
        return this.renderNewLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="newReleaseContainer">
        <h5 className="newRelease-heading">New Releases</h5>
        <div className="new-containter">{this.renderNewResultView()}</div>
      </div>
    )
  }
}

export default NewRelease
