/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogURL, setNewBlogURL] = useState('')

  const handleAddBlog = (event) => {
    event.preventDefault()
    addBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogURL,
    })
    setNewBlogAuthor('')
    setNewBlogTitle('')
    setNewBlogURL('')
  }

  return(
    <div>
      <h1> Add a new blog </h1>
      <form id="addBlogForm" onSubmit={handleAddBlog}>
        <div>
                Title
          <input
            id="titleInput"
            value={newBlogTitle}
            onChange={({ target }) => setNewBlogTitle(target.value)} />
        </div>
        <div>
                Author
          <input
            id="authorInput"
            value={newBlogAuthor}
            onChange={({ target }) => setNewBlogAuthor(target.value)} />
        </div>
        <div>
                URL
          <input
            id="urlInput"
            value={newBlogURL}
            onChange={({ target }) => setNewBlogURL(target.value)} />
        </div>
        <button type="submit">Add a new blog.</button>
      </form>
    </div>
  )
}

export default BlogForm