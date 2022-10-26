const Comments = require("../services/comments");
const Joi = require("joi");
const RE_COMMENT = /^[\s\S]{1,255}$/; // 댓글 정규 표현식

const commentSchema = Joi.object({
  comment: Joi.string().pattern(RE_COMMENT).required(),
});

class Commentscontroller {
  // 인스턴스 생성
  commentsservice = new Comments();

  // 댓글을 생성하는 함수
  createComment = async (req, res, next) => {
    try {
      // 경로 받아오기
      const { postId } = req.params;

      // 입력값 받아오기
      const { comment } = req.body;

      // 로그인한 계정 userId 받기
      const { userId } = res.locals.user;

      // commentsservice에 있는 createComment 함수를 받아와서 선언
      const createcomments = await this.commentsservice.createComment(
        postId,
        comment,
        userId
      );

      // 성공 : 선언한 값을 보내기, 실패 : 에러 메세지 보내기
      res.json({ createcomments });
    } catch (error) {
      return res.status(400).send({
        errorMessage: error.name + "=" + error.errorMessage,
      });
    }
  };

  // 댓글이 달린 함수를 조회
  Commentlist = async (req, res, next) => {
    try {
      // 경로 받아오기
      const { postId } = req.params;

      // commentsservice안에 있는 Commentlist 함수를 받아와서 선언
      const comments = await this.commentsservice.Commentlist(postId);

      // 댓글이 있는지 없는지 확인
      if (comments === null) {
        return res
          .status(400)
          .json({ message: "없는 게시물 이거나 댓글이 없습니다." });
      }
      const comment = comments.sort((a, b) => b.createdAt - a.createdAt);

      // 성공 : 선언한 값을 보내기, 실패 : 에러 메세지 보내기
      return res.status(200).json({ message: comment });
    } catch (error) {
      return res.status(400).send({
        errorMessage: error.name + "=" + error.errorMessage,
      });
    }
  };

  // 댓글을 수정하는 함수
  Commentedit = async (req, res, next) => {
    try {
      // 받아오는 값이 댓글 형태가 맞는지 validate 확인
      const resultSchema = commentSchema.validate(req.body);

      // 경로 받아오기
      const { commentId } = req.params;

      // validate가 맞다면 받아오기
      const { comment } = resultSchema.value;

      // 로그인 계정 userID 받아오기
      const { userId } = res.locals.user;

      // commentsservice안에 있는 Commentedit 함수를 이용하여 선언
      const Commentedit = await this.commentsservice.Commentedit(
        commentId,
        comment,
        userId
      );

      // 성공 : 선언한 값을 보내기, 실패 : 에러 메세지 보내기
      res.status(200).json({ message: Commentedit });
    } catch (error) {
      return res.status(400).send({
        errorMessage: error.name + "=" + error.errorMessage,
      });
    }
  };

  // 댓글을 삭제하는 함수
  Commentdelete = async (req, res, next) => {
    try {
      // 경로 받기
      const { commentId } = req.params;

      // 로그인한 계정 userId 받기
      const { userId } = res.locals.user;

      // commentsservice안에 있는 Cemmentdelete 함수를 받아와서 선언
      const Commentdelete = await this.commentsservice.Commentdelete(
        commentId,
        userId
      );

      // 성공 : 선언한 값을 보내기, 실패 : 에러 메세지 보내기
      res.status(201).json({ message: Commentdelete });
    } catch (error) {
      return res.status(400).send({
        errorMessage: error.name + "=" + error.errorMessage,
      });
    }
  };
}

module.exports = Commentscontroller;
