import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    
    const dispatch = useDispatch()
    let anecdotes = useSelector(state => state.anecdotes)
    let filter = useSelector(state => state.filter)
    if(filter !== null || filter !== ""){
      anecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().match(filter.toLowerCase()))
    }
    
    
    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(showNotification(`You voted '${anecdote.content}'`))
        setTimeout(()=>dispatch(hideNotification()), 5000)
        
    }
    
    return(
        anecdotes.sort((first, second) => (first.votes - second.votes)*-1 ) && anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          )
    )
}

export default AnecdoteList