const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const postController = require('../controllers/postController');

router.get('/post', postController.all_posts );

router.get('/post/user', auth, postController.user_posts);

router.get('/post/:postId', postController.single_post );

router.post('/post', auth, postController.create_post );

router.put('/post/:postId', auth, postController.update_post );

router.delete('/post/:postId', auth, postController.delete_post );

module.exports = router;