const TaskModel = require('../model/task');
const { body, validationResult } = require('express-validator'); // body method for validating request body fields and the validationResult function to check for validation errors.

class taskcontroller {

    // Create Task
    async createTask(req, res) {
        // Validation using express-validator
        await body('title')
            .isLength({ min: 3, max: 100 })
            .withMessage('Title is required and should not exceed 100 characters and not be less than 3 characters')
            .run(req);
        await body('status')
            .optional()
            .isIn(['TODO', 'IN_PROGRESS', 'COMPLETED'])
            .withMessage('Status must be one of: TODO, IN_PROGRESS, COMPLETED')
            .run(req);
        await body('priority')
            .optional()
            .isIn(['LOW', 'MEDIUM', 'HIGH'])
            .withMessage('Priority must be one of: LOW, MEDIUM, HIGH')
            .run(req);
        await body('dueDate')
            .optional()
            .isISO8601()
            .withMessage('Invalid due date format')
            .run(req);

        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors });
        }

        try {
            const newTask = new TaskModel({ ...req.body });
            const savedTask = await newTask.save();
            res.status(201).json({
                message: 'Task created successfully!',
                task: savedTask,
            });
        } catch (error) {
            console.error('Error creating task:', error);
            res.status(500).json({
                message: 'An error occurred while creating the task.',
                error: error.message,
            });
        }
    };

    // Show Task 
    async getTasks(req, res) {
        try {
            const { status, priority, sort, limit = 10, page = 1 } = req.query;

            // Initialize filter object
            const filter = { isDeleted: false };

            // Apply filters for status and priority if provided
            if (status) filter.status = status;
            if (priority) filter.priority = priority;

            // Sorting setup: by default, sort by priority (HIGH > MEDIUM > LOW), then by createdAt if priorities are the same
            let sortBy = {};

            if (sort) {
                const [field, order] = sort.split(':');
                sortBy[field] = order === 'desc' ? -1 : 1;
            } else {
                // Default sorting: prioritize HIGH > MEDIUM > LOW, and then createdAt
                sortBy.priority = 1;  // Sorting priority first
                sortBy.createdAt = 1;  // Then sorting by createdAt
            }

            // Pagination setup: limit and skip based on query parameters
            const tasksLimit = parseInt(limit, 10);
            const tasksSkip = (parseInt(page, 10) - 1) * tasksLimit;

            // Query tasks from the database with filters, sorting, and pagination
            const tasks = await TaskModel.find(filter)
                .sort(sortBy)
                .skip(tasksSkip)
                .limit(tasksLimit);

            // Get the total number of tasks for pagination
            const totalTasks = await TaskModel.countDocuments(filter);

            // Return tasks with pagination metadata
            res.status(200).json({
                message: 'Tasks retrieved successfully!',
                tasks,
                pagination: {
                    totalTasks,
                    currentPage: parseInt(page, 10),
                    totalPages: Math.ceil(totalTasks / tasksLimit),
                },
            });
        } catch (error) {
            console.error('Error retrieving tasks:', error);
            res.status(500).json({
                message: 'An error occurred while retrieving tasks.',
                error: error.message,
            });
        }
    }


    // Show Task by ID
    async getTaskById(req, res) {
        try {
            const { id } = req.params;
            const task = await TaskModel.findById(id);
            if (!task) {
                return res.status(404).json({
                    message: 'Task not found',
                });
            }
            res.status(200).json({
                message: 'Task retrieved successfully!',
                task,
            });
        } catch (error) {
            console.error('Error retrieving task by ID:', error);
            if (error.name === 'CastError') {
                return res.status(400).json({
                    message: 'Invalid task ID format',
                });
            }
            res.status(500).json({
                message: 'An error occurred while retrieving the task.',
                error: error.message,
            });
        }
    }


    // Update Task
    async updateTask(req, res) {
        // Express validation area 
        await body('title')
            .optional()
            .isLength({ min: 1, max: 100 })
            .withMessage('Title is required and should not exceed 100 characters.')
            .run(req);
        await body('status')
            .optional()
            .isIn(['TODO', 'IN_PROGRESS', 'COMPLETED'])
            .withMessage('Invalid status. Allowed values: TODO, IN_PROGRESS, COMPLETED.')
            .run(req);
        await body('priority')
            .optional()
            .isIn(['LOW', 'MEDIUM', 'HIGH'])
            .withMessage('Invalid priority. Allowed values: LOW, MEDIUM, HIGH.')
            .run(req);
        await body('dueDate')
            .optional()
            .isISO8601()
            .withMessage('Invalid due date format.')
            .run(req);
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Validation error",
                errors: errors
            });
        }

        try {
            const id = req.params.id;
            // Update the task
            const updatedTask = await TaskModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true } // Return updated task and validate input
            );

            if (!updatedTask) {
                return res.status(404).json({
                    message: 'Task not found',
                });
            }

            // Return the updated task
            res.status(200).json({
                message: 'Task updated successfully!',
                task: updatedTask,
            });

        } catch (error) {
            console.error('Error updating task:', error);
            if (error.name === 'CastError') {
                return res.status(400).json({
                    message: 'Invalid task ID format',
                });
            }
            res.status(500).json({
                message: 'An error occurred while updating the task.',
                error: error.message,
            });
        }
    }


    // Soft Delete Task 
    async deleteTask(req, res) {
        const id = req.params.id;
        try {
            const deletedTask = await TaskModel.findByIdAndUpdate(id, { $set: { isDeleted: true } }, { new: true } // Return the updated task
            );

            // If task is not found, return 404
            if (!deletedTask) {
                return res.status(404).json({
                    message: 'Task not found',
                });
            }

            // Return 200 OK with success message after soft delete
            res.status(200).json({
                message: 'Task successfully marked as deleted',
                task: deletedTask,
            });
        } catch (error) {
            console.error('Error deleting task:', error);

            // Handle invalid ObjectId error or other server errors
            if (error.name === 'CastError') {
                return res.status(400).json({
                    message: 'Invalid task ID format',
                });
            }

            res.status(500).json({
                message: 'An error occurred while deleting the task.',
                error: error.message,
            });
        }
    }


}
module.exports = new taskcontroller()