'use strict';
const { Router } = require('express');

const router = Router();

router.get('/messages', (req,res) => res.send('hi'));
router.post('/messages', (req,res) => res.status(201));

module.exports = router;