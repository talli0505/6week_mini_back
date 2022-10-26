const PostRepository = require("../repositories/posts");

class PostService {
  // 새 인스턴스 생성
  postRepository = new PostRepository();

  // 게시글 목록 조회
  findAllPost = async () => {
    
    // postRepository 에 있는 findAllPost 함수를 가져와서 선언
    const allPost = await this.postRepository.findAllPost({});

    // 선언한 allPost를 내림차순으로 선언
    allPost.sort((a, b) => { 
      return b.createdAt - a.createdAt;
    });
    return allPost
  };

  // 특정 게시글 조회
  findPostById = async (postId) => {
    try{
      // postRepository 에 있는 findPostById 함수를 가져와서 선언
      const findPost = await this.postRepository.findPostById(postId);

      return findPost;
    } catch(Err) {
      throw new Error("게시물이 더 이상 존재하지 않습니다.");
    }    
  };

  // 게시글 생성
  createPost = async (userId, nickname, title, content) => {
    // postRepository 에 있는 createPost 함수를 가져와서 선언
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

    // postRepository 에 있는 updatePost 함수를 가져와서 선언
    const [updatePost] = await this.postRepository.updatePost(postId, nickname, title, content);

    // 있으면 수정완료, 없으면 Error
    if(updatePost) {
      return { 'msg' : '수정완료', 
      nickname : nickname, 
      title : title, 
      content : content }; 
    }else {
      throw new Error('게시글이 없거나 수정 불가')
    }
  };

  // 게시글 삭제
  deletePost = async (postId, nickname) => {
    // postRepository 에 있는 deletePost 함수를 가져와서 선언
    const deletePost =  await this.postRepository.deletePost(postId, nickname);

    // 있으면 수정완료, 없으면 Error
    if (!deletePost) {
      throw new Error('게시글이 없거나 삭제 불가')
    } else {
      return { 'msg' : '삭제완료' };
    }
  };
}

module.exports = PostService;