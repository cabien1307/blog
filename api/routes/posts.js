const express = require('express');
const postController = require('../controller/PostController');
const router = express.Router();

router.get('/', postController.getAllPost)
router.post('/newPost', postController.createPost)
router.get('/:id', postController.getPost)
router.put('/:id', postController.updatePost)
router.delete('/:id', postController.deletePost)

module.exports = router