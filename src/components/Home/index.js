import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import HomePlayList from '../HomePlayList'
import Categories from '../Categories'
import NewRelease from '../NewRelease'
import Header from '../Header'
import './index.css'

const apiStatusContant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {apiStatus: apiStatusContant.initial, spotifyData: []}

  componentDidMount() {
    this.getSpotifyData()
  }

  getSpotifyData = async () => {
    this.setState({apiStatus: apiStatusContant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis2.ccbp.in/spotify-clone/featured-playlists'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.playlists?.items.map(each => ({
        collabrative: each.collaborative,
        description: each.description,
        externalUrls: each.external_urls,
        id: each.id,
        images: each.images,
        name: each.name,
        owner: each.owner,
        primaryColor: each.primary_color,
        public: each.public,
        snapshortId: each.snapshot_id,
        tracks: each.tracks,
        type: each.type,
        url: each.uri,
      }))
      this.setState({
        apiStatus: apiStatusContant.success,
        spotifyData: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusContant.failure})
    }
  }

  onClickRetry = () => {
    this.getSpotifyData()
  }

  renderSuccessView = () => {
    const {spotifyData} = this.state
    return (
      <ul className="playlistContainer">
        {spotifyData.map(eachItems => (
          <HomePlayList playlistsDetails={eachItems} key={eachItems.id} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dlaypemls/image/upload/v1732531817/alert-triangle_imousq.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button className="trybutton" onClick={this.onClickRetry} type="button">
        Try Again
      </button>
    </div>
  )

  renderHomeLoading = () => (
    <div className="home-loading-container" data-testid="loader">
      <img
        src="https://res.cloudinary.com/dlaypemls/image/upload/v1732184809/Vector_kflop7.png"
        alt="loader"
        className="loader-image"
      />
      <p className="loader-text">Loading...</p>
    </div>
  )

  renderHomeResultView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContant.success:
        return this.renderSuccessView()
      case apiStatusContant.failure:
        return this.renderFailureView()
      case apiStatusContant.inProgress:
        return this.renderHomeLoading()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <div className="HomeContainer">
          <Header />
          <div className="HomeContainer1">
            <h5 className="home-heading">Editors Picks</h5>
            {this.renderHomeResultView()}
            <Categories />
            <NewRelease />
          </div>
        </div>
      </>
    )
  }
}

export default Home
