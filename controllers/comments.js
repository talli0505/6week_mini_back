const Comments = require("../services/comments");
const Joi = require("joi");
const RE_COMMENT = /^[\s\S]{1,255}$/; // 댓글 정규 표현식

const commentSchema = Joi.object({
  comment: Joi.string().pattern(RE_COMMENT).required(),
});

class Commentscontroller {
  commentsservice = new Comments();
  createComment = async (req, res, next) => {
    try {
      if (res.locals.user === undefined) {
        return res.status(401).send("로그인이 필요합니다.");
      }
      const { postId } = req.params;
      const { comment } = req.body;
      const { userId } = res.locals.user;

      const createcomments = await this.commentsservice.createComment(
        postId,
        comment,
        userId
      );
      res.json({ createcomments });
    } catch (error) {
      return res.status(400).send({
        errorMessage: error.name + "=" + error.errorMessage,
      });
    }
  };

  Commentlist = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const comments = await this.commentsservice.Commentlist(postId);
      if (comments === null) {
        return res
          .status(400)
          .json({ message: "없는 게시물 이거나 댓글이 없습니다." });
      }
      const comment = comments.sort((a, b) => b.createdAt - a.createdAt);
      console.log(comment);
      return res.status(200).json({ message: comment });
    } catch (error) {
      return res.status(400).send({
        errorMessage: error.name + "=" + error.errorMessage,
      });
    }
  };

  Commentedit = async (req, res, next) => {
    try {
      if (res.locals.user === undefined) {
        return res.status(401).send("로그인이 필요합니다.");
      }
      const resultSchema = commentSchema.validate(req.body);
      const { commentId } = req.params;
      const { comment } = resultSchema.value;
      const { userId } = res.locals.user;
      const Commentedit = await this.commentsservice.Commentedit(
        commentId,
        comment,
        userId
      );
      res.status(200).json({ message: Commentedit });
    } catch (error) {
      return res.status(400).send({
        errorMessage: error.name + "=" + error.errorMessage,
      });
    }
  };

  Commentdelete = async (req, res, next) => {
    try {
      if (res.locals.user === undefined) {
        return res.status(401).send("로그인이 필요합니다.");
      }
      const { commentId } = req.params;
      const { userId } = res.locals.user;
      const Commentdelete = await this.commentsservice.Commentdelete(
        commentId,
        userId
      );
      res.status(201).json({ message: Commentdelete });
    } catch (error) {
      return res.status(400).send({
        errorMessage: error.name + "=" + error.errorMessage,
      });
    }
  };
}

module.exports = Commentscontroller;
