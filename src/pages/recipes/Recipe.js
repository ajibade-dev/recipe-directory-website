import React from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/082 useFetch'
import { useTheme } from '../../hooks/useTheme'
//import stylesheet
import './Recipe.css'



export default function Recipe() {
  const { id } = useParams()
  const url = 'http://localhost:3000/recipes/' + id
  const {data:recipes, isPending, error } = useFetch(url)
  const {mode} = useTheme()
  return (
    <div className={`recipe ${mode}`}>
      {isPending && <p className='loading'>Loading...</p>}
      {error && <p className='error'>{error}</p>}
      {recipes && (
        <>
          <h2 className={`page-title ${mode}`}>
            {recipes.title}
          </h2>
          <p>Takes {recipes.cookingTime} to cook</p>
          <ul>
            {recipes.ingredients.map(ing =>(
            <li key={ing} className={`recipe-ingredients ${mode}`}>{ing}</li>))}
          </ul>
          <p className='method'>{recipes.method}</p>
        </>
      )}
    </div>
  )
}
