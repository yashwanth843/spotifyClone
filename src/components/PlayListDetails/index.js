import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaArrowLeft} from 'react-icons/fa'
import Header from '../Header'
import PlayMusic from '../PlayMusic'
import './index.css'

const apiStatusContant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class PlayListDetails extends Component {
  state = {
    playListData: [],
    apiStatus: apiStatusContant.initial,
    musicInfo: {},
  }

  componentDidMount() {
    this.getPlayListDetailsData()
  }

  getPlayListDetailsData = async () => {
    this.setState({apiStatus: apiStatusContant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis2.ccbp.in/spotify-clone/playlists-details/${id}`
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
      const {description, name, images, followers, tracks} = data
      const {items} = tracks
      const {track} = items[0]
      const {album} = track
      const {artists} = album
      const info = {description, name, images, followers, artists}
      const updatedPlayList = data.tracks.items.map(eachItem => ({
        addedAt: eachItem.added_at,
        artists: eachItem.track.artists,
        durationMs: eachItem.track.duration_ms,
        name: eachItem.track.name,
        popularity: eachItem.track.popularity,
        previewUrl: eachItem.track.preview_url,
        trackNumber: eachItem.track.track_number,
        album: eachItem.track.album,
      }))
      this.setState({
        playListData: updatedPlayList,
        musicInfo: info,
        apiStatus: apiStatusContant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusContant.failure})
    }
  }

  onClickBack = () => {
    const {history} = this.props
    history.replace('/')
  }

  onClickRetry = () => {
    this.getPlayListDetailsData()
  }

  renderPlayListSuccessView = () => {
    const {musicInfo, playListData} = this.state
    const {images, description, name} = musicInfo
    const {url} = images[0]
    console.log(musicInfo)
    return (
      <div className="play-list-container">
        <button
          type="button"
          className="back-button"
          onClick={this.onClickBack}
        >
          <FaArrowLeft size="18" />
          Back
        </button>
        <div className="play-intro-container">
          <div className="image-container">
            <img src={url} alt="images" className="play-image" />
            <div className="textContainer">
              <h5 className="picker">Editors picks</h5>
              <h1 className="description">{description}</h1>
              <p className="songType">{name}</p>
            </div>
          </div>
        </div>
        <div className="large-list">
          <h6 className="list-heading">Track</h6>
          <h6 className="list-heading">Artist</h6>
          <h6 className="list-heading">Time</h6>
          <h6 className="list-heading">Album</h6>
          <h6 className="list-heading">Added</h6>
        </div>
        <div>
          <hr className="line" />
        </div>
        <ul className="musicLists">
          {playListData.map(eachItem => (
            <PlayMusic musicDetails={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="play-loading-container" data-testid="loader">
      <img
        src="https://res.cloudinary.com/dlaypemls/image/upload/v1732184809/Vector_kflop7.png"
        alt="loader"
        className="loader-image"
      />
      <p className="loader-text">Loading...</p>
    </div>
  )

  renderPlayListFailure = () => (
    <div className="failureContainer">
      <button type="button" className="back-button1" onClick={this.onClickBack}>
        <FaArrowLeft size="18" />
        Back
      </button>
      <div className="playListFailure">
        <img
          src="https://res.cloudinary.com/dlaypemls/image/upload/v1732531817/alert-triangle_imousq.png"
          alt="failure view"
          className="failure-image-playList"
        />
        <p className="failure-text-playList">
          Something went wrong. Please try again
        </p>
        <button
          className="trybutton-playList"
          onClick={this.onClickRetry}
          type="button"
        >
          Try Again
        </button>
      </div>
    </div>
  )

  renderPlayListResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContant.success:
        return this.renderPlayListSuccessView()
      case apiStatusContant.inProgress:
        return this.renderLoadingView()
      case apiStatusContant.failure:
        return this.renderPlayListFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="playlistsContainer">
        <div className="header-container1">
          <Header />
        </div>
        <div className="music-container">{this.renderPlayListResult()}</div>
      </div>
    )
  }
}

export default PlayListDetails
