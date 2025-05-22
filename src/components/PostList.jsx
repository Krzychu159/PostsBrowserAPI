import PostItem from "./PostItem";

const PostList = ({ posts, comments, onDelete, onToggleComments }) => {
  if (posts.length === 0) return <p>Brak postów do wyświetlenia.</p>;

  return (
    <div className="posts">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          comments={comments}
          onDelete={onDelete}
          onToggleComments={onToggleComments}
        />
      ))}
    </div>
  );
};

export default PostList;
