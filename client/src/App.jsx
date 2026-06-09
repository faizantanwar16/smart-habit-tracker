import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider }  from './context/AuthContext';
import PrivateRoute      from './components/PrivateRoute';
import Login             from './pages/Login';
import Register          from './pages/Register';
import Dashboard         from './pages/Dashboard';
import Streaks           from './pages/Streaks';
import Progress          from './pages/Progress';
import Milestones        from './pages/Milestones';
import Settings          from './pages/Settings';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <PrivateRoute><Dashboard /></PrivateRoute>
          } />
          <Route path="/streaks" element={
            <PrivateRoute><Streaks /></PrivateRoute>
          } />
          <Route path="/progress" element={
            <PrivateRoute><Progress /></PrivateRoute>
          } />
          <Route path="/milestones" element={
            <PrivateRoute><Milestones /></PrivateRoute>
          } />
          <Route path="/settings" element={
            <PrivateRoute><Settings /></PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}