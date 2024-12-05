import {Link} from 'react-router-dom'
import './index.css'

const HomePlayList = props => {
  const {playlistsDetails} = props
  const {id, images, name} = playlistsDetails
  return (
    <li className="lists">
      <Link to={`/playlist/${id}`} className="link">
        <img src={images[0].url} className="images" alt="featured playlist" />
      </Link>
      <p className="image-name">{name}</p>
    </li>
  )
}

export default HomePlayList
