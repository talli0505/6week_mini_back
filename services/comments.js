const Joi = require('joi');
const commentsrepository = require('../repositories/comments');
const RE_COMMENT = /^[\s\S]{1,255}$/; // 댓글 정규 표현식

const commentSchema = Joi.object({
  comment: Joi.string().pattern(RE_COMMENT).required(),
});

class Commentsservice {
  commentrepository = new commentsrepository();

  createComment = async (postId, comment, userId) => {
    try {
      const resultSchema = commentSchema.validate({ comment: comment });
      if (resultSchema.error) {
        return '데이터 형식이 올바르지 않습니다.';
      }

      const createcomment = await this.commentrepository.createComment(postId, comment, userId);
      return createcomment;
    } catch (error) {
      return error.name + '=' + error.errorMessage;
    }
  };

  Commentlist = async (postId) => {
    try {
      const comments = await this.commentrepository.Commentlist(postId);
      if (comments.length === 0) {
        return null;
      }
      return comments;
    } catch (error) {
      return error.name + '=' + error.errorMessage;
    }
  };

  Commentedit = async (commentId, comment, userId) => {
    try {
      const resultSchema = commentSchema.validate({ comment: comment });
      if (resultSchema.error) {
        return '댓글 형식이 올바르지 않습니다.';
      }
      const Commentedit = await this.commentrepository.Commentedit(commentId, comment, userId);

      if (Commentedit < 1) {
        return '댓글이 존재하지 않습니다.';
      }
      return resultSchema;
    } catch (error) {
      return error.name + '=' + error.errorMessage;
    }
  };

  Commentdelete = async (commentId, userId) => {
    try {
      const isExist = await this.commentrepository.CommentisExist(commentId);
      if (!isExist) {
        return '댓글이 없습니다.';
      }

      const Commentdelete = await this.commentrepository.Commentdelete(commentId, userId);
      if (Commentdelete < 1) {
        return '본인만 삭제 가능합니다.';
      }

      return '댓글 삭제가 정상적으로 처리되었습니다.';
    } catch (error) {
      return error.name + '=' + error.errorMessage;
    }
  };
}

module.exports = Commentsservice;
