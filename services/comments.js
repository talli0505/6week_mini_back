const Joi = require("joi");
const commentsrepository = require("../repositories/comments");
const RE_COMMENT = /^[\s\S]{1,255}$/; // 댓글 정규 표현식

const commentSchema = Joi.object({
  comment: Joi.string().pattern(RE_COMMENT).required(),
});

class Commentsservice {
  // 새 인스턴스 생성
  commentrepository = new commentsrepository();

  // 댓글을 생성하는 함수
  createComment = async (postId, comment, userId) => {
    try {
      // 댓글형태가 맞는지 validate 확인
      const resultSchema = commentSchema.validate({ comment: comment });
      if (resultSchema.error) {
        return "데이터 형식이 올바르지 않습니다.";
      }

      // validate 확인후 commentrepository 에 있는 createComment 함수를 사용하여 선언
      const createcomment = await this.commentrepository.createComment(
        postId,
        comment,
        userId
      );
      return createcomment;
    } catch (error) {
      return error.name + "=" + error.errorMessage;
    }
  };

  // 댓글을 조회하는 함수
  Commentlist = async (postId) => {
    try {
      // commentrepository에 있는 Commentlist 함수를 사용하여 선언
      const comments = await this.commentrepository.Commentlist(postId);

      // 만약 조회하는 함수가 없으면 null
      if (comments.length === 0) {
        return null;
      }
      return comments;
    } catch (error) {
      return error.name + "=" + error.errorMessage;
    }
  };

  // 댓글을 수정하는 함수
  Commentedit = async (commentId, comment, userId) => {
    try {
      // 댓글 형식이 맞는지 validate 확인
      const resultSchema = commentSchema.validate({ comment: comment });
      if (resultSchema.error) {
        return "댓글 형식이 올바르지 않습니다.";
      }

      // commentrepository에 있는 Commentedit 함수를 사용하여 선언
      const Commentedit = await this.commentrepository.Commentedit(
        commentId,
        comment,
        userId
      );

      // 댓글이 없는 경우
      if (Commentedit < 1) {
        return "댓글이 존재하지 않습니다.";
      }
      return resultSchema;
    } catch (error) {
      return error.name + "=" + error.errorMessage;
    }
  };

  // 댓글 삭제하기 위한 함수
  Commentdelete = async (commentId, userId) => {
    try {
      // commentrepository에 있는 commtisExist 함수를 이용하여 선언 ( 댓글 존재 여부 )
      const isExist = await this.commentrepository.CommentisExist(commentId);

      // 만약 없다면?
      if (!isExist) {
        return "댓글이 없습니다.";
      }

      // commentrepository에 있는 Commentdelete 함수를 이용하여 선언
      const Commentdelete = await this.commentrepository.Commentdelete(
        commentId,
        userId
      );

      // 자기 댓글이 아닌 경우
      if (Commentdelete < 1) {
        return "본인만 삭제 가능합니다.";
      }

      return "댓글 삭제가 정상적으로 처리되었습니다.";
    } catch (error) {
      return error.name + "=" + error.errorMessage;
    }
  };
}

module.exports = Commentsservice;
