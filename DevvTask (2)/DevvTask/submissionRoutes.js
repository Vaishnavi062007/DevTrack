const express = require('express');
const router = express.Router();
const { submitTask, getMySubmissions } = require('../controllers/submissionController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, submitTask);
router.get('/me', protect, getMySubmissions);

module.exports = router;
