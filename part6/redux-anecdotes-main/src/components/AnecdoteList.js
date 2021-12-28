import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
    
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)
    
    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
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