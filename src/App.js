import {Switch, Route} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import PlayListDetails from './components/PlayListDetails'
import CategoriesDetails from './components/CategoriesDetails'
import AlbumDetails from './components/AlbumDetails'
import NotFound from './components/NotFound'
import './App.css'

// write your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <Route exact path="/" component={Home} />
    <Route exact path="/playlist/:id" component={PlayListDetails} />
    <Route exact path="/category/:id/playlists" component={CategoriesDetails} />
    <Route exact path="/album/:id" component={AlbumDetails} />
    <Route exact component={NotFound} />
  </Switch>
)

export default App
