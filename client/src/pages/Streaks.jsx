import Sidebar from '../components/Sidebar';
import TopBar  from '../components/TopBar';

export default function Streaks() {
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
              Streaks
            </h1>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
              Track your consistency over time
            </p>
          </div>

          {/* Coming soon card */}
          <div style={{
            background: '#ffffff',
            border: '1.5px solid #e8ecf4',
            borderRadius: '20px',
            padding: '3rem 2rem',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(99,102,241,0.06)',
            marginBottom: '1.25rem'
          }}>
            <div style={{ fontSize: '56px', marginBottom: '1rem' }}>🔥</div>
            <h2 style={{
              fontSize: '20px', fontWeight: '800',
              color: '#1a1a2e', margin: '0 0 8px'
            }}>
              Streak Tracking — Coming Soon
            </h2>
            <p style={{
              fontSize: '14px', color: '#94a3b8',
              maxWidth: '480px', margin: '0 auto 2rem',
              lineHeight: 1.7
            }}>
              See your full streak history, longest streaks per habit,
              weekly and monthly consistency charts, and streak recovery insights.
            </p>

            {/* Feature preview cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {[
                { icon: '📅', title: 'Streak Calendar',   desc: 'Visual heatmap of your daily completions'     },
                { icon: '📈', title: 'Streak Graph',      desc: 'Line chart of streak growth over time'        },
                { icon: '🏆', title: 'Personal Records',  desc: 'Your longest streaks per habit category'      },
              ].map(f => (
                <div key={f.title} style={{
                  background: '#f8fafc',
                  border: '1.5px solid #e8ecf4',
                  borderRadius: '14px',
                  padding: '1.25rem 1rem',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>{f.icon}</div>
                  <p style={{
                    fontSize: '13px', fontWeight: '700',
                    color: '#1a1a2e', margin: '0 0 4px'
                  }}>
                    {f.title}
                  </p>
                  <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Teaser stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px'
          }}>
            {[
              { label: 'Longest Streak Ever',   value: '—', color: '#ea580c', bg: '#fff7ed', border: '#fed7aa' },
              { label: 'Most Consistent Habit', value: '—', color: '#6366f1', bg: '#f5f3ff', border: '#c4b5fd' },
              { label: 'Perfect Weeks',         value: '—', color: '#16a34a', bg: '#f0fdf4', border: '#86efac' },
            ].map(s => (
              <div key={s.label} style={{
                background: s.bg,
                border: `1.5px solid ${s.border}`,
                borderRadius: '16px',
                padding: '1.25rem',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '28px', fontWeight: '800',
                  color: s.color, marginBottom: '4px'
                }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}