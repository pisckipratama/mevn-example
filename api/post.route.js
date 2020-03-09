const express = require('express').Router();
const router = express;
const Post = require('./post.models');

router.route('/add').post((req, res) => {
  let post = new Post(req.body)
  post.save()
    .then((data) => {
      res.status(200).json({
        success: "post added successfully",
        data
      })
    }).catch((err) => {
      res.status(400).json({
        error: err
      })
    });
})

router.route('/').get((req, res) => {
  Post.find((err, posts) => {
    if (err) res.json(err)
    res.json({
      message: "success loaded all data",
      posts
    })
  })
})

router.route('/edit/:id').get((req, res) => {
  let id = req.params.id
  Post.findById(id, (err, post) => {
    if (err) res.json(err)
    res.json(post)
  })
})

router.route('/edit/:id').post((req, res) => {
  const { id } = req.params
  const { title, body } = req.body
  Post.findById(id, (err, post) => {
    if (err) res.status(400).json(err)
    if (!post) {
      res.status(404).send('Data not found!')
    } else {
      post.title = title
      post.body = body
      post.save().then(() => {
        res.json({ message: "Update completed" })
      }).catch(() => res.status(400).send("unable to update the database"))
    }
  })
})

router.route('/delete/:id').delete((req, res) => {
  const { id } = req.params
  Post.findByIdAndRemove({_id: id}, (err) => {
    if (err) res.json(err)
    res.json({message: "successfully deleted."})
  })
})

module.exports = router