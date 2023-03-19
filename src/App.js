import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//page components
import Home from './pages/home/Home'
import Create from './pages/create/Create'
import Recipe from './pages/recipes/Recipe'
import Search from './pages/search/Search'
import Navbar from './components/Navbar';
import ThemeSelector from './components/ThemeSelector';
import { useTheme } from './hooks/useTheme';

function App() {
 const {mode} = useTheme() 


  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar />
        <ThemeSelector/>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/create'>
            <Create />
          </Route>
          <Route path='/recipes/:id'>
            <Recipe />
          </Route>
          <Route path='/search'>
            <Search />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App
