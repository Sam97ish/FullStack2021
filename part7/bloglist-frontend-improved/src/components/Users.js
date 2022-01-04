import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  console.log(users)
  return(
    <div >
      <h2>Users</h2>

      <ul>
        {users.map(user => {
          return (<li key={user.id}><Link to={`/users/${user.id}`}>{user.username}</Link> Created {user.blogs.length} Blogs</li>)
        })}
      </ul>
    </div>
  )
}

export default Users