import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Clients.css';

function Clients() {
  const [clientsList, setClientsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching client data...");
    fetch('http://127.0.0.1:5000/api/data')
      .then(response => {
        console.log("Received response:", response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Received data:", data);
        setClientsList(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="Clients">
      <div className="clients-header">
        <h1>Client List</h1>
        <button onClick={() => navigate('/clients/new')} className="add-client-button">
          Add Client
        </button>
      </div>
      {clientsList.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clientsList.map(client => (
              <tr key={client.id}>
                <td>{client.first_name}</td>
                <td>{client.last_name}</td>
                <td>{client.email}</td>
                <td>
                  <button onClick={() => navigate(`/clients/tasks/${client.id}`)}>
                    Interact
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No clients found.</p>
      )}
    </div>
  );
}

export default Clients;
