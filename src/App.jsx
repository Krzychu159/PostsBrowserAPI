import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [showCommentsMap, setShowCommentsMap] = useState({});
  const [search, setSearch] = useState("");

  const [formShow, setFormShow] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

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
    if (newPosts.length == 0) {
      alert("Brak wyników!");
    }
    setAllPosts(newPosts);
  };

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

        setPosts((prev) => prev.filter((post) => post.id !== postId));
        setAllPosts((prev) => prev.filter((post) => post.id !== postId));
      })
      .catch((err) => console.error(err));
  };

  const addOperation = () => {
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
      })
      .catch((err) => console.error("Błąd dodawania:", err));
    console.log("add");
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addOperation();
          }}
        >
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="body">Body</label>
          <textarea
            type="text"
            id="body"
            placeholder="body"
            rows={3}
            onChange={(e) => setBody(e.target.value)}
          />
          <button>Add!</button>
        </form>
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
        {allPosts.slice(0, 10).map((post) => (
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
        ))}
      </div>
    </>
  );
}

export default App;
