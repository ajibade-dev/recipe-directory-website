import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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
        <Routes>
          <Route path='/' element={<Home />} />
           
          <Route path='/create' element={<Create />} />
           
          <Route path='/recipes/:id' element={<Recipe />} />
            
          <Route path='/search' element={<Search />} />
            
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
