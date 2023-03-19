import React from 'react'
import { Link } from 'react-router-dom'
import Searchbar from './Searchbar'
import {useTheme} from '../hooks/useTheme'
// import styles
 import './Navbar.css' 


 export default function Navbar() {
  const { color } = useTheme()

   return (
     <div className="navbar" style={{background: color}}>
      <nav>
        <Link to='/' className='brand'>
            <h2>Recipe Directory App</h2>
        </Link>
        <Searchbar />
        <Link to='/create'>Create Recipe</Link>
      </nav>
    </div>
   )
 }
 