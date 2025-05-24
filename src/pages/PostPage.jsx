import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState();

  useEffect(() => {
    fetch(`https://json-backend-posts.vercel.app/api/posts/${id}`).then(
      (response) =>
        response.json().then((data) => {
          setPost(data);
        })
    );
    fetch("https://json-backend-posts.vercel.app/api/comments")
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) =>
        console.error("Błąd podczas pobierania danych:", error)
      );
  }, [id]);

  const deleteOperation = (postId) => {
    if (!window.confirm("Definitely remove the post?")) return;

    fetch(`https://json-backend-posts.vercel.app/api/posts/${postId}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error delete");
        console.log("deleted");
        setPost(null);
      })
      .catch((err) => console.error(err));
  };

  if (!post) return <p>Loading post...</p>;
  return (
    <div className="post">
      <Link to="/">
        <button className="back-button">← Back to Home</button>
      </Link>
      <div className="title">{post.title}</div>
      <div className="body">{post.body}</div>
      {comments &&
        comments
          .filter((comment) => comment.postId === post.id)

          .map((comment) => (
            <li className="comment" key={comment.id}>
              <div className="name">{comment.name}</div>
              <div className="c-body">{comment.body}</div>
            </li>
          ))}
      <div className="buttons">
        <button
          onClick={() => {
            deleteOperation(post.id);
          }}
        >
          Delete Post
        </button>
        <button>Edit Post</button>
      </div>
    </div>
  );
}

export default PostPage;
