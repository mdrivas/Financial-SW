import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Tasks.css';

function Tasks() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/client/${clientId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setClient(data);
      })
      .catch(error => {
        console.error('There was an error fetching the client data:', error);
      });
  }, [clientId]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/client/${clientId}/tasks`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTasks(data);
      })
      .catch(error => {
        console.error('There was an error fetching the tasks data:', error);
      });
  }, [clientId]);

  const handleStatusChange = (taskId, newStatus) => {
    fetch(`http://127.0.0.1:5000/api/tasks/${taskId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTasks(tasks.map(task =>
          task.id === taskId ? { ...task, status: newStatus } : task
        ));
      })
      .catch(error => {
        console.error('There was an error updating the task status:', error);
      });
  };

  return (
    <div className="Tasks">
      {client ? (
        <div>
          <h1>Tasks for {client.first_name} {client.last_name}</h1>
          <p>Email: {client.email}</p>
          <button onClick={() => navigate(`/clients/${clientId}/tasks/new`)} className="add-task-button">
            Add Task
          </button>
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Assignee</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id}>
                  <td>{task.task}</td>
                  <td>{task.assignee}</td>
                  <td>
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    >
                      <option value="not_assigned">Not Assigned</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Tasks;
