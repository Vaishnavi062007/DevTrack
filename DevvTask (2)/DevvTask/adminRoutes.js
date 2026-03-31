const express = require('express');
const router = express.Router();
const { getStats, createTask, getAllSubmissions, updateSubmissionStatus, getAllUsers, getAttendance, markAttendance } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/stats', protect, admin, getStats);
router.post('/tasks', protect, admin, createTask);
router.get('/users', protect, admin, getAllUsers);
router.get('/submissions', protect, admin, getAllSubmissions);
router.put('/submissions/:id', protect, admin, updateSubmissionStatus);
router.get('/attendance', protect, admin, getAttendance);
router.post('/attendance', protect, admin, markAttendance);

module.exports = router;
