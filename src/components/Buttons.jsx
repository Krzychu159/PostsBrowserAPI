const Buttons = ({ post, onDelete, onToggleComments }) => {
  return (
    <div className="buttons">
      <button onClick={() => onToggleComments(post.id)}>
        {post.showComments ? "Hide comments" : "Show comments"}
      </button>
      <button onClick={() => onDelete(post.id)}>Delete Post</button>
    </div>
  );
};

export default Buttons;
