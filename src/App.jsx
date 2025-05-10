import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  const [showCommentsMap, setShowCommentsMap] = useState({});

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
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

  return (
    <>
      <h1>Posts</h1>
      <div className="posts">
        {posts.slice(1, 6).map((post) => (
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
