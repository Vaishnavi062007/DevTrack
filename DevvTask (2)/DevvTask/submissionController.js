const Submission = require('../models/Submission');
const Task = require('../models/Task');

// @desc    Submit proof for a task
// @route   POST /api/submissions
// @access  Private
const submitTask = async (req, res) => {
    try {
        const { taskId, proof } = req.body;

        if (!taskId || !proof) {
            return res.status(400).json({ message: 'Please provide task and proof' });
        }

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check if already submitted and pending/approved
        const existing = await Submission.findOne({ user: req.user._id, task: taskId });
        if (existing && existing.status !== 'rejected') {
            return res.status(400).json({ message: 'Task already submitted' });
        }

        const submission = await Submission.create({
            user: req.user._id,
            task: taskId,
            proof
        });

        res.status(201).json(submission);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user's submissions
// @route   GET /api/submissions/me
// @access  Private
const getMySubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find({ user: req.user._id }).populate('task');
        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { submitTask, getMySubmissions };
