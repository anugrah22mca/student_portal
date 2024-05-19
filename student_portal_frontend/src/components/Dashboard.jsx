// src/components/Dashboard.js
import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Placement Officer Dashboard</h1>
      <div className="stats">
        <div className="stat-item">
          <h2>Total Students</h2>
          <p>120</p>
        </div>
        <div className="stat-item">
          <h2>Students Placed</h2>
          <p>90</p>
        </div>
        <div className="stat-item">
          <h2>Pending Interviews</h2>
          <p>30</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
