// src/components/CreatePost.js
import React, { useState } from 'react';
import axios from 'axios';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/posts', {
        title,
        content,
      });
      alert('Post created successfully!');
      console.log(res.data);
    } catch (err) {
      console.error('Error creating post:', err);
      alert('Failed to create post.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Create Post</button>
    </form>
  );
}

export default CreatePost;
