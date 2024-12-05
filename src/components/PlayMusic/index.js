import {useState} from 'react'
import moment from 'moment'
import './index.css'

const PlayMusic = props => {
  const [playSong, setSong] = useState()
  const {musicDetails} = props
  const {name, artists, durationMs, previewUrl, album, addedAt} = musicDetails
  const {url} = album.images[0]
  const formatDuration = milliseconds => {
    const minutes = Math.floor(milliseconds / 60000)
    const seconds = Math.floor((milliseconds % 60000) / 1000)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }
  const duration = formatDuration(durationMs)
  const RelativeTimeDisplay = dateString => {
    const relativeTime = moment(dateString).fromNow()
    return relativeTime
  }

  const ago = RelativeTimeDisplay(addedAt)

  const onClickSong = () => {
    if (playSong === previewUrl) {
      setSong()
    } else {
      setSong(previewUrl)
    }
  }

  const isSong = playSong === previewUrl

  return (
    <li className="playListContainer">
      <div type="button" className="spotifySongContainer">
        <div
          className="songContainer"
          onClick={onClickSong}
          role="button"
          tabIndex="0"
        >
          <h5 type="button" className="spotifySong">
            {name}
          </h5>
          <p className="spotifySinger">{artists[0].name}</p>
        </div>
        <p className="spotifySongDuration">{duration}</p>
      </div>
      <p className="spptifyMovie">{album.name}</p>
      <p className="spptifyAgo">{ago}</p>
      {isSong && (
        <div className="AudioContainer">
          <img src={url} alt="song" className="songImage" />
          <audio src={playSong} controls className="song">
            <track kind="captions" srcLang="en" label="English captions" />
          </audio>
        </div>
      )}
    </li>
  )
}

export default PlayMusic
