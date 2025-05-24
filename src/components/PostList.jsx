import PostItem from "./PostItem";

const PostList = ({
  posts,
  comments,
  onDelete,
  onToggleComments,
  showCommentsMap,
}) => {
  if (posts.length === 0) return <p>Brak postów do wyświetlenia.</p>;

  return (
    <div className="posts">
      {posts.length === 0 ? (
        <p>Brak postów do wyświetlenia.</p>
      ) : (
        posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            comments={comments}
            onDelete={onDelete}
            onToggleComments={onToggleComments}
            showCommentsMap={showCommentsMap}
          />
        ))
      )}
    </div>
  );
};

export default PostList;
