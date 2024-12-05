import {Component} from 'react'
import {FaArrowLeft} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Header from '../Header'
import AlbumItems from '../AlbumItems'
import './index.css'

const apiStatusContant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AlbumDetails extends Component {
  state = {albumData: {}, apiStatus: apiStatusContant.initial}

  componentDidMount() {
    this.getAlbumData()
  }

  onClickBack = () => {
    const {history} = this.props
    history.replace('/')
  }

  onClickRetry = () => {
    this.getAlbumData()
  }

  getAlbumData = async () => {
    this.setState({apiStatus: apiStatusContant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const urlAlbum = `https://apis2.ccbp.in/spotify-clone/album-details/${id}`
    const options = {
      methods: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(urlAlbum, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        id: data.id,
        name: data.name,
        singerName: data.artists[0].name,
        label: data.label,
        imageUrl: data.images[0].url,
        durationMs: data.tracks.items[0].duration_ms,
        songName: data.tracks.items[0].name,
        songUrl: data.tracks.items[0].preview_url,
        popularity: data.popularity,
      }
      this.setState({
        albumData: updatedData,
        apiStatus: apiStatusContant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusContant.failure})
    }
  }

  renderAlbumSuccess = () => {
    const {albumData} = this.state
    return (
      <div className="AlbumDetailsContainer">
        <button
          type="button"
          className="back-button2"
          onClick={this.onClickBack}
        >
          <FaArrowLeft size="18" />
          Back
        </button>
        <div className="imageContainer">
          <img src={albumData.imageUrl} alt="album" className="album-image" />
          <div className="album-text-container">
            <h5 className="album-release-heading">New Releases</h5>
            <h1 className="album-name">{albumData.name}</h1>
            <p className="album-text-name">{albumData.singerName}</p>
          </div>
        </div>
        <div className="tracksContainer">
          <p className="track">Track</p>
          <p className="track">Time</p>
          <p className="track">Artist</p>
        </div>
        <hr className="albumLine" />
        <ul className="album-song-container">
          <AlbumItems albumDetails={albumData} key={albumData.id} />
        </ul>
      </div>
    )
  }

  renderAlbumLoading = () => (
    <div className="albumLoadingContainer" data-testid="loader">
      <img
        src="https://res.cloudinary.com/dlaypemls/image/upload/v1732184809/Vector_kflop7.png"
        alt="loader"
        className="loader-image"
      />
      <p className="loader-text">Loading...</p>
    </div>
  )

  renderAlbumFailure = () => (
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

  renderAlbumResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContant.success:
        return this.renderAlbumSuccess()
      case apiStatusContant.inProgress:
        return this.renderAlbumLoading()
      case apiStatusContant.failure:
        return this.renderAlbumFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="headerContainers">
          <Header />
        </div>
        <div className="resultContainer">{this.renderAlbumResult()}</div>
      </>
    )
  }
}

export default AlbumDetails
