import { Link } from "react-router-dom";
import CommentList from "./CommentList";
import like from "../assets/like.png";
import { useState } from "react";

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
  const [likes, setLikes] = useState(post.likes);
  const [isLiking, setIsLiking] = useState(false);

  const addLikes = async () => {
    const newLikes = likes + 1;

    setLikes(newLikes);
    setIsLiking(true);

    try {
      const response = await fetch(
        `https://json-backend-posts.vercel.app/api/posts/${post.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ likes: newLikes }),
        }
      );

      if (!response.ok) {
        throw new Error("Error updating the number of likes");
      }

      const updatedPost = await response.json();
      console.log("Backend checked:", updatedPost);
    } catch (error) {
      console.error("You can't like this post now:", error);

      setLikes((prev) => prev - 1);
      alert("You can't like this post now");
    } finally {
      setIsLiking(false);
    }
  };

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

      <div className="buttons" onClick={() => addLikes()}>
        <div className="likes">
          <img src={like} alt="like" />
          <p>{likes}</p>
          {isLiking && <span className="loader">⏳</span>}
        </div>{" "}
        <button onClick={() => onToggleComments(post.id)}>
          Toggle comments
        </button>
        <button onClick={() => onDelete(post.id)}>Delete </button>
        {viewPost ? (
          <Link to={`/post/${post.id}`} className="link-button">
            <button>View Post</button>
          </Link>
        ) : (
          <button>Edit </button>
        )}
      </div>
    </div>
  );
};

export default PostItem;
