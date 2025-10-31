import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import '../App.css';

export default function PostView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { request } = useApi();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    request({ url: `/posts/${id}`, method: 'get' })
      .then(data => setPost(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id, request]);

  const handleDelete = async () => {
    if (!confirm('Delete this post?')) return;
    try {
      await request({ url: `/posts/${id}`, method: 'delete' });
      navigate('/');
    } catch (err) {
      // ignore, useApi sets error
    }
  };

  if (loading) return <div className="container">Loading...</div>;
  if (!post) return <div className="container">Post not found.</div>;

  return (
    <div className="container">
      <article className="post-full">
        <h1>{post.title}</h1>
        {post.image && <img className="post-full-image" src={post.image} alt={post.title} />}
        <div className="post-content">{post.content}</div>
        <div className="post-actions">
          <Link className="btn" to={`/edit/${post._id}`}>Edit</Link>
          <button className="btn" onClick={handleDelete}>Delete</button>
          <Link className="btn" to="/">Back</Link>
        </div>
      </article>
    </div>
  );
}