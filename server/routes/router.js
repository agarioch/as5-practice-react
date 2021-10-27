'use strict';
const { Router } = require('express');
const { getAll, postOne, deleteOne, putVote } = require('../controllers/message.controller');

const router = Router();

router.get('/messages', getAll);
router.post('/messages', postOne);
router.delete('/messages/:id', deleteOne);
router.put('/messages/:id/:vote((up|down)$)', putVote);

module.exports = router;