import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import '../App.css';

export default function PostList() {
  const { request } = useApi();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    request({ url: '/posts', method: 'get' })
      .then(data => { if (mounted) setPosts(data); })
      .catch(() => {})
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [request]);

  if (loading) return <div className="container">Loading posts...</div>;
  if (!posts.length) return <div className="container">No posts yet. Create one.</div>;

  return (
    <div className="container">
      <div className="header-row">
        <h2>Posts</h2>
        <Link className="btn" to="/create">Create Post</Link>
      </div>
      <div className="posts-grid">
        {posts.map(p => (
          <article className="post-card" key={p._id}>
            {p.image && <img className="post-image" src={p.image} alt={p.title} />}
            <div className="post-body">
              <h3 className="post-title">{p.title}</h3>
              <p className="post-excerpt">{p.content?.slice(0, 200)}</p>
              <div className="post-meta">
                <Link className="small-link" to={`/post/${p._id}`}>Read more</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}