import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [showCommentsMap, setShowCommentsMap] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
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
    fetch("https://jsonplaceholder.typicode.com/comments")
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

  return (
    <>
      <h1>Posts</h1>
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
              <button>See post</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
