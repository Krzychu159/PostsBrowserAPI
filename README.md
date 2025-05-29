# 📘 Posts Browser – React CRUD App with JSON API

[🔗 Live demo](https://posts-browser-api.vercel.app/)

A simple CRUD application built with **React** and **React Router**, allowing users to browse, add, like, delete, and comment on posts. This is my first project working with a REST API.

---

## ⚙️ Tech Stack

- ⚛️ React (with hooks)
- 🔁 React Router
- 🌐 Fetch API
- 🗄️ JSON server (mock backend)
- 🎨 Custom CSS (minimum)

---

## ✨ Features

- View a list of posts from an external API
- Filter and sort posts by title
- Add a new post with form validation
- View post details on a separate route
- Add comments to individual posts
- Like posts (PATCH update to backend)
- Toggle comment visibility
- Delete posts

---

## 📂 Folder Structure

```
src/
├── components/
│   ├── PostForm.jsx
│   ├── PostItem.jsx
│   ├── PostList.jsx
│   ├── CommentList.jsx
│   └── CommentAdd.jsx
├── pages/
│   ├── HomePage.jsx
│   └── PostPage.jsx
├── App.jsx
└── main.jsx
```

---

## 🚀 What I Learned

- Building dynamic interfaces with React and conditional rendering
- Creating reusable and modular components
- Managing forms and validation with `useState`
- Interacting with a REST API (GET, POST, DELETE, PATCH)
- Routing and navigation using `react-router-dom`
- Basic state and side-effect handling with `useEffect`

---

## 🛠️ Getting Started

To run this project locally:

```bash
git clone https://github.com/your-username/posts-browser.git
cd posts-browser
npm install
npm run dev
```

Make sure to use [Vite](https://vitejs.dev/) or adapt scripts accordingly if you're not using it.

---

## 📌 Notes

This project uses a mock backend hosted on Vercel via [json-backend-posts.vercel.app](https://json-backend-posts.vercel.app/).

---
