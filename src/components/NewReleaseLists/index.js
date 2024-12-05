import {Link} from 'react-router-dom'
import './index.css'

const NewReleaseLists = props => {
  const {newReleaseData} = props
  const {id, images, name} = newReleaseData
  const {url} = images[0]
  return (
    <li className="newLists">
      <Link to={`/album/${id}`}>
        <img src={url} alt="new release albums" className="new-images" />
      </Link>
      <p className="new-text">{name}</p>
    </li>
  )
}

export default NewReleaseLists
