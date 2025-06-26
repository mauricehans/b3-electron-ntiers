const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getTasks: async () => {
    const res = await fetch('http://localhost:3000/api/tasks');
    return res.json();
  },
  
  createTask: async (task) => {
    const res = await fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });
    return res.json();
  },
  
  updateTask: async (id, task) => {
    const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });
    return res.json();
  },
  
  toggleTask: async (id) => {
    const res = await fetch(`http://localhost:3000/api/tasks/${id}/toggle`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' }
    });
    return res.json();
  },
  
  deleteTask: async (id) => {
    const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  }
});
