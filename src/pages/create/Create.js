import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useFetch } from '../../hooks/082 useFetch'
import { useTheme } from '../../hooks/useTheme'


//the stylesheet
import './Create.css'


export default function Create() {
  const [title, setTitle] = useState("")
  const [method, setMethod] = useState("")
  const [cookingTime, setCookingTime] = useState("")
  const [newIngredients, setNewIngredients] = useState('')
  const [ingredients, setIngredients] = useState([])
  const ingredientInput = useRef(null)
  const history = useHistory()

  const { postData, data, error } = useFetch("http://localhost:3000/recipes", 'POST') 

  const handleSubmit = (e) => {
    e.preventDefault()
    postData({title, ingredients, method, cookingTime: cookingTime + 'minutes'})
    setIngredients([])
    setCookingTime("")
    setMethod("")
    setTitle("")
    setNewIngredients("")
  }

  const handleAdd = (e) => {
    e.preventDefault()
    const ing  = newIngredients.trim()

    if(ing && !ingredients.includes(ing)){
      setIngredients(prevIngredients => [...prevIngredients, ing])
      setNewIngredients('')
      ingredientInput.current.focus()
    }
  }

  //redirect the user when we get data response
 useEffect(() => {
  if(data){
    history.push('/')
  }
 }, [data, history])


 const {mode} = useTheme()

  return (
    <div className='create'>
      <h2 className={`page-title ${mode}`}>Add a New Recipe</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span className={`styling ${mode}`}>Recipe Title:</span>
          <input 
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
          />
        </label>

        <label>
          <span className={`styling ${mode}`}>Recipe Ingridients</span>
          <div className='ingredients'>
            <input 
            type="text" 
            onChange={e => setNewIngredients(e.target.value)}
            value={newIngredients}
            ref={ingredientInput}
            />
            <button className='btn' onClick={handleAdd}>Add</button>
          </div>
        </label>
        <p className={`styling ${mode}`}>Current ingredients: 
          {ingredients.map(add => <em key={add}>{add}, </em>)}</p>

        <label>
          <span className={`styling ${mode}`}>Recipe Method:</span>
          <textarea
          onChange={(e) => setMethod(e.target.value)} 
          value={method}
          required
          />
        </label>

        <label>
          <span className={`styling ${mode}`}>Cooking Time (minutes):</span>
          <input 
          type="number"
          onChange={(e) => setCookingTime(e.target.value)}
          value={cookingTime}
          required
          />
        </label>

        <button className='btn'>
          Submit
        </button>
      </form>
      </div>
  )
}
