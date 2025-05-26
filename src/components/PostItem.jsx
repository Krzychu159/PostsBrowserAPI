import { Link } from "react-router-dom";
import CommentList from "./CommentList";

const PostItem = ({
  post,
  comments,
  onDelete,
  onToggleComments,
  showCommentsMap,
  onAddComment,
  setCommentBody,
  setCommentEmail,
  setCommentName,
  commentBody,
  commentEmail,
  commentName,
  viewPost,
}) => {
  if (!post) return null;

  return (
    <div className="post">
      <p className="title">{post.title}</p>
      <p className="p-body">{post.body}</p>

      <CommentList
        comments={comments}
        post={post}
        showCommentsMap={showCommentsMap}
        onAddComment={onAddComment}
        setCommentBody={setCommentBody}
        setCommentEmail={setCommentEmail}
        setCommentName={setCommentName}
        commentBody={commentBody}
        commentEmail={commentEmail}
        commentName={commentName}
      />

      <div className="buttons">
        <button onClick={() => onToggleComments(post.id)}>
          Toggle comments
        </button>
        <button onClick={() => onDelete(post.id)}>Delete post</button>
        {viewPost ? (
          <Link to={`/post/${post.id}`} className="link-button">
            <button>View Post</button>
          </Link>
        ) : (
          <button>Edit post</button>
        )}
      </div>
    </div>
  );
};

export default PostItem;
