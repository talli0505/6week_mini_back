const { Comments, User } = require("../models"); 
const { Sequelize } = require("../models");
const { Op } = Sequelize;

class Commentsrepository {
  // 댓글 생성하는 함수
  createComment = async (postId, comment, userId, nickname) => {
    try {
      // create로 sql 안에 댓글을 생성
      const createcomment = await Comments.create({ postId, userId, comment, nickname });
      const findecomments = await Comments.findOne({
        where: { userId: createcomment.userId },
      });
      const findeusers = await User.findOne({
        where: { userId: createcomment.userId },
      });

      return { create: createcomment };
    } catch (error) {
      return `${error.name}=${error.errorMessage}`;
    }
  };

  // postID(경로) 게시글에 있는 댓글 조회하는 함수
  Commentlist = async (postId) => {
    try {
      // finaAll로 sql 안에 postId(경로)를 찾아 댓글을 조회
      const comments = await Comments.findAll({
        where: { postId },
      });
      return comments;
    } catch (error) {
      `${error.name}=${error.errorMessage}`;
    }
  };

  // commentId를 찾아 그 댓글을 수정하는 함수
  Commentedit = async (commentId, comment, userId) => {
    try {
      // update로 sql 안에 commentId, userId를 찾아 댓글을 수정
      const updateCount = await Comments.update(
        { comment },
        { where: { commentId, userId } }
      );

      return updateCount;
    } catch (error) {
      return `${error.name}=${error.errorMessage}`;
    }
  };

  // 댓글이 존재하는지 확인하기 위한 함수
  CommentisExist = async (commentId) => {
    try {
      // findByPk로 sql 안에 commentId로 된 댓글이 존재하는지 체크
      const isExist = await Comments.findByPk(commentId);

      return isExist;
    } catch (error) {
      return `${error.name}=${error.errorMessage}`;
    }
  };

  // 댓글을 삭제하기 위한 함수
  Commentdelete = async (commentId, userId) => {
    try {
      // destroy로 sql 안에 commentId, suerId가 맞는 댓글을 찾아 삭제
      const deleteCount = await Comments.destroy({
        where: { commentId, userId },
      });

      return deleteCount;
    } catch (error) {
      return `${error.name}=${error.errorMessage}`;
    }
  };
}

module.exports = Commentsrepository;
