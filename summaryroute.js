const express = require('express');
const router = express.Router();
const { summarizeAndSend } = require('../controllers/summaryController');

router.post('/', summarizeAndSend);

module.exports = router;
