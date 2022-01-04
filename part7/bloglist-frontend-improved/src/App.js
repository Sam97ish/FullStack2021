import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggable'
import User from './components/User'
import Users from './components/Users'
import usersService from './services/users'
import { Form, Button } from 'react-bootstrap'
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom'
import Menu from './components/Menu'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  //Sets blogs in state only once.

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
    usersService.getAll().then(fetchedUsers => {
      setUsers(fetchedUsers)
    })

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
  const handleLogout = async (event) => {
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

  const addBlog = async (blog) => {
    try{
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blog)
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
  }

  const updateBlogLike = async (id, blog) => {
    try{
      blog = {
        ...blog,
        likes: blog.likes+1,
      }
      const newBlog = await blogService.update(id, blog)

      setBlogs(blogs.map(blog => blog.id === newBlog.id ? newBlog : blog))
      setErrorMessage('Liked blog ' + newBlog.title)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }catch (exception){
      console.log(exception)
      setErrorMessage('Error while Liking Blog!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    try{
      const deletedBlog = await blogService.deleteBlog(id)

      setBlogs(blogs.filter(blog => blog.id !== id))
      setErrorMessage('Deleted blog ' + deletedBlog.title)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }catch (exception){
      console.log(exception)
      setErrorMessage('Error while deleting Blog!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  if (user === null) {
    return (
      <div className="container">
        <Notification message={errorMessage} />
        <h2>Log in to application</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <div>
            username
              <input
                id='username'
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
            password
              <input
                id='password'
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <Button variant="primary" type="submit">
            login
            </Button>
          </Form.Group>
        </Form>
      </div>
    )
  }

  const match = useRouteMatch('/users/:id')
  const userToShow = match
    ? users.find((user) => user.id === match.params.id)
    : null

  console.log(userToShow)
  return (
    <div className="container">

      <Notification message={errorMessage} />
      <Menu /> <h4> {user.username} is logged in. <form onSubmit={handleLogout}> <Button variant="secondary" type="submit">
            Logout
      </Button> </form></h4>

      <Switch>
        <Route path="/users/:id">
          <User user={userToShow} />
        </Route>
        <Route path="/users">
          <Users users={users}/>
        </Route>
        <Route path="/">
          <h2>blogs</h2>
          {blogs.sort((first, second) => (first.likes - second.likes)*-1 ) && blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateLike={() => updateBlogLike(blog.id, blog)} deleteBlog={deleteBlog} />
          )}

          <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>
        </Route>
      </Switch>

    </div>
  )
}

export default App