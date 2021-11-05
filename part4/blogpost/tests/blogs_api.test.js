const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
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
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain(
    'Type harzz'
  )
})

test('Testing that likes are zeroed if not given.', async () => {
  const newBlog =   {
    title: 'Type harzz',
    author: 'Sam',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

test('Testing that server rejects blogs with missing title or url.', async () => {
  const newBlog =   {
    author: 'Sam',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('a blog can be deleted', async () => {

  const blogToDelete = initialBlogs[0]

  await api.delete(`/api/blogs/${blogToDelete._id}`).expect(204)
  const blogsAtEnd = await api.get('/api/blogs')

  expect(blogsAtEnd.body).toHaveLength(
    initialBlogs.length - 1
  )

  const titles = blogsAtEnd.body.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.title)
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

afterAll(() => {
  mongoose.connection.close()
})