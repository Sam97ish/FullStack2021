import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogURL, setNewBlogURL] = useState('')

  //Sets blogs in state only once.
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  //Sets the user from local stoarge if already logged in.
  useEffect(() => {    
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {      
          const user = JSON.parse(loggedUserJSON)
                setUser(user)      
                blogService.setToken(user.token)    
              }  
    }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user)) 
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
            }, 5000)
    }
  }

  //Logs out user by clearing user and local stoarge.
  const handleLogout = async (event) =>{
    event.preventDefault()
    setUser(null)
    setUsername('')
    setPassword('')
    blogService.clearToken()
    window.localStorage.removeItem('loggedBlogappUser')
    setErrorMessage('Logged out Successfully.')
    setTimeout(() => {
      setErrorMessage(null)
          }, 5000)
  }
  
  const addBlog = async (event) => {
    event.preventDefault()
    try{
      const newBlog = await blogService.create({
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogURL,
      })
      
      setBlogs(blogs.concat(newBlog))
      setErrorMessage('Added new blog ' + newBlog.title + ' Successfully.')
      setTimeout(() => {
        setErrorMessage(null)
            }, 5000)
    }catch (exception){
      console.log(exception)
      setErrorMessage('Error while adding new Blog!')
      setTimeout(() => {
        setErrorMessage(null)
            }, 5000)
    }
    setNewBlogURL('')
    setNewBlogTitle('')
    setNewBlogAuthor('')
  }

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification message={errorMessage} />
      <h1> {user.username} is logged in. <form onSubmit={handleLogout}> <button type="submit">logout</button> </form></h1>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <h1> Add a new blog </h1>
      <form onSubmit={addBlog}>
        <div>
          Title
          <input
            value={newBlogTitle}
            onChange={({ target }) => setNewBlogTitle(target.value)} />
        </div>
        <div>
          Author
          <input
            value={newBlogAuthor}
            onChange={({ target }) => setNewBlogAuthor(target.value)} />
        </div>
        <div>
          URL
          <input
            value={newBlogURL}
            onChange={({ target }) => setNewBlogURL(target.value)} />
        </div>
        <button type="submit">Add a new blog.</button>
      </form>
    </div>
  )
}

export default App