// LoginPage.jsx - Admin login functionality
import React, { useState } from 'react';
import { loginAdmin } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginAdmin({ email, password });
      localStorage.setItem('coou_admin_token', data.token);
      localStorage.setItem('coou_admin_user', JSON.stringify(data.user));
      toast.success('Login successful!');
      navigate('/admin');
    } catch (err) {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-campus dark:bg-campus-dark">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl mb-6 text-center">Admin Login</h2>
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input-field"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input-field"
            required
          />
        </div>
        <button type="submit" className="btn-primary">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
