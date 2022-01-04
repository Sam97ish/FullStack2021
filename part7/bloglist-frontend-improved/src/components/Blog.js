import React from 'react'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
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
        <Button variant="info" id='view-blog-button' onClick={toggleVisibility}>view</Button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <Button variant="secondary" onClick={toggleVisibility}>hide</Button>
        <p id='num-likes'>Likes: {blog.likes} <Button variant="success" id='like-blog-button' onClick={updateLike}>Like</Button></p>
        <p>URL: {blog.url}</p> <Button variant="danger" id='delete-blog-button' onClick={handleDelete}>Delete Blog!</Button>
      </div>
    </div>
  )
}

export default Blog