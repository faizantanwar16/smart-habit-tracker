import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { icon: '⚡', label: 'Dashboard',  path: '/'            },
  { icon: '🔥', label: 'Streaks',    path: '/streaks'     },
  { icon: '📊', label: 'Progress',   path: '/progress'    },
  { icon: '🏆', label: 'Milestones', path: '/milestones'  },
  { icon: '⚙️', label: 'Settings',   path: '/settings'   },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initial = user?.name?.charAt(0).toUpperCase();

  return (
    <div className="sidebar">

      {/* Logo */}
      <div style={{
        padding: '0 1.25rem 1.25rem',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        marginBottom: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '40px', height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
            flexShrink: 0
          }}>
            🔥
          </div>
          <div>
            <h2 style={{
              fontSize: '17px',
              fontWeight: '800',
              color: '#ffffff',
              margin: 0,
              letterSpacing: '-0.3px'
            }}>
              Habit<span style={{ color: '#a5b4fc' }}>Quest</span>
            </h2>
            <p style={{
              fontSize: '10px',
              color: 'rgba(255,255,255,0.3)',
              margin: 0,
              letterSpacing: '0.06em'
            }}>
              LEVEL UP DAILY
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={{ flex: 1, padding: '0 0.75rem' }}>
        <p style={{
          fontSize: '10px',
          fontWeight: '700',
          color: 'rgba(255,255,255,0.25)',
          letterSpacing: '0.1em',
          padding: '0 0.75rem',
          marginBottom: '6px'
        }}>
          MAIN MENU
        </p>

        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={item.label}
              onClick={() => navigate(item.path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '10px',
                marginBottom: '2px',
                cursor: 'pointer',
                background: isActive
                  ? 'rgba(255,255,255,0.12)'
                  : 'transparent',
                border: isActive
                  ? '1px solid rgba(255,255,255,0.15)'
                  : '1px solid transparent',
                transition: 'all 0.15s'
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <span style={{
                fontSize: '18px',
                width: '24px',
                textAlign: 'center'
              }}>
                {item.icon}
              </span>
              <span style={{
                fontSize: '14px',
                fontWeight: isActive ? '700' : '500',
                color: isActive
                  ? '#ffffff'
                  : 'rgba(255,255,255,0.5)'
              }}>
                {item.label}
              </span>
              {isActive && (
                <div style={{
                  marginLeft: 'auto',
                  width: '6px', height: '6px',
                  borderRadius: '50%',
                  background: '#a5b4fc',
                  boxShadow: '0 0 8px rgba(165,180,252,0.8)'
                }} />
              )}
            </div>
          );
        })}

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'rgba(255,255,255,0.08)',
          margin: '1rem 0.5rem'
        }} />

        <p style={{
          fontSize: '10px',
          fontWeight: '700',
          color: 'rgba(255,255,255,0.25)',
          letterSpacing: '0.1em',
          padding: '0 0.75rem',
          marginBottom: '6px'
        }}>
          ACCOUNT
        </p>

        <div
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 12px',
            borderRadius: '10px',
            cursor: 'pointer',
            border: '1px solid transparent',
            transition: 'all 0.15s'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(239,68,68,0.15)';
            e.currentTarget.style.borderColor = 'rgba(239,68,68,0.2)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'transparent';
          }}
        >
          <span style={{ fontSize: '18px', width: '24px', textAlign: 'center' }}>
            🚪
          </span>
          <span style={{
            fontSize: '14px',
            fontWeight: '500',
            color: 'rgba(255,255,255,0.4)'
          }}>
            Logout
          </span>
        </div>
      </div>

      {/* User profile bottom */}
      <div style={{
        padding: '1rem 1.25rem 0',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        marginTop: '1rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 12px',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px'
        }}>
          <div style={{
            width: '36px', height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1, #a5b4fc)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center',
            fontSize: '15px',
            fontWeight: '800',
            color: 'white',
            flexShrink: 0
          }}>
            {initial}
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{
              fontSize: '13px',
              fontWeight: '700',
              color: '#ffffff',
              margin: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {user?.name}
            </p>
            <p style={{
              fontSize: '11px',
              color: 'rgba(255,255,255,0.35)',
              margin: 0
            }}>
              🏆 Streak Hunter
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}