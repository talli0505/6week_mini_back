const { Comments } = require("../models");
const { Sequelize } = require("../models");
const { Op } = Sequelize;

class Commentsrepository {
  createComment = async (postId, comment, userId) => {
    try {
      const createcomment = await Comments.create({ postId, userId, comment });
      const findecomments = await Comments.findOne({
        where: { userId: createcomment.userId },
      });
      return findecomments;
    } catch (error) {
      return `${error.name}=${error.errorMessage}`;
    }
  };

  Commentlist = async (postId) => {
    try {
      const comments = await Comments.findAll({
        where: { postId },
      });
      return comments;
    } catch (error) {
      `${error.name}=${error.errorMessage}`;
    }
  };

  Commentedit = async (commentId, comment, userId) => {
    try {
      const updateCount = await Comments.update(
        { comment },
        { where: { commentId, userId } }
      );

      return updateCount;
    } catch (error) {
      return `${error.name}=${error.errorMessage}`;
    }
  };

  CommentisExist = async (commentId) => {
    try {
      const isExist = await Comments.findByPk(commentId);

      return isExist;
    } catch (error) {
      return `${error.name}=${error.errorMessage}`;
    }
  };

  Commentdelete = async (commentId, userId) => {
    try {
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