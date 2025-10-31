import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default function Nav() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="brand">My Blog</Link>
        <nav>
          <Link className="nav-link" to="/">Posts</Link>
          <Link className="nav-link btn primary" to="/create">Create</Link>
        </nav>
      </div>
    </header>
  );
}