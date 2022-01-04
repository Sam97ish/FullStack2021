import React from 'react'

const User = ({ user }) => {

  if(!user){
    return null
  }

  return(
    <div >
      <h1>User {user.username}</h1>
      <h2>Added blogs.</h2>
      <ul>
        {user.blogs.map(blog => {
          return (<li key={blog.id}>{blog.title}</li>)
        })}
      </ul>
    </div>
  )
}

export default User