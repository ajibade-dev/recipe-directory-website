import { useFetch } from '../../hooks/082 useFetch'
import React from 'react'

//import stylesheet
import './Home.css'
//import components
import RecipeList from '../../components/RecipeList'


export default function Home() {
  const { data,  isPending, error } = useFetch('http://localhost:3000/recipes')

  return (
    <div className='home'>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {data && <RecipeList recipes={data} />}
      </div>
  )
}
