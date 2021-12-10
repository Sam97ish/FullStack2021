const blogRouter = require('express').Router()
const Blog = require('../models/blog')
//const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', middleware.userExtractor, async (request, response) => {


  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = request.user

  const blog = new Blog(request.body)

  //const users = await User.find({}).populate('blogs')
  /*
  const user = await User.findById(request.body.user)
  blog['user'] = user._id
  */

  blog['user'] = user.id
  //const user = users[0]

  if(!(blog['title'] || blog['url'])){
    response.status(400).json({ error: 'Missing properties: title or url.' })

  }else{
    //zeroing likes.
    if(blog['likes'] === undefined){blog['likes'] = 0}

    const result = await blog.save()
    user['blogs'] = user['blogs'].concat(result._id)
    await user.save()
    response.status(201).json(result)
  }
  /*
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    */

})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

  // get user from request object
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  console.log(JSON.stringify(user))
  console.log(JSON.stringify(blog))
  if ( blog.user.toString() === user.id.toString() ){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }else{
    response.status(401).json({ error: 'unauthorized' }).end()
  }


})

blogRouter.put('/:id', async (request, response) => {
  const blog = new Blog(request.body)
  console.log(blog.toJSON())
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog.toJSON(), { new: true })
  response.json(updatedBlog.toJSON())
})

module.exports = blogRouter