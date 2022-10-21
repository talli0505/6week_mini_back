const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/auth-middlewares')

const PostsController = require('../controllers/posts');
const postsController = new PostsController();

// 전체 조회
router.get('/', postsController.getPosts);

// 특정 게시물 조회
router.get('/:postId', postsController.getPostById);

// 게시물 생성
router.post('/', middleware, postsController.createPost);

// 게시물 수정
router.put('/:postId', middleware, postsController.updatePost);

// 게시물 삭제
router.delete('/:postId', middleware, postsController.deletePost);

module.exports = router;