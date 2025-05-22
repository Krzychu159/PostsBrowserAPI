import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostForm from "../components/PostForm";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [showCommentsMap, setShowCommentsMap] = useState({});
  const [search, setSearch] = useState("");

  const [formShow, setFormShow] = useState(false);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [titleTouched, setTitleTouched] = useState(false);
  const [bodyTouched, setBodyTouched] = useState(false);

  useEffect(() => {
    fetch("https://json-backend-posts.vercel.app/api/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setAllPosts(data);
        const visibilityMap = {};
        data.forEach((post) => {
          visibilityMap[post.id] = false;
          setShowCommentsMap(visibilityMap);
        });
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

  const searchOperation = (search) => {
    const newPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );

    setAllPosts(newPosts);
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
          setAllPosts((prev) => [...prev, data]);
        })
        .catch((err) => console.error("Błąd dodawania:", err));
      setTitle("");
      setBody("");
      setFormShow(false);
    }
  };

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
        />
      ) : null}

      <div className="navigation">
        <input
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
            searchOperation(e.target.value);
          }}
          value={search}
          placeholder="Title"
        />
        <button>Sort A-Z</button>
      </div>
      <div className="posts">
        {allPosts.length === 0 ? (
          <p>Brak postów do wyświetlenia.</p>
        ) : (
          allPosts.map((post) => (
            <div className="post" key={post.id}>
              <p className="title">{post.title}</p>
              <p className="p-body">{post.body}</p>
              {comments
                .filter((comment) => comment.postId === post.id)
                .slice(0, showCommentsMap[post.id] ? 5 : 2)
                .map((comment) => (
                  <li className="comment" key={comment.id}>
                    <div className="name">{comment.name}</div>
                    <div className="c-body">{comment.body}</div>
                  </li>
                ))}

              <div className="buttons">
                <button
                  onClick={() =>
                    setShowCommentsMap((prev) => ({
                      ...prev,
                      [post.id]: !prev[post.id],
                    }))
                  }
                >
                  {showCommentsMap[post.id] ? "Hide comments" : "Show comments"}
                </button>
                <button>Add Comment</button>
                <Link to={`/post/${post.id}`} className="link-button">
                  <button>View Post</button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default HomePage;
