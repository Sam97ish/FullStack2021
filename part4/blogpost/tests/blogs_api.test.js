const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

const Blog = require('../models/blog')

describe('Testing blogs', () => {
  const initialBlogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    }
  ]

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('111', 10)
    const user = new User({ username: 'Samish', passwordHash })
    await user.save()

    await Blog.deleteMany({})

    const blogObjects = initialBlogs
      .map(blog => new Blog(blog))

    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)


  }, 1000000)

  test('Right number of blogs are returned as json', async () => {

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
  }, 1000000)

  test('Check if ID exists in blogs.', async () => {

    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  }, 1000000)

  test('a valid blog can be added', async () => {
    const newBlog =   {
      _id: '5a422bc61b54a6762f4d17fd',
      title: 'Type harzz',
      author: 'Sam',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0,
      user: ''
    }

    const loginUser = {
      username: 'Samish',
      password: '111'
    }

    const loggedUser = await api
      .post('/api/login')
      .send(loginUser)
      .expect('Content-Type', /application\/json/)

    /*const returnedBlog =*/ await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${loggedUser.body.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    //console.log(returnedBlog.body)

    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain(
      'Type harzz'
    )
  })

  test('Testing that likes are zeroed if not given.', async () => {
    const user = await api.get('/api/users')
    const newBlog =   {
      title: 'Type harzz',
      author: 'Sam',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      user: user.body[0].id
    }

    const loginUser = {
      username: 'Samish',
      password: '111'
    }

    const loggedUser = await api
      .post('/api/login')
      .send(loginUser)
      .expect('Content-Type', /application\/json/)

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${loggedUser.body.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('Testing that server rejects blogs with missing title or url.', async () => {
    const user = await api.get('/api/users')
    //console.log('#########Printing user' + JSON.stringify(user.body))
    const newBlog =   {
      author: 'Sam',
      user: user.body[0].id
    }

    const loginUser = {
      username: 'Samish',
      password: '111'
    }

    const loggedUser = await api
      .post('/api/login')
      .send(loginUser)
      .expect('Content-Type', /application\/json/)

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${loggedUser.body.token}`)
      .send(newBlog)
      .expect(400)
  })

  test('a blog can be deleted', async () => {

    const newBlog =   {
      _id: '5a422bc61b54a6762f4d17fd',
      title: 'Type harzz',
      author: 'Sam',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0,
      user: ''
    }

    const loginUser = {
      username: 'Samish',
      password: '111'
    }

    const loggedUser = await api
      .post('/api/login')
      .send(loginUser)
      .expect('Content-Type', /application\/json/)

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${loggedUser.body.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    await api
      .delete(`/api/blogs/${newBlog._id}`)
      .set('Authorization', `bearer ${loggedUser.body.token}`)
      .expect(204)
    const blogsAtEnd = await api.get('/api/blogs')

    expect(blogsAtEnd.body).toHaveLength(
      initialBlogs.length
    )

    const titles = blogsAtEnd.body.map(r => r.title)

    expect(titles).not.toContain(newBlog.title)
  })

  test('a blog can be updated (likes)', async () => {

    const blogToUpdate = initialBlogs[0]
    blogToUpdate['likes'] = 999

    const result = await api.put(`/api/blogs/${blogToUpdate._id}`).send(blogToUpdate)
    const blogsAtEnd = await api.get('/api/blogs')

    expect(blogsAtEnd.body).toHaveLength(
      initialBlogs.length
    )
    expect(result.body.likes).toBe(blogToUpdate.likes)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await api.get('/api/users')

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await api.get('/api/users')
    expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length + 1)

    const usernames = usersAtEnd.body.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await  api.get('/api/users')

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      //.set('Authorization', `bearer ${loggedUser.body.token}`) //not really needed but I have to add it because the app is using the extractor now...
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await  api.get('/api/users')
    expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})