import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faUsers, faUser, faEnvelope, faBars } from '@fortawesome/free-solid-svg-icons';
import Clients from '../Clients/Clients';
import Email from '../Email/Email';
import NewClient from '../Clients/newClient';
import Tasks from '../Clients/Tasks';
import AddTask from '../Clients/AddTask';
import PasswordPage from '../PasswordPage';
import Home from '../Home/Home';
import '../../styles/GlobalStyles.css';

function App() {
  const location = useLocation();
  const isPasswordPage = location.pathname === '/';
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className={isPasswordPage ? '' : `App ${sidebarCollapsed ? 'collapsed' : ''}`}>
      {!isPasswordPage && (
        <>
          <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`} id="sidebar">
            <div className="nav-links">
              <Link to="/home" className="nav-link">
                <FontAwesomeIcon icon={faChartBar} className="icon" />
                {!sidebarCollapsed && <span className="text">Dashboard</span>}
              </Link>
              <Link to="/clients" className="nav-link">
                <FontAwesomeIcon icon={faUsers} className="icon" />
                {!sidebarCollapsed && <span className="text">Clients</span>}
              </Link>
              <Link to="/email" className="nav-link">
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                {!sidebarCollapsed && <span className="text">Email</span>}
              </Link>
              <Link to="/account" className="nav-link">
                <FontAwesomeIcon icon={faUser} className="icon" />
                {!sidebarCollapsed && <span className="text">Account</span>}
              </Link>
            </div>
          </div>
          <div className={`navbar ${sidebarCollapsed ? 'collapsed' : ''}`} id="navbar">
            <Link to="/home" className="navbar-brand">Vault</Link>
            <div className="navbar-toggler" id="navbar-toggler" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faBars} />
            </div>
          </div>
        </>
      )}
      <Routes>
        <Route path="/" element={<PasswordPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/clients/new" element={<NewClient />} />
        <Route path="/clients/tasks/:clientId" element={<Tasks />} />
        <Route path="/clients/:clientId/tasks/new" element={<AddTask />} />
        <Route path="/email" element={<Email />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
