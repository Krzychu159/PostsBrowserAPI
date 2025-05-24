const PostForm = ({
  title,
  body,
  setTitle,
  setBody,

  titleTouched,
  bodyTouched,
  setTitleTouched,
  setBodyTouched,
  setPosts,
  setFormShow,
}) => {
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
        })
        .catch((err) => console.error("Błąd dodawania:", err));
      setTitle("");
      setBody("");
      setFormShow(false);
    }
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addOperation();
        }}
      >
        <label htmlFor="title">Title</label>
        <div className="complete">
          {titleTouched
            ? title.trim() === ""
              ? "Complete title!"
              : null
            : null}
        </div>
        <input
          type="text"
          id="title"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
          onClick={() => setTitleTouched(true)}
          value={title}
          className={
            titleTouched ? (title.trim() === "" ? "empty" : null) : null
          }
        />
        <label htmlFor="body">Body</label>
        <div className="complete">
          {bodyTouched ? (body.trim() === "" ? "Complete body!" : null) : null}
        </div>
        <textarea
          type="text"
          id="body"
          placeholder="body"
          rows={3}
          onChange={(e) => setBody(e.target.value)}
          onClick={() => setBodyTouched(true)}
          value={body}
          className={bodyTouched ? (body.trim() === "" ? "empty" : null) : null}
        />
        <button>Add!</button>
      </form>
    </>
  );
};

export default PostForm;
