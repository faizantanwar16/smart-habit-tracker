import Sidebar from '../components/Sidebar';
import TopBar  from '../components/TopBar';

export default function Progress() {
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
              Progress
            </h1>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
              Visualize your habit performance over time
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
            <div style={{ fontSize: '56px', marginBottom: '1rem' }}>📊</div>
            <h2 style={{
              fontSize: '20px', fontWeight: '800',
              color: '#1a1a2e', margin: '0 0 8px'
            }}>
              Progress Analytics — Coming Soon
            </h2>
            <p style={{
              fontSize: '14px', color: '#94a3b8',
              maxWidth: '480px', margin: '0 auto 2rem',
              lineHeight: 1.7
            }}>
              Deep insights into your habit performance — completion rates,
              category breakdowns, weekly trends, and personalized recommendations.
            </p>

            {/* Mock chart preview */}
            <div style={{
              background: '#f8fafc',
              border: '1.5px solid #e8ecf4',
              borderRadius: '14px',
              padding: '1.5rem',
              maxWidth: '600px',
              margin: '0 auto 1.5rem'
            }}>
              <p style={{
                fontSize: '12px', fontWeight: '700',
                color: '#94a3b8', textTransform: 'uppercase',
                letterSpacing: '0.08em', margin: '0 0 1rem',
                textAlign: 'left'
              }}>
                Weekly Completion Rate — Preview
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '10px',
                height: '100px',
                justifyContent: 'center'
              }}>
                {[40, 65, 55, 80, 70, 90, 75].map((h, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    flex: 1
                  }}>
                    <div style={{
                      width: '100%',
                      height: `${h}px`,
                      background: `linear-gradient(180deg, #6366f1, #8b5cf6)`,
                      borderRadius: '6px 6px 0 0',
                      opacity: 0.3
                    }} />
                    <span style={{
                      fontSize: '10px', color: '#94a3b8'
                    }}>
                      {['M','T','W','T','F','S','S'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature preview cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {[
                { icon: '📉', title: 'Completion Rate',    desc: 'Daily and weekly habit completion trends'    },
                { icon: '🥧', title: 'Category Breakdown', desc: 'See which categories you excel at'           },
                { icon: '💡', title: 'Smart Insights',     desc: 'AI-powered recommendations for improvement'  },
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
              { label: 'Best Day of Week',      value: '—', color: '#6366f1', bg: '#f5f3ff', border: '#c4b5fd' },
              { label: 'Avg Daily Completion',  value: '—', color: '#0891b2', bg: '#ecfeff', border: '#a5f3fc' },
              { label: 'Most Productive Month', value: '—', color: '#16a34a', bg: '#f0fdf4', border: '#86efac' },
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