import { useState } from "react";

const CommentList = ({ comments, post, showCommentsMap }) => {
  const [showForm, setShowForm] = useState(false);
  return (
    <ul>
      {comments &&
        comments
          .filter((comment) => comment.postId === post.id)
          .slice(0, showCommentsMap?.[post.id] ? 5 : 2)
          .map((comment) => (
            <li className="comment" key={comment.id}>
              <div className="comment-header">
                <div className="name">{comment.name}</div>
                <div className="email">{comment.email}</div>
              </div>
              <div className="c-body">{comment.body}</div>
            </li>
          ))}
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
            <div className="c-body ">
              <input type="text" placeholder="Your comment..." />
              <input type="text" placeholder="Your email..." />
              <input type="text" placeholder="Your name..." />
              <button>Add!</button>
            </div>
          </>
        )}
      </li>
    </ul>
  );
};

export default CommentList;
