import { React } from 'react';
import './post-list.css'

export default function PostList({ posts, handleDelete, handleVote }) {

  const postElements = posts.sort((a,b) => b.votes - a.votes).map(post => {
    return (
      <div className="post" key={post.id}>
        <div className="post__vote">
          <button className="post__vote--button" onClick={(e) => { handleVote(post.id, 'up') }}>
            <i className="post__vote--up fas fa-caret-up"></i>
          </button>
          <span>{post.votes}</span>
          <button className="post__vote--button" onClick={(e) => { handleVote(post.id, 'down') }} >
            <i className="post__vote--down fas fa-caret-down"></i>
          </button>
        </div>
        <div className="post__details">
          <p className="post__content">{post.content}</p>
          <p className="post__author">{post.author}</p>
        </div>
        <button className="post__delete" onClick={(e) => { handleDelete(post.id) }}>
          <i className="fas fa-trash"></i>
        </button>
      </div>
    );
  })

  return (
    <div className="post-list">
      {postElements}
    </div>
  )
}