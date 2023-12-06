import React, { useState } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const addPost = () => {
    const newPost = { title, content };
    setPosts([...posts, newPost]);
    setTitle('');
    setContent('');
  };

  const editPost = (index) => {
    const newPosts = [...posts];
    newPosts[index].title = title;
    newPosts[index].content = content;
    setPosts(newPosts);
    setTitle('');
    setContent('');
  };

  const deletePost = (index) => {
    const newPosts = [...posts];
    newPosts.splice(index, 1);
    setPosts(newPosts);
  };

  return (
    <div className="App">
      <h1 className="App-header">Social Media Simple</h1>
      <form className="App-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <br />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <button type="button" onClick={addPost}>
          Post
        </button>
      </form>
      <div className="App-posts">
        {posts.map((post, index) => (
          <div className="App-post" key={index}>
            <h2 className="App-post-title">{post.title}</h2>
            <p className="App-post-content">{post.content}</p>
            <div className="App-post-actions">
              <button className="App-post-action" onClick={() => editPost(index)}>
                Edit
              </button>
              <button className="App-post-action" onClick={() => deletePost(index)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
