import React from 'react';
import './Dashboard.css';
import { Outlet } from "react-router-dom";
import Sidebar from '../../Component/Sidebar/Sidebar';

function Dashboard() {
  return (
    <div className="layout">
      {/* <Sidebar />
      <div className="content">
        <Outlet />
      </div> */}
    </div>
  );
}

export default Dashboard;
