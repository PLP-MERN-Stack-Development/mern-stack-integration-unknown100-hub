import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import '../App.css';

export default function PostForm({ edit }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { request } = useApi();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (edit && id) {
      setLoading(true);
      request({ url: `/posts/${id}`, method: 'get' })
        .then(data => {
          setTitle(data.title || '');
          setContent(data.content || '');
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [edit, id, request]);

  const submit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const fd = new FormData();
    fd.append('title', title);
    fd.append('content', content);
    if (image) fd.append('image', image);

    try {
      if (edit && id) {
        // Do NOT set Content-Type here; axios will add the proper multipart boundary
        await request({ url: `/posts/${id}`, method: 'put', data: fd });
      } else {
        await request({ url: '/posts', method: 'post', data: fd });
      }
      navigate('/');
    } catch (err) {
      // error is handled by useApi hook (sets error state)
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="container">Loading post...</div>;

  return (
    <div className="container form-wrapper">
      <form className="post-form" onSubmit={submit}>
        <label className="label">Title</label>
        <input className="input" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />

        <label className="label">Content</label>
        <textarea className="textarea" value={content} onChange={e => setContent(e.target.value)} placeholder="Content" required />

        <label className="label">Featured Image (optional)</label>
        <input className="file-input" type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />

        <div className="form-actions">
          <button className="btn primary" type="submit" disabled={submitting}>
            {submitting ? (edit ? 'Updating...' : 'Creating...') : (edit ? 'Update' : 'Create')}
          </button>
          <button className="btn" type="button" onClick={() => navigate(-1)} disabled={submitting}>Cancel</button>
        </div>
      </form>
    </div>
  );
}