import { useState } from "react";

const CommentAdd = ({
  onAddComment,
  setCommentBody,
  setCommentEmail,
  setCommentName,
  postId,
}) => {
  const [showForm, setShowForm] = useState(false);
  return (
    <li
      className="comment add-comment"
      onClick={() => {
        setShowForm(true);
      }}
    >
      {!showForm ? (
        <>
          <div className="name">Add comment here!</div>
          <div className="c-body ">
            <input type="text" placeholder="Your comment..." />
          </div>
        </>
      ) : (
        <>
          <div className="name">Add comment here!</div>
          <form
            className="c-body "
            onSubmit={(e) => {
              e.preventDefault();
              onAddComment(postId);
              console.log("post id: " + postId);
            }}
          >
            <input
              type="text"
              placeholder="Your comment..."
              onChange={(e) => setCommentBody(e.target.value)}
            />
            <input
              type="text"
              placeholder="Your email..."
              onChange={(e) => setCommentEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Your name..."
              onChange={(e) => setCommentName(e.target.value)}
            />
            <button>Add!</button>
          </form>
        </>
      )}
    </li>
  );
};

export default CommentAdd;
