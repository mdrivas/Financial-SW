// src/routes/Client/Tasks.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Tasks.css';

function Tasks() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);

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
              </tr>
            </thead>
            <tbody>
              {client.tasks && Object.entries(client.tasks).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
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
