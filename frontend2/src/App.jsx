// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CssBaseline from '@mui/material/CssBaseline';

import Layout from './components/layout/layout.jsx';
import HomePage from './pages/HomePage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
