import { db, collection } from '../../firebase/config'
import React, { useEffect, useState } from 'react'

//import stylesheet
import './Home.css'
//import components
import RecipeList from '../../components/RecipeList'
import { onSnapshot } from 'firebase/firestore'


export default function Home() {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setIsPending(true)
    const recipeGet = collection(db, 'recipes');
    const unsub = onSnapshot(recipeGet, (snapshot) => {
     if (snapshot.empty){
      setError('No recipes to load')
      setIsPending(false)
     } else {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({id: doc.id, ...doc.data() })
      })
      setData(results)
      setIsPending(false)
     }
    }, (err) => {
      setError(err.message)
      setIsPending(false)
    })

    return () => unsub( )

  }, [])

  return (
    <div className='home'>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {data && <RecipeList recipes={data} />}
      </div>
  )
}
