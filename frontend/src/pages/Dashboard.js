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

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2 className="mb-4">📋 My Tasks</h2>
        <TaskForm onTaskAdded={handleTaskAdded} />

        {/* Filter Buttons */}
        <div className="mb-4">
          <button
            className={`btn me-2 ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`btn me-2 ${filter === 'todo' ? 'btn-secondary' : 'btn-outline-secondary'}`}
            onClick={() => setFilter('todo')}
          >
            To Do
          </button>
          <button
            className={`btn me-2 ${filter === 'inprogress' ? 'btn-primary' : 'btn-outline-primary'}`}
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
          <div className="text-center">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="alert alert-info">
            No tasks found. Add a new task above! 🚀
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