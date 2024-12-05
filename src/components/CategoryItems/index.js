import {Link} from 'react-router-dom'
import './index.css'

const CategoryItems = props => {
  const {categorieData} = props
  const {id, name, icons} = categorieData

  const {url} = icons[0]
  return (
    <li className="categorieListContainer">
      <Link to={`/category/${id}/playlists`}>
        <img src={url} alt="category" className="categorieImage" />
      </Link>
      <h1 className="categorietext">{name}</h1>
    </li>
  )
}

export default CategoryItems
