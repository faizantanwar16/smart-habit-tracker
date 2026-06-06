import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0f0f1a',
      padding: '1rem'
    }}>
      {/* background glow */}
      <div style={{
        position: 'fixed', top: '-100px', left: '50%',
        transform: 'translateX(-50%)',
        width: '600px', height: '400px',
        background: 'radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        width: '100%', maxWidth: '420px',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16162a 100%)',
        border: '1px solid #2e2e4e',
        borderRadius: '20px',
        padding: '2.5rem',
        boxShadow: '0 0 40px rgba(167,139,250,0.08)'
      }}>

        {/* logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            fontSize: '48px', marginBottom: '8px',
            filter: 'drop-shadow(0 0 12px rgba(251,146,60,0.6))'
          }}>🔥</div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#e8e8f0' }}>
            Habit Tracker
          </h1>
          <p style={{ color: '#6b6b8a', fontSize: '13px', marginTop: '4px' }}>
            Build streaks. Level up your life.
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '8px', padding: '10px 14px',
            color: '#f87171', fontSize: '13px', marginBottom: '1.25rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '13px', color: '#9090b0', display: 'block', marginBottom: '6px' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@email.com"
              required
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '13px', color: '#9090b0', display: 'block', marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '12px',
              background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
              color: 'white', fontWeight: '600', fontSize: '15px',
              borderRadius: '10px',
              boxShadow: '0 4px 20px rgba(124,58,237,0.4)'
            }}
          >
            {loading ? 'Signing in...' : '⚔️  Enter the Arena'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '13px', color: '#6b6b8a' }}>
          New here?{' '}
          <Link to="/register" style={{ color: '#a78bfa', fontWeight: '500' }}>
            Create your account
          </Link>
        </p>
      </div>
    </div>
  );
}