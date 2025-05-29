import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PostItem from "../components/PostItem";

function PostPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  const [commentBody, setCommentBody] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentName, setCommentName] = useState("");
  const [showCommentsMap, setShowCommentsMap] = useState({});

  useEffect(() => {
    fetch(`https://json-backend-posts.vercel.app/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setShowCommentsMap({ [data.id]: true });
      });

    fetch("https://json-backend-posts.vercel.app/api/comments")
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [id]);

  const deletePost = (postId) => {
    if (!window.confirm("Definitely remove the post?")) return;

    fetch(`https://json-backend-posts.vercel.app/api/posts/${postId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error delete");
        setPost(null);
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  const toggleComments = (postId) => {
    setShowCommentsMap((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const addComment = (postId) => {
    if (
      commentName.trim() === "" ||
      commentEmail.trim() === "" ||
      commentBody.trim() === ""
    ) {
      alert("Empty fields!");
      return;
    }

    fetch("https://json-backend-posts.vercel.app/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: commentName,
        email: commentEmail,
        body: commentBody,
        postId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setComments((prev) => [...prev, data]);
        setCommentBody("");
        setCommentEmail("");
        setCommentName("");
      });
  };

  if (!post) return <p>Loading post...</p>;

  return (
    <>
      <Link to="/">
        <button className="back-button">← Back to Home</button>
      </Link>

      <PostItem
        post={post}
        comments={comments}
        onDelete={deletePost}
        onToggleComments={toggleComments}
        showCommentsMap={showCommentsMap}
        onAddComment={addComment}
        setCommentBody={setCommentBody}
        setCommentEmail={setCommentEmail}
        setCommentName={setCommentName}
        commentBody={commentBody}
        commentEmail={commentEmail}
        commentName={commentName}
      />
    </>
  );
}

export default PostPage;
