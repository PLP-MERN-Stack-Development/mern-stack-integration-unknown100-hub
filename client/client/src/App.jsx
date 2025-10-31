import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import PostList from './components/PostList';
import PostView from './components/PostView';
import PostForm from './components/PostForm';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/post/:id" element={<PostView />} />
          <Route path="/create" element={<PostForm />} />
          <Route path="/edit/:id" element={<PostForm edit />} />
        </Routes>
      </main>
    </div>
  );
}