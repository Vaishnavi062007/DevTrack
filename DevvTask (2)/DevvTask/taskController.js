const Task = require('../models/Task');

// @desc    Get all tasks for a user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
    try {
        const { type } = req.query;
        let query = {};
        if (type) {
            query.type = type;
        }

        const tasks = await Task.find(query).sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTasks };
