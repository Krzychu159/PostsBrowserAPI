import { Link } from "react-router-dom";
import CommentList from "./CommentList";

const PostItem = ({
  post,
  comments,
  onDelete,
  onToggleComments,
  showCommentsMap,
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
      />

      <div className="buttons">
        <button onClick={() => onToggleComments(post.id)}>
          Toggle Comments
        </button>
        <button onClick={() => onDelete(post.id)}>Delete</button>
        <Link to={`/post/${post.id}`} className="link-button">
          <button>View Post</button>
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
