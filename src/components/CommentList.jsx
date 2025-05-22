const CommentList = ({ postId, comments, showAll }) => {
  const filtered = comments.filter((comment) => comment.postId === postId);
  const visible = showAll ? filtered.slice(0, 5) : filtered.slice(0, 2);

  return (
    <ul>
      {visible.map((comment) => (
        <li className="comment" key={comment.id}>
          <div className="name">{comment.name}</div>
          <div className="c-body">{comment.body}</div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
