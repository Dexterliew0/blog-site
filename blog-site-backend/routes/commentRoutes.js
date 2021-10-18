const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const commentController = require('../controllers/commentController');

router.post('/comment', auth, commentController.create_comment );

router.get('/comments/:postId', commentController.get_comments);

router.get('/comment/:commentId', commentController.get_single_comment);

router.put('/comment/:commentId', auth, commentController.update_comment );

router.delete('/comment/:commentId', auth, commentController.delete_comment );

module.exports = router;