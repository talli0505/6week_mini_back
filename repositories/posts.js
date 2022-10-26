const { Posts } = require("../models");

class PostRepository {
  // 게시글 조회 함수
  findAllPost = async () => {

    // findAll로 sql 안에 있는 내용 조회
    const posts = await Posts.findAll();

    return posts;
  };

  // 특정 게시글 조회 함수
  findPostById = async (postId) => {

    // findByPk로 sql 안에 있는 내용 조회
    const post = await Posts.findByPk(postId);

    return post;
  };

  // 게시글 생성
  createPost = async (userId, nickname, title, content) => {

    // create로 sql안에 게시글 생성
    const createPostData = await Posts.create({
      userId,
      nickname,
      title,
      content
    });
    return createPostData;
  };

  // 게시글 수정 함수
  updatePost = async (postId, nickname, title, content) => {

     // update로 sql 안에 postId, nickname 맞는거 찾아서 수정
    const updatePostData = await Posts.update(
      { title, content },
      { where: { postId, nickname } }
    );
    
    return updatePostData;
  };

  // 게시글 삭제 함수
  deletePost = async (postId, nickname) => {

    // destory로 sql 안에 postId, nickname 맞는거 찾아서 삭제
    const updatePostData = await Posts.destroy({ where: { postId, nickname } });

    return updatePostData;
  };
}

module.exports = PostRepository;