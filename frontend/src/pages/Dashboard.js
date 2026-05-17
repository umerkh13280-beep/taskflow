import React, { useState, useEffect } from 'react';
import { getTasks } from '../utils/api';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await getTasks();
        setTasks(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks(tasks.map(t => t._id === updatedTask._id ? updatedTask : t));
  };

  const handleTaskDelete = (id) => {
    setTasks(tasks.filter(t => t._id !== id));
  };

  const filteredTasks = filter === 'all'
    ? tasks
    : tasks.filter(t => t.status === filter);

  const todoCount = tasks.filter(t => t.status === 'todo').length;
  const inProgressCount = tasks.filter(t => t.status === 'inprogress').length;
  const doneCount = tasks.filter(t => t.status === 'done').length;

  return (
    <>
      <Navbar />
      <div className="container mt-4">

        {/* Stats Row */}
        <div className="row mb-4">
          <div className="col-md-4 mb-3">
            <div className="card text-center p-3">
              <h3 className="fw-bold text-secondary">{todoCount}</h3>
              <p className="text-muted mb-0">To Do</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card text-center p-3">
              <h3 className="fw-bold text-primary">{inProgressCount}</h3>
              <p className="text-muted mb-0">In Progress</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card text-center p-3">
              <h3 className="fw-bold text-success">{doneCount}</h3>
              <p className="text-muted mb-0">Completed</p>
            </div>
          </div>
        </div>

        {/* Task Form */}
        <TaskForm onTaskAdded={handleTaskAdded} />

        {/* Filter Buttons */}
        <div className="mb-4 d-flex gap-2">
          <button
            className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setFilter('all')}
          >
            All ({tasks.length})
          </button>
          <button
            className={`btn ${filter === 'todo' ? 'btn-secondary' : 'btn-outline-secondary'}`}
            onClick={() => setFilter('todo')}
          >
            To Do
          </button>
          <button
            className={`btn ${filter === 'inprogress' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setFilter('inprogress')}
          >
            In Progress
          </button>
          <button
            className={`btn ${filter === 'done' ? 'btn-success' : 'btn-outline-success'}`}
            onClick={() => setFilter('done')}
          >
            Done
          </button>
        </div>

        {/* Tasks List */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" />
            <p className="mt-3 text-muted">Loading tasks...</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-5">
            <h5 className="text-muted">No tasks found</h5>
            <p className="text-muted">Add a new task above to get started</p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onUpdate={handleTaskUpdate}
              onDelete={handleTaskDelete}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Dashboard;