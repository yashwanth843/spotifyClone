import {useState} from 'react'
import './index.css'

const AlbumItems = props => {
  const [playSong, setSong] = useState()
  const {albumDetails} = props
  const {imageUrl, songName, singerName, durationMs, songUrl} = albumDetails

  const formatDuration = milliseconds => {
    const minutes = Math.floor(milliseconds / 60000)
    const seconds = Math.floor((milliseconds % 60000) / 1000)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }
  const duration = formatDuration(durationMs)

  const onClickSong = () => {
    if (playSong === songUrl) {
      setSong()
    } else {
      setSong(songUrl)
    }
  }

  const isSong = playSong === songUrl

  return (
    <li className="albumItemSongs">
      <div
        className="song-name-container"
        onClick={onClickSong}
        role="button"
        tabIndex="0"
      >
        <h5 className="songName">{songName}</h5>
        <p className="songSinger">{singerName}</p>
      </div>
      <div className="durationContainer">
        <p className="durationTime">{duration}</p>
        <p className="popularity">{singerName}</p>
      </div>
      {isSong && (
        <div className="AudioContainer">
          <img src={imageUrl} alt="playSong" className="songImage" />
          <audio src={playSong} controls className="song">
            <track kind="captions" srcLang="en" label="English captions" />
          </audio>
        </div>
      )}
    </li>
  )
}

export default AlbumItems
