const PostRepository = require("../repositories/posts");

class PostService {
  postRepository = new PostRepository();

  // 게시글 목록
  findAllPost = async () => { 
    const allPost = await this.postRepository.findAllPost({});

    allPost.sort((a, b) => { 
      return b.createdAt - a.createdAt;
    });
    return allPost
  };

  // 특정 게시글 조회
  findPostById = async (postId) => {
    try{
      const findPost = await this.postRepository.findPostById(postId);

      return findPost;
    } catch(Err) {
      throw new Error("게시물이 더 이상 존재하지 않습니다.");
    }    
  };

  // 게시글 생성
  createPost = async (userId, nickname, title, content) => {
    const createPostData = await this.postRepository.createPost(
      userId,
      nickname,
      title,
      content
    );
    return createPostData
    
  };

  // 게시글 수정
  updatePost = async (postId, nickname, title, content) => {

    const [updatePost] = await this.postRepository.updatePost(postId, nickname, title, content);
    if(updatePost) {
      return { 'msg' : '수정완료' };
    }else {
      throw new Error('게시글이 없거나 수정 불가')
    }
  };

  // 게시글 삭제
  deletePost = async (postId, nickname) => {
    const deletePost =  await this.postRepository.deletePost(postId, nickname);
    if (!deletePost) {
      throw new Error('게시글이 없거나 삭제 불가')
    } else {
      return { 'msg' : '삭제완료' };
    }
  };
}

module.exports = PostService;
