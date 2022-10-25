const PostService = require("../services/posts");

class PostsController {
  postService = new PostService();

  // 게시물 전체 조회
  getPosts = async (req, res, next) => {

    // postService 에 있는 findAllPost 함수를 받아와서 선언
    const posts = await this.postService.findAllPost();

    res.status(200).json({ data: posts });
  };

  // 게시글 상세 조회
  getPostById = async (req, res, next) => {
    try {
      // 경로 받아오기
      const { postId } = req.params;

      // postService 에 있는 findPostById 함수를 받아와서 선언
      const post = await this.postService.findPostById(postId);

      // 성공 : 선언한 값을 보내기, 실패 : 에러 메세지 보내기
      res.status(200).json({ post: post });
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  };

  // 게시글 생성
  createPost = async (req, res, next) => {
    // 입력 값 받아오기
    const { title, content } = req.body;

    // 로그인 계정 (미들웨어) 에서 받아오기
    const { userId, nickname } = res.locals.user;

    // postService 에 있는 createPost 함수를 받아와서 선언
    const createPostData = await this.postService.createPost(
      userId,
      nickname,
      title,
      content
    );

    // 선언한 값을 보내기
    res.status(201).json({ data: createPostData });
  };

  // 게시글 수정
  updatePost = async (req, res, next) => {
    try {
      // 경로 받아오기
      const { postId } = req.params;

      // 입력 값 받아오기
      const { title, content } = req.body;

      // 로그인 계정 (미들웨어) 에서 받아오기
      const { nickname } = res.locals.user;

      // postService 에 있는 updatePost 함수를 받아와서 선언
      const updatePost = await this.postService.updatePost(
        postId,
        nickname,
        title,
        content
      );

      // 성공 : 선언한 값을 보내기, 실패 : 에러 메세지 보내기
      res.status(200).json({ data: updatePost });
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  };

  // 게시글 삭제
  deletePost = async (req, res, next) => {
    try {
      // 경로 받아오기
      const { postId } = req.params;

      // 로그인 계정 (미들웨어) 에서 받아오기
      const { nickname } = res.locals.user;

      // postService 에 있는 deletPost 함수를 받아와서 선언
      const deletePost = await this.postService.deletePost(postId, nickname);

      // 성공 : 선언한 값을 보내기, 실패 : 에러 메세지 보내기
      res.status(200).json({ data: deletePost });
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  };
}

module.exports = PostsController;