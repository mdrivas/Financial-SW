import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [clientCount, setClientCount] = useState(0);
  const [pendingTasksCount, setPendingTasksCount] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/clients/count')
      .then(response => response.json())
      .then(data => setClientCount(data.count))
      .catch(error => console.error('Error fetching client count:', error));

    fetch('http://127.0.0.1:5000/api/tasks/pending')
      .then(response => response.json())
      .then(data => setPendingTasksCount(data.count))
      .catch(error => console.error('Error fetching pending tasks count:', error));

    // Fetch recent activities (replace with actual endpoint)
    fetch('http://127.0.0.1:5000/api/recent-activities')
      .then(response => response.json())
      .then(data => setRecentActivities(data.activities))
      .catch(error => console.error('Error fetching recent activities:', error));
  }, []);

  return (
    <div className="home-container">
      <h1>Welcome to Vault!</h1>
      <div className="dashboard-overview">
        <div className="overview-item">
          <h2>Clients</h2>
          <p>Total: {clientCount}</p>
          <Link to="/clients" className="dashboard-link">View Clients</Link>
        </div>
        <div className="overview-item">
          <h2>Tasks</h2>
          <p>Pending: {pendingTasksCount}</p>
          <Link to="/clients/tasks" className="dashboard-link">View Tasks</Link>
        </div>
        <div className="overview-item">
          <h2>Emails</h2>
          <p>Sent: 0</p>
          <Link to="/email" className="dashboard-link">View Emails</Link>
        </div>
      </div>
      <div className="quick-access">
        <h2>Quick Access</h2>
        <Link to="/clients/new" className="quick-access-link">Add New Client</Link>
        <Link to="/clients/tasks/new" className="quick-access-link">Add New Task</Link>
        <Link to="/email" className="quick-access-link">Send Email</Link>
      </div>
      <div className="recent-activities">
        <h2>Recent Activities</h2>
        <ul>
          {recentActivities.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      </div>
      <div className="notifications">
        <h2>Notifications</h2>
        <ul>
          <li>Client John Doe has been added.</li>
          <li>Task "Prepare Financial Report" is pending.</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
