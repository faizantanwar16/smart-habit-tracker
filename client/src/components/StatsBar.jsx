export default function StatsBar({ habits }) {
  const today = new Date().toISOString().split('T')[0];

  const total          = habits.length;
  const completedToday = habits.filter(h => h.completedDates.includes(today)).length;
  const todayPct       = total > 0 ? Math.round((completedToday / total) * 100) : 0;
  const longestStreak  = total > 0 ? Math.max(...habits.map(h => h.streak)) : 0;
  const totalDone      = habits.reduce((sum, h) => sum + h.completedDates.length, 0);

  const stats = [
    {
      icon: '📋',
      label: 'Total Habits',
      value: total,
      sub: 'active quests',
      color: '#6366f1',
      bg: '#f5f3ff',
      border: '#c4b5fd',
      iconBg: '#ede9fe'
    },
    {
      icon: '⚡',
      label: 'Today',
      value: `${todayPct}%`,
      sub: `${completedToday} of ${total} done`,
      color: '#0891b2',
      bg: '#ecfeff',
      border: '#a5f3fc',
      iconBg: '#cffafe'
    },
    {
      icon: '🔥',
      label: 'Best Streak',
      value: longestStreak,
      sub: 'days in a row',
      color: '#ea580c',
      bg: '#fff7ed',
      border: '#fed7aa',
      iconBg: '#ffedd5'
    },
    {
      icon: '✅',
      label: 'Total Done',
      value: totalDone,
      sub: 'all time',
      color: '#16a34a',
      bg: '#f0fdf4',
      border: '#86efac',
      iconBg: '#dcfce7'
    },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '12px',
      marginBottom: '1.25rem'
    }}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bento-card"
          style={{
            background: stat.bg,
            border: `1.5px solid ${stat.border}`,
            borderRadius: '16px',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            cursor: 'default',
            boxShadow: 'none'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = `0 8px 24px ${stat.border}80`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {/* Icon circle */}
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            background: stat.iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            flexShrink: 0
          }}>
            {stat.icon}
          </div>

          {/* Text */}
          <div>
            <div style={{
              fontSize: '26px',
              fontWeight: '800',
              color: stat.color,
              lineHeight: 1,
              marginBottom: '4px'
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: '12px',
              fontWeight: '700',
              color: '#1a1a2e',
              marginBottom: '2px'
            }}>
              {stat.label}
            </div>
            <div style={{
              fontSize: '11px',
              color: '#94a3b8'
            }}>
              {stat.sub}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}