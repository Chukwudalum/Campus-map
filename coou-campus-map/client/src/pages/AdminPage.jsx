// AdminPage.jsx - Dashboard for managing campus locations
import React, { useEffect } from 'react';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { useLocations } from '../hooks/useLocations';
import { getCategories } from '../services/api';
import { toast } from 'react-toastify';

const AdminPage = () => {
  const { reload } = useLocations();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        await getCategories();
      } catch (error) {
        toast.error('Failed to load categories.');
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col w-full h-screen p-5 bg-campus dark:bg-campus-dark">
      <h1 className="text-3xl text-center mb-4">Admin Dashboard</h1>
      <AdminDashboard onReload={reload} />
    </div>
  );
};

export default AdminPage;
