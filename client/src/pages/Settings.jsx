import Sidebar from '../components/Sidebar';
import TopBar  from '../components/TopBar';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
  const { user } = useAuth();
  const initial  = user?.name?.charAt(0).toUpperCase();

  const sections = [
    {
      title: 'Profile',
      icon: '👤',
      color: '#6366f1',
      bg: '#f5f3ff',
      border: '#c4b5fd',
      fields: [
        { label: 'Full Name',  value: user?.name,  type: 'text',     placeholder: 'Your name'  },
        { label: 'Email',      value: user?.email, type: 'email',    placeholder: 'Your email' },
        { label: 'Password',   value: '••••••••',  type: 'password', placeholder: 'New password' },
      ]
    },
    {
      title: 'Notifications',
      icon: '🔔',
      color: '#0891b2',
      bg: '#ecfeff',
      border: '#a5f3fc',
      fields: [
        { label: 'Daily Reminder',    value: '08:00 AM', type: 'text', placeholder: 'Reminder time' },
        { label: 'Streak Alerts',     value: 'Enabled',  type: 'text', placeholder: 'On/Off'        },
        { label: 'Weekly Summary',    value: 'Enabled',  type: 'text', placeholder: 'On/Off'        },
      ]
    },
    {
      title: 'Preferences',
      icon: '⚙️',
      color: '#ea580c',
      bg: '#fff7ed',
      border: '#fed7aa',
      fields: [
        { label: 'Theme',       value: 'Light',   type: 'text', placeholder: 'Light/Dark' },
        { label: 'Start of Week', value: 'Monday', type: 'text', placeholder: 'Day'       },
        { label: 'Language',    value: 'English', type: 'text', placeholder: 'Language'  },
      ]
    },
  ];

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-content">
        <TopBar habitsCount={0} completedToday={0} />
        <div className="page-content">

          {/* Header */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h1 style={{
              fontSize: '22px', fontWeight: '800',
              color: '#1a1a2e', margin: '0 0 4px'
            }}>
              Settings
            </h1>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
              Manage your account and preferences
            </p>
          </div>

          {/* Profile card */}
          <div style={{
            background: '#ffffff',
            border: '1.5px solid #e8ecf4',
            borderRadius: '20px',
            padding: '1.5rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            boxShadow: '0 2px 8px rgba(99,102,241,0.06)'
          }}>
            <div style={{
              width: '64px', height: '64px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center',
              fontSize: '26px', fontWeight: '800',
              color: 'white', flexShrink: 0,
              boxShadow: '0 4px 16px rgba(99,102,241,0.3)'
            }}>
              {initial}
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{
                fontSize: '18px', fontWeight: '800',
                color: '#1a1a2e', margin: '0 0 4px'
              }}>
                {user?.name}
              </h2>
              <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 10px' }}>
                {user?.email}
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{
                  fontSize: '11px', fontWeight: '700',
                  color: '#6366f1', background: '#f5f3ff',
                  border: '1px solid #c4b5fd',
                  borderRadius: '6px', padding: '3px 10px'
                }}>
                  🏆 Streak Hunter
                </span>
                <span style={{
                  fontSize: '11px', fontWeight: '700',
                  color: '#16a34a', background: '#f0fdf4',
                  border: '1px solid #86efac',
                  borderRadius: '6px', padding: '3px 10px'
                }}>
                  ✓ Active Member
                </span>
              </div>
            </div>
            <button style={{
              padding: '9px 18px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: 'white', fontWeight: '700',
              fontSize: '13px', borderRadius: '10px',
              boxShadow: '0 4px 16px rgba(99,102,241,0.35)',
              opacity: 0.6, cursor: 'not-allowed'
            }}>
              Edit Profile
            </button>
          </div>

          {/* Settings sections */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '12px',
            marginBottom: '1.25rem'
          }}>
            {sections.map(section => (
              <div key={section.title} style={{
                background: '#ffffff',
                border: '1.5px solid #e8ecf4',
                borderRadius: '16px',
                padding: '1.25rem',
                boxShadow: '0 2px 8px rgba(99,102,241,0.06)'
              }}>
                {/* Section header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '1.25rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '1.5px solid #f1f5f9'
                }}>
                  <div style={{
                    width: '34px', height: '34px',
                    borderRadius: '10px',
                    background: section.bg,
                    border: `1.5px solid ${section.border}`,
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '16px'
                  }}>
                    {section.icon}
                  </div>
                  <h3 style={{
                    fontSize: '14px', fontWeight: '700',
                    color: '#1a1a2e', margin: 0
                  }}>
                    {section.title}
                  </h3>
                </div>

                {/* Fields */}
                {section.fields.map(field => (
                  <div key={field.label} style={{ marginBottom: '0.875rem' }}>
                    <label style={{
                      fontSize: '11px', fontWeight: '700',
                      color: '#64748b', display: 'block',
                      marginBottom: '5px', textTransform: 'uppercase',
                      letterSpacing: '0.06em'
                    }}>
                      {field.label}
                    </label>
                    <div style={{
                      background: '#f8fafc',
                      border: '1.5px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      fontSize: '13px',
                      color: '#64748b',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span>{field.value}</span>
                      <span style={{
                        fontSize: '10px', color: '#cbd5e1',
                        fontWeight: '600'
                      }}>
                        LOCKED
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Danger zone */}
          <div style={{
            background: '#fef2f2',
            border: '1.5px solid #fecaca',
            borderRadius: '16px',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <h3 style={{
                fontSize: '14px', fontWeight: '700',
                color: '#dc2626', margin: '0 0 4px'
              }}>
                Danger Zone
              </h3>
              <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
                Delete your account and all associated data permanently
              </p>
            </div>
            <button style={{
              padding: '9px 18px',
              background: '#fef2f2',
              border: '1.5px solid #fecaca',
              color: '#dc2626',
              fontWeight: '700', fontSize: '13px',
              borderRadius: '10px',
              opacity: 0.6, cursor: 'not-allowed'
            }}>
              🗑️ Delete Account
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}