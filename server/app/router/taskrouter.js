const express = require('express');
const taskcontroller = require('../controller/taskcontroller')
const router = express.Router();

router.post('/post/tasks', taskcontroller.createTask); // Create Task
router.get('/get/tasks', taskcontroller.getTasks); // Show Task 
router.get('/get/tasks/:id', taskcontroller.getTaskById); // Task by ID
router.put('/put/tasks/:id', taskcontroller.updateTask); // Update Task
router.delete('/delete/tasks/:id', taskcontroller.deleteTask); // Delete Task

module.exports = router;
