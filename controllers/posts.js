const PostService = require("../services/posts");

class PostsController {
  postService = new PostService();

  // 전체 조회
  getPosts = async (req, res, next) => {
    const posts = await this.postService.findAllPost();

    res.status(200).json({ data: posts });
  };

  // 상세 조회
  getPostById = async (req, res, next) => {
    try{
      const { postId } = req.params;
      const post = await this.postService.findPostById(postId);
      res.status(200).json({ post : post });
    } catch(err) {
      res.status(400).json({ err : err.message });
    }
  };

  // 게시글 생성
  createPost = async (req, res, next) => {
    const { title, content } = req.body;
    const { userId, nickname } = res.locals.user
    const createPostData = await this.postService.createPost(
      userId,
      nickname,
      title,
      content,
    );
    res.status(201).json({ data: createPostData });
  };

  // 게시글 수정
  updatePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { title, content } = req.body;
      const { nickname } = res.locals.user; 

      const updatePost = await this.postService.updatePost(
        postId,
        nickname,
        title,
        content
      );

      res.status(200).json({ data: updatePost });
    } catch(err) {
      res.status(400).json({ err : err.message });
    }
    
  };

  // 게시글 삭제
  deletePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { nickname } = res.locals.user;
  
      const deletePost = await this.postService.deletePost(postId, nickname);
  
      res.status(200).json({ data: deletePost });
    }catch(err) {
      res.status(400).json({ err : err.message });
    }
  };
}

module.exports = PostsController;
