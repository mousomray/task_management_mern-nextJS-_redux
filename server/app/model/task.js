const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100,
    minlength: 3,
    trim: true
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['TODO', 'IN_PROGRESS', 'COMPLETED'],
    default: 'TODO',
  },
  priority: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH'],
    default: 'MEDIUM',
  },
  dueDate: {
    type: Date,
  },
  isDeleted: {
    type: Boolean,
    default: false, // Mark task as not deleted initially
  },
}, { timestamps: true });

const TaskModel = mongoose.model('task', TaskSchema);

module.exports = TaskModel;
