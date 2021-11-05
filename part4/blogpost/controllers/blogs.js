const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if(!(blog['title'] || blog['url'])){
    response.status(400).json({ error: 'Missing properties: title or url.' })

  }else{
    //zeroing likes.
    if(blog['likes'] === undefined){blog['likes'] = 0}

    const result = await blog.save()
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

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const blog = new Blog(request.body)
  console.log(blog.toJSON())
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog.toJSON(), { new: true })
  response.json(updatedBlog.toJSON())
})

module.exports = blogRouter