import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name="content" />
      <button type="submit">add</button>
    </form>
  )
}

export default NewAnecdote