var _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes  = (blogs) => {
  const reducer = (sum, blog) => {return sum + blog.likes}
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {

  let maxLike = blogs.length === 0
    ? 0
    : Math.max(...blogs.map(blog => blog.likes))

  return blogs.length === 0
    ? 0 : blogs.filter(blog => blog.likes >= maxLike)[0]
}

const mostBlog = (blogs) => {
  let result = _.chain(blogs)
    .groupBy('author').map((value, key) => ({ author: key, blogs: value })).value()

  let most = { author: '', blogs: [] }
  //console.log(keys)
  //console.log(result)
  let maxBlog = blogs.length === 0
    ? 0
    : Math.max(...result.map(author => author.blogs.length))

  let authorFinal
  if(blogs.length === 0){

    authorFinal = 0

  }else{
    authorFinal = result.filter(author => author.blogs.length >= maxBlog)[0]
    most.author = authorFinal.author
    most.blogs = maxBlog
  }


  /*
  for (let key in keys){
    if(result[key].blogs.length > most.blogs.length){
      most.author = result[key].author
      most.blogs = result[key].blogs.length
      console.log('Most has changed: ' + JSON.stringify(most))
    }
  }
  */

  return blogs.length === 0
    ? 0 : most
}

const mostLikes = (blogs) =>
{
  let result = _.chain(blogs)
    .groupBy('author').map((value, key) => ({ author: key, likes: totalLikes(value) })).value()

  let most = { author: '', likes: 0 }
  //console.log(keys)
  //console.log(result)
  let maxLike = blogs.length === 0
    ? 0
    : Math.max(...result.map(author => author.likes))

  let authorFinal
  if(blogs.length === 0){

    authorFinal = 0

  }else{
    authorFinal = result.filter(author => author.likes >= maxLike)[0]
    most.author = authorFinal.author
    most.likes = maxLike
  }

  return blogs.length === 0
    ? 0 : most
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlog,
  mostLikes
}