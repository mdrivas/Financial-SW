// src/routes/Client/NewClient.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewClient() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newClient = {
      first_name: firstName,
      last_name: lastName,
      email: email,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/add_client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClient),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Client added:', data);
      alert('Client added successfully!');
      // Redirect to clients page
      navigate('/clients');
    } catch (error) {
      console.error('There was a problem with the request:', error);
      alert('Failed to add client. Please try again.');
    }
  };

  return (
    <div>
      <h1>Add New Client</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input 
            type="text" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input 
            type="text" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Add Client</button>
      </form>
      <button onClick={() => navigate('/clients')} className="back-button">
        Back to Clients
      </button>
    </div>
  );
}

export default NewClient;
