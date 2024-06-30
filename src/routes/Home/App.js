// src/routes/Home/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Clients from '../Clients/Clients';
import Email from '../Email/Email';
import NewClient from '../Clients/newClient';
import Tasks from '../Clients/Tasks';
import AddTask from '../Clients/AddTask';
import '../../styles/GlobalStyles.css';

function Home() {
  return (
    <div>
      <h1>Welcome to FSW!</h1>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/clients" className="nav-link">Clients</Link>
          <Link to="/email" className="nav-link">Email</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/new" element={<NewClient />} />
          <Route path="/clients/tasks/:clientId" element={<Tasks />} />
          <Route path="/clients/:clientId/tasks/new" element={<AddTask />} />
          <Route path="/email" element={<Email />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
