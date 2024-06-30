// src/routes/Client/AddTask.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function AddTask() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState('');
  const [assignee, setAssignee] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      taskName,
      assignee,
    };

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/client/${clientId}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      alert('Task added successfully!');
      navigate(`/clients/tasks/${clientId}`);
    } catch (error) {
      console.error('There was a problem with the request:', error);
      alert('Failed to add task. Please try again.');
    }
  };

  return (
    <div>
      <h1>Add Task</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Task Name:</label>
          <input 
            type="text" 
            value={taskName} 
            onChange={(e) => setTaskName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Assignee:</label>
          <input 
            type="text" 
            value={assignee} 
            onChange={(e) => setAssignee(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Add Task</button>
        <button type="button" onClick={() => navigate(`/clients/tasks/${clientId}`)}>Back</button>
      </form>
    </div>
  );
}

export default AddTask;
