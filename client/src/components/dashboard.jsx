import {React, useEffect, useState} from 'react';
import { getPosts } from '../services/posts-api';
import './dashboard.css'

export default function Dashboard(props) {
  const [loaded, setLoaded] = useState(false);
  const [posts, setPosts] = useState([]);

  // Load posts
  useEffect(() => {
    getPosts().then(json => {
      console.log(json);
      setPosts(json);
    });
    setLoaded(true);
  }, []);

  // Create post elements
  const postElements = posts.map(post => {
    return (
      <div className="post">
        <p className="post__content">{post.content}</p>
        <p className="post__author">{post.author}</p>
      </div>
    );
  })

  return (
    <>
      <header>Messages</header>
      <main>
        {loaded ? postElements : <h1>Loading</h1>}
      </main>
    </>
  )
}