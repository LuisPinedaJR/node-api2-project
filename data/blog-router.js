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

router.get('/api/posts/:id', (req, res) => {
  posts
    .findById(req.params.id)
    .then(posts => {
      if (posts) {
        res.status(200).json(posts)
      } else {
        res.status(404).json({
          message: 'The post with the specified ID does not exist.',
        })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: 'Error retrieving the posts',
      })
    })
})

router.post('/api/posts', (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.',
    })
  }

  posts
    .insert(req.body)
    .then(posts => {
      res.status(201).json(posts)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        error: 'There was an error while saving the post to the database',
      })
    })
})

router.put('/api/posts/:id', (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.',
    })
  }

  posts
    .update(req.params.id, req.body)
    .then(posts => {
      if (posts) {
        res.status(200).json(posts)
      } else {
        res.status(404).json({
          message: 'The post with the specified ID does not exist.',
        })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        error: 'The post information could not be modified.',
      })
    })
})

router.delete('/api/posts/:id', (req, res) => {
  posts
    .remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: 'The blog has been deleted',
        })
      } else {
        res.status(404).json({
          message: 'The post with the specified ID does not exist.',
        })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        error: 'The post could not be removed',
      })
    })
})

router.get('/api/posts/:id/comments', (req, res) => {
  posts
    .findById(req.params.id)
    .then(post => {
      if (!post) {
        return res.status(404).json({
          message: 'The post with the specified ID does not exist.',
        })
      }
      return posts.findPostComments(req.params.id)
    })
    .then(comments => {
      res.status(200).json(comments)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        error: 'The comments information could not be retrieved.',
      })
    })
})

router.post('/api/posts/:id/comments', (req, res) => {
  posts.findById(req.params.id).then(post => {
    if (!post) {
      return res.status(404).json({
        errorMessage: 'Please provide text for the comment.',
      })
    } else if (!req.body.text) {
      res.status(400).json({
        errorMessage: 'Please provide text for the comment.',
      })
    }
  })
  posts.insertComment(req.body).then(post => {
    return res.status(201).json(post)
  })
})

// router.post('/:id/comments', (req, res) => {
//   const id = req.params.id
//   const text = { ...req.body, post_id: id }
//   Posts.findById(id).then(post => {
//     if (post) {
//       Posts.insertComment(text)
//         .then(comment => {
//           res.status(200).json(comment)
//         })
//         .catch(error => {
//           res.status(500).json('Requires Text')
//         })
//     } else {
//       res.status(500).json({ message: 'Does not exist' })
//     }
//   })
// })

// router.get('/users/:id/posts/:postID', (req, res) => {
//   users
//     .findUserPostById(req.params.id, req.params.postID)
//     .then(post => {
//       if (post) {
//         res.json(post)
//       } else {
//         res.status(404).json({
//           message: 'Post was not found',
//         })
//       }
//     })
//     .catch(error => {
//       console.log(error)
//       res.status(500).json({
//         message: 'error getting the user post',
//       })
//     })
// })
module.exports = router
