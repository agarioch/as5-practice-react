import { React, useState } from 'react';
import './post-form.css';

export default function PostForm(props) {
  const { submitHandler } = props;
  const [input, setInput] = useState('');
  const [author, setAuthor] = useState('');

  const handleContentInput = (e) => {
    setInput(e.target.value);
  }
  const handleAuthorInput = (e) => {
    setAuthor(e.target.value);
  }


  return (
    <form className="post-form" onSubmit={(e) => {
      e.preventDefault();
      if(input.length > 0) {
        const postAuthor = author.length > 0 ? author : 'Anonymous';
        submitHandler(e, input, postAuthor);
        setInput('');
        setAuthor('');
      }
    }}
    >
      <input className="post-form__input" type="text" value={author} onInput={handleAuthorInput} placeholder="your name ..." />
      <input className="post-form__input" type="text" value={input} onInput={handleContentInput} placeholder="message ..." />
      <button className="post-form__submit" type="submit">✉️ Send</button>
    </form>
  )
}