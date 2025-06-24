const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  request: async (endpoint, a, b) => {
    const res = await fetch(`http://localhost:3000/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ a, b })
    });
    return res.json();
  }
});