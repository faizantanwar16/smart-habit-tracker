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
      color: '#a78bfa',
      glow: 'rgba(167,139,250,0.2)',
      border: 'rgba(167,139,250,0.25)',
      bg: 'rgba(167,139,250,0.06)'
    },
    {
      icon: '⚡',
      label: 'Today',
      value: `${todayPct}%`,
      sub: `${completedToday} of ${total} done`,
      color: '#2dd4bf',
      glow: 'rgba(45,212,191,0.2)',
      border: 'rgba(45,212,191,0.25)',
      bg: 'rgba(45,212,191,0.06)'
    },
    {
      icon: '🔥',
      label: 'Best Streak',
      value: longestStreak,
      sub: 'days in a row',
      color: '#fb923c',
      glow: 'rgba(251,146,60,0.2)',
      border: 'rgba(251,146,60,0.25)',
      bg: 'rgba(251,146,60,0.06)'
    },
    {
      icon: '✅',
      label: 'Total Done',
      value: totalDone,
      sub: 'all time',
      color: '#4ade80',
      glow: 'rgba(74,222,128,0.2)',
      border: 'rgba(74,222,128,0.25)',
      bg: 'rgba(74,222,128,0.06)'
    },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '12px',
      marginBottom: '1.5rem'
    }}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          style={{
            background: `linear-gradient(135deg, #12122a, #0e0e20)`,
            border: `1px solid ${stat.border}`,
            borderRadius: '18px',
            padding: '1.25rem',
            textAlign: 'center',
            boxShadow: `0 0 30px ${stat.glow}, inset 0 1px 0 rgba(255,255,255,0.04)`,
            transition: 'all 0.25s',
            cursor: 'default',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = `0 8px 40px ${stat.glow}, inset 0 1px 0 rgba(255,255,255,0.04)`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 0 30px ${stat.glow}, inset 0 1px 0 rgba(255,255,255,0.04)`;
          }}
        >
          {/* top glow blob */}
          <div style={{
            position: 'absolute',
            top: '-20px', left: '50%',
            transform: 'translateX(-50%)',
            width: '80px', height: '60px',
            background: `radial-gradient(ellipse, ${stat.color}20 0%, transparent 70%)`,
            pointerEvents: 'none'
          }} />

          <div style={{ fontSize: '26px', marginBottom: '8px' }}>
            {stat.icon}
          </div>

          <div style={{
            fontSize: '32px',
            fontWeight: '800',
            color: stat.color,
            marginBottom: '4px',
            textShadow: `0 0 30px ${stat.color}80`,
            lineHeight: 1
          }}>
            {stat.value}
          </div>

          <div style={{
            fontSize: '11px',
            fontWeight: '700',
            color: '#6b6b8a',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '3px'
          }}>
            {stat.label}
          </div>

          <div style={{
            fontSize: '11px',
            color: stat.color,
            opacity: 0.7
          }}>
            {stat.sub}
          </div>

        </div>
      ))}
    </div>
  );
}