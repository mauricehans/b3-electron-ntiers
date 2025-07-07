import React, { useState, useEffect } from 'react';
import './App.css';

const API_BASE_URL = 'http://localhost:3000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setTasks(data.tasks || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setTasks([]); // Clear tasks on error
    }
  };

  const addTask = async () => {
    if (!newTaskTitle.trim()) {
      alert('Task title cannot be empty.');
      return;
    }
    try {
      await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTaskTitle, description: newTaskDescription, priority: newTaskPriority }),
      });
      setNewTaskTitle('');
      setNewTaskDescription('');
      setNewTaskPriority('medium');
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleTask = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/${id}/toggle`, {
        method: 'PATCH',
      });
      fetchTasks();
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const deleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await fetch(`${API_BASE_URL}/${id}`, {
          method: 'DELETE',
        });
        fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  return (
    <div className="App">
      <h1>Todo List (React Client)</h1>

      <div className="task-form">
        <h3>Add New Task</h3>
        <input
          type="text"
          placeholder="Task Title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />
        <select value={newTaskPriority} onChange={(e) => setNewTaskPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>

      <h2>Tasks</h2>
      <div className="tasks-container">
        {tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className={`task-item priority-${task.priority} ${task.completed ? 'completed' : ''}`}>
              <div className="task-info">
                <strong>{task.title}</strong>
                {task.description && <><br /><small>{task.description}</small></>}
                <br /><small>Priority: {task.priority} | Created: {new Date(task.created_at).toLocaleDateString()}</small>
              </div>
              <div className="task-actions">
                <button onClick={() => toggleTask(task.id)}>{task.completed ? 'Restore' : 'Complete'}</button>
                <button onClick={() => deleteTask(task.id)} style={{ backgroundColor: '#f44336', color: 'white' }}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;