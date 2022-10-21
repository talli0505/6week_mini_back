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
  createPost = async (nickname, title, content) => {
    const createPostData = await Posts.create({
      nickname,
      title,
      content,
    });

    return createPostData;
  };

  // 게시글 수정
  updatePost = async (postId, title, content) => {
    const updatePostData = await Posts.update(
      { title, content },
      { where: { postId } }
    );

    return updatePostData;
  };

  // 게시글 삭제
  deletePost = async (postId) => {
    const updatePostData = await Posts.destroy({ where: { postId } });

    return updatePostData;
  };
}

module.exports = PostRepository;
