import { React, useEffect, useState } from 'react';
import { getPosts, postOne, deleteOne, putVote } from '../../services/posts-api';
import PostList from '../post-list/post-list';
import PostForm from '../post-form/post-form';
import './dashboard.css'

export default function Dashboard(props) {
  const [loaded, setLoaded] = useState(false);
  const [posts, setPosts] = useState([]);

  const sumbitPostHandler = (e, content, author) => {
    postOne({author, content})
      .then(res => setPosts(prior => [...prior, res]));
  }
  const deletePostHandler = (id) => {
    deleteOne(id)
      .then(() => setPosts(prior => prior.filter(p => p.id !== id)));
  }
  const voteHandler = (id, vote) => {
    putVote(id, vote)
      .then((res) => setPosts(prior => {
        const votePost = prior.find(p => p.id === id);
        votePost.votes = res.votes;
        return [...prior];
      }
      ));
  }

  // Load posts
  useEffect(() => {
    getPosts().then(json => {
      setPosts(json);
    });
    setLoaded(true);
  }, []);

  return (
    <>
      <header>
        <h1>Messages</h1>
      </header>
      <main>
        {!loaded ?
          <h1>Loading</h1>
          : (
            <div className="posts">
              <PostForm submitHandler={sumbitPostHandler} />
              <PostList posts={posts} handleDelete={deletePostHandler} handleVote={voteHandler}/>
            </div>
          )}
      </main>
    </>
  )
}