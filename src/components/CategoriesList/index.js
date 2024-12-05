import './index.css'

const CategoriesList = props => {
  const {details} = props
  const {description, imageUrl, name, total} = details
  console.log(description)

  return (
    <li className="list-container">
      <div className="largeContainer">
        <img src={imageUrl} alt="imageCategeory" className="CategorieImage" />
        <div className="CategorieTextContainer">
          <p className="categorieName">{name}</p>
          <p className="categoriedescription">{description}</p>
          <p className="tracks-total">{total} Tracks</p>
        </div>
      </div>
    </li>
  )
}

export default CategoriesList
