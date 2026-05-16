import React from 'react';
import { updateTask, deleteTask } from '../utils/api';

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const priorityColors = {
    low: 'success',
    medium: 'warning',
    high: 'danger'
  };

  const statusColors = {
    todo: 'secondary',
    inprogress: 'primary',
    done: 'success'
  };

  const statusLabels = {
    todo: 'To Do',
    inprogress: 'In Progress',
    done: 'Done'
  };

  const handleStatusChange = async (e) => {
    try {
      const { data } = await updateTask(task._id, { status: e.target.value });
      onUpdate(data);
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task._id);
      onDelete(task._id);
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">{task.title}</h5>
          <div>
            <span className={`badge bg-${priorityColors[task.priority]} me-2`}>
              {task.priority}
            </span>
            <span className={`badge bg-${statusColors[task.status]}`}>
              {statusLabels[task.status]}
            </span>
          </div>
        </div>
        {task.description && (
          <p className="card-text text-muted mt-2">{task.description}</p>
        )}
        {task.dueDate && (
          <p className="card-text">
            <small className="text-muted">
              📅 Due: {new Date(task.dueDate).toLocaleDateString()}
            </small>
          </p>
        )}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <select
            className="form-select form-select-sm w-50"
            value={task.status}
            onChange={handleStatusChange}
          >
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button
            className="btn btn-danger btn-sm"
            onClick={handleDelete}
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;