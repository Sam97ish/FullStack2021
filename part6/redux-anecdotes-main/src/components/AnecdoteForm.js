import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { hideNotification, showNotification } from '../reducers/notificationReducer'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(createAnecdote(content))
    dispatch(showNotification(`You created a new anecdote '${content}'`))
    setTimeout(()=>dispatch(hideNotification()), 5000)
    
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name="content" />
      <button type="submit">add</button>
    </form>
  )
}

export default NewAnecdote