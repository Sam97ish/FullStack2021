import React from 'react'
import { connect } from "react-redux"
import { createAnecdote } from '../reducers/anecdoteReducer'
import { changeNotification} from '../reducers/notificationReducer'

const NewAnecdote = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    props.createAnecdote(content)
    props.changeNotification(`You created a new anecdote '${content}'`, 5)
    
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name="content" />
      <button type="submit">add</button>
    </form>
  )
}

export default connect(null, {createAnecdote, changeNotification })(NewAnecdote)