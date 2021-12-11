import React from 'react'
import { useState } from 'react'

const Blog = ({ blog, updateLike, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // eslint-disable-next-line no-unused-vars
  const handleDelete = async (event) => {
    if(window.confirm(`Are you sure you want to delete The Blog ${blog.title} by ${blog.author}`)){
      await deleteBlog(blog.id)
    }
  }

  return(
    <div className='blogs-to-check' style={blogStyle}>
      <p className='title-to-check'>  Blog: {blog.title} By {blog.author} </p>
      <div  style={hideWhenVisible}>
        <button id='view-blog-button' onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <button onClick={toggleVisibility}>hide</button>
        <p id='num-likes'>Likes: {blog.likes} <button id='like-blog-button' onClick={updateLike}>Like</button></p>
        <p>URL: {blog.url}</p> <button id='delete-blog-button' onClick={handleDelete}>Delete Blog!</button>
      </div>
    </div>
  )
}

export default Blog