import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { db, collection, doc, updateDoc, onSnapshot } from '../../firebase/config'

//import stylesheet
import './Recipe.css'



export default function Recipe() {
  const { id } = useParams()
  const {mode} = useTheme()

  const [recipes, setRecipes] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setIsPending(true)

    const recipeGet = collection(db, 'recipes')
    const docRef = doc(recipeGet, id)
   const unsub =  onSnapshot(docRef, (doc) => {
      if(doc.exists) {
        setIsPending(false)
        setRecipes(doc.data())
      }else{
        setIsPending(false)
        setError("Could not find recipe")
      }
    })

    return () => unsub()

  }, [id])

    const handleClick = () => {
      const recipeGet = collection(db, 'recipes')
      const docRef = doc(recipeGet, id)
      updateDoc(docRef,{
        title: 'something completely different'
      })
    }

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
          <button onClick={handleClick}>Update Me</button>
        </>
      )}
    </div>
  )
}
