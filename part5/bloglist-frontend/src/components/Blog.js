import React from 'react'
const Blog = ({blog}) => (
  <div>
    Title {blog.title} By: {blog.author}
  </div>  
)

export default Blog