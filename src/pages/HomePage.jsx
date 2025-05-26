import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";

function HomePage() {
  const [posts, setPosts] = useState([]);

  const [comments, setComments] = useState([]);
  const [showCommentsMap, setShowCommentsMap] = useState({});
  const [search, setSearch] = useState("");

  const [formShow, setFormShow] = useState(false);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [titleTouched, setTitleTouched] = useState(false);
  const [bodyTouched, setBodyTouched] = useState(false);

  const [isSortedAZ, setIsSortedAZ] = useState(true);

  const [CommentName, setCommentName] = useState("");
  const [CommentEmail, setCommentEmail] = useState("");
  const [CommentBody, setCommentBody] = useState("");

  useEffect(() => {
    fetch("https://json-backend-posts.vercel.app/api/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);

        const visibilityMap = {};
        data.forEach((post) => {
          visibilityMap[post.id] = false;
        });
        setShowCommentsMap(visibilityMap);
      })
      .catch((error) =>
        console.error("Błąd podczas pobierania danych:", error)
      );
    fetch("https://json-backend-posts.vercel.app/api/comments")
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) =>
        console.error("Błąd podczas pobierania danych:", error)
      );
  }, []);

  const getFilteredPosts = () => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) =>
      isSortedAZ
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

    return sorted;
  };

  const toggleComments = (id) => {
    setShowCommentsMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const deletePost = (id) => {
    if (!window.confirm("Definitely remove the post?")) return;

    fetch(`https://json-backend-posts.vercel.app/api/posts/${id}`, {
      method: "DELETE",
    }).then(() => {
      setPosts((prev) => prev.filter((post) => post.id !== id));
    });
  };

  const addOperation = () => {
    if (body.trim() === "" || title.trim() === "") {
      alert("Empty fields!");
    } else {
      fetch("https://json-backend-posts.vercel.app/api/posts", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("added: ", data);
          alert("Post added correctly!");
          setPosts((prev) => [...prev, data]);
          setSearch("");
        })
        .catch((err) => console.error("Błąd dodawania:", err));
      setTitle("");
      setBody("");
      setFormShow(false);
    }
  };

  const addComment = (PostId) => {
    if (
      CommentName.trim() === "" ||
      CommentEmail.trim() === "" ||
      CommentBody.trim() === ""
    ) {
      alert("Empty fields!");
    } else {
      fetch("https://json-backend-posts.vercel.app/api/comments", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: CommentName,
          body: CommentBody,
          email: CommentEmail,
          postId: PostId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("added comment: ", data);
          alert("Comment added correctly!");
          setComments((prev) => [...prev, data]);
        })
        .catch((err) => console.error("Błąd dodawania:", err));
      setCommentName("");
      setCommentEmail("");
      setCommentBody("");
    }
  };

  useEffect(() => {
    console.log("posts zmieniły się:", posts);
  }, [posts]);

  return (
    <>
      <header>
        <h1>Posts</h1>
        <button
          onClick={() => {
            setFormShow((prev) => !prev);
          }}
          className="addButton"
        >
          + Add
        </button>
      </header>

      {formShow ? (
        <PostForm
          title={title}
          body={body}
          setTitle={setTitle}
          setBody={setBody}
          titleTouched={titleTouched}
          setTitleTouched={setTitleTouched}
          bodyTouched={bodyTouched}
          setBodyTouched={setBodyTouched}
          addOperation={addOperation}
          setFormShow={setFormShow}
          setPosts={setPosts}
        />
      ) : null}

      <div className="navigation">
        <input
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
          placeholder="Title"
        />
        <button onClick={() => setIsSortedAZ((prev) => !prev)}>
          Sort {isSortedAZ ? "Z-A" : "A-Z"}
        </button>
      </div>
      <PostList
        posts={getFilteredPosts()}
        comments={comments}
        onDelete={deletePost}
        onToggleComments={toggleComments}
        showCommentsMap={showCommentsMap}
        onAddComment={addComment}
        setCommentBody={setCommentBody}
        setCommentEmail={setCommentEmail}
        setCommentName={setCommentName}
        commentBody={CommentBody}
        commentEmail={CommentEmail}
        commentName={CommentName}
      />
    </>
  );
}

export default HomePage;
