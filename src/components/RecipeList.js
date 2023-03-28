import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import trashcan from '../assets/trashcan.svg'
import { db, collection } from '../firebase/config'

//import stylesheet
import './Recipe.css'
import { deleteDoc, doc } from 'firebase/firestore'

export default function RecipeList({ recipes }) {
const {mode} = useTheme()
  if(recipes.length === 0){
    return <div className='error'>No recipes to load...</div>
  }


  const handleClick = (id) => {
    const recipeGet = collection(db, 'recipes');
   const deleteNow =  doc(recipeGet, id)
   deleteDoc(deleteNow)
  }

  return (
    <div className='recipe-list'>
        {recipes.map(recipe =>(
            <div key={recipe.id} className={`card ${mode}`}>
                <h3>{recipe.title}</h3>
                <p>{recipe.cookingTime} to make</p>
                <div>{recipe.method.substring(0, 100)}...</div>
                <Link to={`/recipes/${recipe.id}`} className={`recipe-link ${mode}`}>Cook This</Link>
                <img
                className='delete'
                src={trashcan}
                onClick={() => handleClick(recipe.id)}
                alt='Trashcan'
                />
            </div>
        ))}
        
    </div>
  )
}
