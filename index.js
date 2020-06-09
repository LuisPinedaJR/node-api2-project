const express = require('express')
const blogRouter = require('./data/blog-router')
const postsRouter = require('./data/posts-router')

const server = express()
const port = 4000

server.use(express.json())
server.use(blogRouter)
server.use(postsRouter)

// create endpoint that returns all the posts for a user
// create endpoint for adding a new post for a user

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
