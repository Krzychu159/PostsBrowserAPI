import CommentList from "./CommentList";
import Buttons from "./Buttons";
import { Link } from "react-router-dom";

const PostItem = ({ post, comments, onDelete, onToggleComments }) => {
  return (
    <div className="post">
      <p className="title">{post.title}</p>
      <p className="p-body">{post.body}</p>

      <CommentList
        postId={post.id}
        comments={comments}
        showAll={post.showComments}
      />

      <Buttons
        post={post}
        onDelete={onDelete}
        onToggleComments={onToggleComments}
      />

      <Link to={`/post/${post.id}`}>
        <button>View Post</button>
      </Link>
    </div>
  );
};

export default PostItem;
