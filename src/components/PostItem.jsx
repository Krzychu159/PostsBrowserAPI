import { Link } from "react-router-dom";
import CommentList from "./CommentList";
import { FaThumbsUp } from "react-icons/fa";
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
  const [liked, setLiked] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

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
      setLiked(true);
    }
  };

  const editOperation = () => {
    if (body.trim() === "" || title.trim() === "") {
      alert("Empty fields!");
    } else {
      fetch(`https://json-backend-posts.vercel.app/api/posts/${post.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      })
        .then((response) => {
          if (response.ok) {
            alert("Nice!");
          } else {
            alert("Error!");
          }
        })
        .catch(() => {
          alert("Error!");
        });

      setIsEditing(false);
    }
  };

  if (!post) return null;

  return (
    <div className="post">
      <form
        className="edit"
        onSubmit={(e) => {
          e.preventDefault();
          editOperation();
        }}
      >
        {!isEditing ? (
          <p className="title">{title}</p>
        ) : (
          <div>
            <p>Change title</p>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
        )}

        {!isEditing ? (
          <div className="p-body">{body}</div>
        ) : (
          <div>
            <p>Change body</p>
            <textarea
              rows={3}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </div>
        )}

        {!isEditing ? null : <button>Save!</button>}
      </form>

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
        <div
          className="likes"
          onClick={() => {
            if (!liked) addLikes();
          }}
        >
          <FaThumbsUp color={liked ? "blue" : "gray"} size={20} />

          <p className={liked ? "liked" : null}>{likes}</p>
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
          <button onClick={() => setIsEditing((prev) => !prev)}>Edit</button>
        )}
      </div>
    </div>
  );
};

export default PostItem;
