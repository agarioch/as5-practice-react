'use strict';
const db = require('../models/db');

async function getAll (req, res) {
  const queryRes = await db.Post.getAll();
  res.status(200);
  res.send(queryRes);
  res.end();
}
async function postOne (req, res) {
  const postReq = req.body;
  const fields = Object.keys(postReq);
  if (fields.sort().join(',') == 'author,content') {
    const newPost = await db.Post.postOne(postReq);
    res.status(201);
    res.send(newPost);
    res.end();
  } else {
    res.status(400);
    res.send({error: `Request must contain fields "content" and "author". Sent ${fields}`});
    res.end();
  }
}

async function deleteOne (req, res) {
  const id = parseInt(req.params.id);
  if (id > 0) {
    await db.Post.deleteOne(id);
    res.status(200);
    res.end();
  } else {
    res.status(500);
    res.send('Post could not be deleted');
    res.end();
  }
}

async function putVote (req, res) {
  const vote = req.params.vote;
  const id = parseInt(req.params.id);
  const change = (vote === 'up') ? 1 : -1;
  console.log('voting', id, change, vote);
  try {
    const dbRes = await db.Post.vote(id, change); 
    res.status(202);
    res.send(dbRes);
    res.end();
  } catch (error) {
    res.status(500);
    res.send('Post could not be saved');
    res.end();
  }
}

module.exports = {getAll, postOne, deleteOne, putVote};