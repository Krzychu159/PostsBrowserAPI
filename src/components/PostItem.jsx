import { Link } from "react-router-dom";

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

      {comments &&
        comments
          .filter((comment) => comment.postId === post.id)
          .slice(0, showCommentsMap?.[post.id] ? 5 : 2)

          .map((comment) => (
            <li className="comment" key={comment.id}>
              <div className="name">{comment.name}</div>
              <div className="c-body">{comment.body}</div>
            </li>
          ))}

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
