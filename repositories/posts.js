const { Posts } = require("../models");

class PostRepository {
  // 게시글 조회
  findAllPost = async () => {
    const posts = await Posts.findAll();

    return posts;
  };

  // 특정 게시글 조회
  findPostById = async (postId) => {
    const post = await Posts.findByPk(postId);

    return post;
  };

  // 게시글 생성
  createPost = async (userId, nickname, title, content) => {
    const createPostData = await Posts.create({
      userId,
      nickname,
      title,
      content
    });
    return createPostData;
  };

  // 게시글 수정
  updatePost = async (postId, nickname, title, content) => {
    const updatePostData = await Posts.update(
      { title, content },
      { where: { postId, nickname } }
    );

    return updatePostData;
  };

  // 게시글 삭제
  deletePost = async (postId, nickname) => {
    const updatePostData = await Posts.destroy({ where: { postId, nickname } });

    return updatePostData;
  };
}

module.exports = PostRepository;