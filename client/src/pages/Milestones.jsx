import Sidebar from '../components/Sidebar';
import TopBar  from '../components/TopBar';

export default function Milestones() {
  const milestones = [
    { icon: '🌱', title: 'First Step',       desc: 'Complete your first habit',          target: 1,   color: '#16a34a', bg: '#f0fdf4', border: '#86efac', locked: false },
    { icon: '🔥', title: 'On Fire',          desc: 'Reach a 3 day streak',               target: 3,   color: '#ea580c', bg: '#fff7ed', border: '#fed7aa', locked: false },
    { icon: '⚡', title: 'Week Warrior',     desc: 'Complete habits for 7 days straight', target: 7,   color: '#6366f1', bg: '#f5f3ff', border: '#c4b5fd', locked: true  },
    { icon: '💎', title: 'Consistency King', desc: 'Maintain a 14 day streak',            target: 14,  color: '#0891b2', bg: '#ecfeff', border: '#a5f3fc', locked: true  },
    { icon: '🚀', title: 'Habit Master',     desc: 'Reach a 30 day streak',               target: 30,  color: '#7c3aed', bg: '#f5f3ff', border: '#c4b5fd', locked: true  },
    { icon: '👑', title: 'Legend',           desc: 'Complete 100 habits total',           target: 100, color: '#ca8a04', bg: '#fefce8', border: '#fde68a', locked: true  },
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
              Milestones
            </h1>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
              Unlock achievements as you build your habits
            </p>
          </div>

          {/* Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #1e1b4b, #312e81)',
            borderRadius: '20px',
            padding: '1.75rem 2rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <h2 style={{
                fontSize: '18px', fontWeight: '800',
                color: '#ffffff', margin: '0 0 6px'
              }}>
                Your Achievement Journey
              </h2>
              <p style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.5)',
                margin: 0
              }}>
                Complete habits daily to unlock badges and rewards
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['🌱', '🔥', '⚡', '💎', '🚀', '👑'].map((icon, i) => (
                <div key={i} style={{
                  width: '40px', height: '40px',
                  borderRadius: '10px',
                  background: i < 2
                    ? 'rgba(255,255,255,0.15)'
                    : 'rgba(255,255,255,0.05)',
                  border: i < 2
                    ? '1px solid rgba(255,255,255,0.2)'
                    : '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  filter: i >= 2 ? 'grayscale(1) opacity(0.3)' : 'none'
                }}>
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Milestone grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            marginBottom: '1.25rem'
          }}>
            {milestones.map(m => (
              <div key={m.title} style={{
                background: m.locked ? '#f8fafc' : m.bg,
                border: `1.5px solid ${m.locked ? '#e2e8f0' : m.border}`,
                borderRadius: '16px',
                padding: '1.25rem',
                position: 'relative',
                overflow: 'hidden',
                opacity: m.locked ? 0.7 : 1,
                transition: 'all 0.2s'
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(99,102,241,0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Lock overlay */}
                {m.locked && (
                  <div style={{
                    position: 'absolute',
                    top: '12px', right: '12px',
                    fontSize: '14px'
                  }}>
                    🔒
                  </div>
                )}

                {/* Unlocked badge */}
                {!m.locked && (
                  <div style={{
                    position: 'absolute',
                    top: '12px', right: '12px',
                    background: m.bg,
                    border: `1px solid ${m.border}`,
                    borderRadius: '6px',
                    padding: '2px 8px',
                    fontSize: '11px',
                    fontWeight: '700',
                    color: m.color
                  }}>
                    ✓ Unlocked
                  </div>
                )}

                <div style={{ fontSize: '36px', marginBottom: '10px' }}>
                  {m.icon}
                </div>
                <h3 style={{
                  fontSize: '15px', fontWeight: '700',
                  color: m.locked ? '#94a3b8' : '#1a1a2e',
                  margin: '0 0 4px'
                }}>
                  {m.title}
                </h3>
                <p style={{
                  fontSize: '12px',
                  color: '#94a3b8',
                  margin: '0 0 12px',
                  lineHeight: 1.5
                }}>
                  {m.desc}
                </p>

                {/* Progress bar */}
                <div style={{
                  height: '4px',
                  background: '#f1f5f9',
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: m.locked ? '0%' : '100%',
                    background: `linear-gradient(90deg, ${m.color}80, ${m.color})`,
                    borderRadius: '2px',
                    transition: 'width 0.6s ease'
                  }} />
                </div>
                <p style={{
                  fontSize: '11px',
                  color: m.locked ? '#94a3b8' : m.color,
                  margin: '4px 0 0',
                  fontWeight: '600'
                }}>
                  {m.locked ? `Target: ${m.target}` : 'Completed!'}
                </p>
              </div>
            ))}
          </div>

          {/* Coming soon note */}
          <div style={{
            background: '#f5f3ff',
            border: '1.5px solid #c4b5fd',
            borderRadius: '14px',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '20px' }}>⚡</span>
            <p style={{
              fontSize: '13px',
              color: '#6366f1',
              margin: 0,
              fontWeight: '500'
            }}>
              Full milestone tracking with automatic unlock detection is coming soon.
              Keep building your streaks to be ready!
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}