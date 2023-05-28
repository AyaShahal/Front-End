import React from 'react';
import { Navigate,Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoutes = () => {
  const authCookie = Cookies.get('jwt');

  if (!authCookie) {
    return <Navigate to="/404" />;
  }

  const userResponse = JSON.parse(localStorage.getItem('userResponse'));
  const userRole = userResponse?.user?.role;
  if (userRole !== 'Business') {
    return <Navigate to="/404" />;
  }

  return <Outlet />;
};
const AdminRoutes = () => {
  const adminCookie = Cookies.get('jwt');

  if (!adminCookie || adminCookie.trim() === '') {
    return <Navigate to="/404" />;
  }

  const adminResponse = JSON.parse(localStorage.getItem('adminResponse'));
  if (!adminResponse || adminResponse.admin.type !== 'admin') {
    return <Navigate to="/404" />;
  }

  return <Outlet />;
};

export { PrivateRoutes, AdminRoutes };