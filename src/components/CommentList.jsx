import CommentAdd from "./CommentAdd";

const CommentList = ({
  comments,
  post,
  showCommentsMap,
  onAddComment,
  setCommentBody,
  setCommentEmail,
  setCommentName,
}) => {
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

      <CommentAdd
        onAddComment={onAddComment}
        setCommentBody={setCommentBody}
        setCommentEmail={setCommentEmail}
        setCommentName={setCommentName}
        postId={post.id}
      />
    </ul>
  );
};

export default CommentList;
