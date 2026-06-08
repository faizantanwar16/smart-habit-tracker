import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName]         = useState('');
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
      const { data } = await api.post('/auth/register', { name, email, password });
      login({ id: data._id, name: data.name, email: data.email }, data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: '#f0f2f8'
    }}>

      {/* Left panel */}
      <div style={{
        width: '420px',
        minWidth: '420px',
        background: '#1e1b4b',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem',
      }}>
        <div style={{
          width: '64px', height: '64px',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          marginBottom: '1.5rem',
          boxShadow: '0 8px 24px rgba(99,102,241,0.4)'
        }}>
          🔥
        </div>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '800',
          color: '#ffffff',
          margin: '0 0 8px',
          textAlign: 'center',
          letterSpacing: '-0.5px'
        }}>
          Habit<span style={{ color: '#a5b4fc' }}>Quest</span>
        </h1>
        <p style={{
          fontSize: '14px',
          color: 'rgba(255,255,255,0.4)',
          textAlign: 'center',
          lineHeight: 1.6,
          margin: '0 0 3rem'
        }}>
          Build streaks.<br />Level up your life.
        </p>

        {/* Feature list */}
        {[
          { icon: '⚡', text: 'Track daily habits effortlessly' },
          { icon: '🔥', text: 'Build powerful streaks' },
          { icon: '🏆', text: 'Celebrate your milestones' },
          { icon: '📊', text: 'Visualize your progress' },
        ].map(f => (
          <div key={f.text} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '14px',
            width: '100%'
          }}>
            <div style={{
              width: '34px', height: '34px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              flexShrink: 0
            }}>
              {f.icon}
            </div>
            <span style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.6)',
              fontWeight: '500'
            }}>
              {f.text}
            </span>
          </div>
        ))}
      </div>

      {/* Right panel — form */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px'
        }}>

          <h2 style={{
            fontSize: '26px',
            fontWeight: '800',
            color: '#1a1a2e',
            margin: '0 0 6px',
            letterSpacing: '-0.4px'
          }}>
            Create account
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#94a3b8',
            margin: '0 0 2rem'
          }}>
            Start your quest today
          </p>

          {error && (
            <div style={{
              background: '#fef2f2',
              border: '1.5px solid #fecaca',
              borderRadius: '10px',
              padding: '10px 14px',
              color: '#dc2626',
              fontSize: '13px',
              marginBottom: '1.25rem',
              fontWeight: '500'
            }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                fontSize: '12px',
                fontWeight: '700',
                color: '#64748b',
                display: 'block',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}>
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                fontSize: '12px',
                fontWeight: '700',
                color: '#64748b',
                display: 'block',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}>
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

            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{
                fontSize: '12px',
                fontWeight: '700',
                color: '#64748b',
                display: 'block',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}>
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
                width: '100%',
                padding: '13px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: 'white',
                fontWeight: '700',
                fontSize: '15px',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(99,102,241,0.35)',
                letterSpacing: '0.02em'
              }}
            >
              {loading ? '⏳ Creating account...' : '🚀 Begin Your Quest'}
            </button>
          </form>

          <p style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            fontSize: '14px',
            color: '#94a3b8'
          }}>
            Already have an account?{' '}
            <Link to="/login" style={{
              color: '#6366f1',
              fontWeight: '700'
            }}>
              Sign in
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}