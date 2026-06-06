import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initial = user?.name?.charAt(0).toUpperCase();

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 1.5rem',
      background: 'linear-gradient(135deg, #12122a 0%, #1a1035 100%)',
      border: '1px solid #2a2a4a',
      borderRadius: '20px',
      marginBottom: '1.5rem',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* background glow effect */}
      <div style={{
        position: 'absolute',
        top: '-30px', left: '50%',
        transform: 'translateX(-50%)',
        width: '300px', height: '80px',
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.15) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Left — logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '44px', height: '44px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #7c3aed22, #fb923c22)',
          border: '1px solid #fb923c40',
          display: 'flex', alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          boxShadow: '0 0 20px rgba(251,146,60,0.2)'
        }}>
          🔥
        </div>
        <div>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '800',
            color: '#e8e8f0',
            margin: 0,
            letterSpacing: '-0.3px'
          }}>
            Habit<span style={{ color: '#a78bfa' }}>Quest</span>
          </h2>
          <p style={{
            fontSize: '11px',
            color: '#4a4a6a',
            margin: 0,
            letterSpacing: '0.05em'
          }}>
            LEVEL UP DAILY
          </p>
        </div>
      </div>

      {/* Center — streak banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(251,146,60,0.08)',
        border: '1px solid rgba(251,146,60,0.2)',
        borderRadius: '12px',
        padding: '6px 16px'
      }}>
        <span style={{ fontSize: '16px' }}>⚔️</span>
        <span style={{ fontSize: '12px', color: '#fb923c', fontWeight: '600' }}>
          ACTIVE PLAYER
        </span>
      </div>

      {/* Right — user info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ textAlign: 'right' }}>
          <p style={{
            fontSize: '14px',
            fontWeight: '700',
            color: '#e8e8f0',
            margin: 0
          }}>
            {user?.name}
          </p>
          <p style={{
            fontSize: '11px',
            color: '#4a4a6a',
            margin: 0
          }}>
            🏆 Streak Hunter
          </p>
        </div>

        {/* Avatar */}
        <div style={{
          width: '40px', height: '40px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          fontWeight: '800',
          color: 'white',
          boxShadow: '0 0 16px rgba(124,58,237,0.4)',
          border: '2px solid rgba(167,139,250,0.3)'
        }}>
          {initial}
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            background: 'transparent',
            border: '1px solid #2a2a4a',
            color: '#6b6b8a',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: '500'
          }}
        >
          Logout
        </button>
      </div>

    </div>
  );
}