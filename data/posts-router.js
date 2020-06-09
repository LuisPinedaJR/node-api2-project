const express = require('express')
const router = express.Router()
const posts = require('./db')

router.get('/api/posts', (req, res) => {
  posts
    .find()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        error: 'The posts information could not be retrieved.',
      })
    })
})

module.exports = router
