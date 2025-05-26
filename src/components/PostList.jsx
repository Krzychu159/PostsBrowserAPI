import PostItem from "./PostItem";

const PostList = ({
  posts,
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
}) => {
  return (
    <div className="posts">
      {posts.length === 0 ? (
        <p className="no-posts">No posts</p>
      ) : (
        posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            comments={comments}
            onDelete={onDelete}
            onToggleComments={onToggleComments}
            showCommentsMap={showCommentsMap}
            onAddComment={onAddComment}
            setCommentBody={setCommentBody}
            setCommentEmail={setCommentEmail}
            setCommentName={setCommentName}
            commentBody={commentBody}
            commentEmail={commentEmail}
            commentName={commentName}
          />
        ))
      )}
    </div>
  );
};

export default PostList;
