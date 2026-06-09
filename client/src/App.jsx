import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login     from './pages/Login';
import Register  from './pages/Register';
import Dashboard from './pages/Dashboard';

const Placeholder = ({ title }) => (
  <div style={{
    marginLeft: '230px',
    height: '100vh',
    background: '#f0f2f8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '12px'
  }}>
    <div style={{ fontSize: '48px' }}>🚧</div>
    <h2 style={{ color: '#1a1a2e', fontSize: '22px', fontWeight: '700' }}>
      {title}
    </h2>
    <p style={{ color: '#94a3b8', fontSize: '14px' }}>
      Coming in the next update
    </p>
  </div>
);

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
            <PrivateRoute><Placeholder title="Streaks" /></PrivateRoute>
          } />
          <Route path="/progress" element={
            <PrivateRoute><Placeholder title="Progress" /></PrivateRoute>
          } />
          <Route path="/milestones" element={
            <PrivateRoute><Placeholder title="Milestones" /></PrivateRoute>
          } />
          <Route path="/settings" element={
            <PrivateRoute><Placeholder title="Settings" /></PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import PrivateRoute from './components/PrivateRoute';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';

// export default function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/login"    element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/" element={
//             <PrivateRoute>
//               <Dashboard />
//             </PrivateRoute>
//           } />
//           {/* Catch any unknown URL and redirect to home */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }