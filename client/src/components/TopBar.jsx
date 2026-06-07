import { useAuth } from '../context/AuthContext';

export default function TopBar({ habitsCount, completedToday }) {
  const { user } = useAuth();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month:   'long',
    day:     'numeric'
  });

  const todayPct = habitsCount > 0
    ? Math.round((completedToday / habitsCount) * 100) : 0;

  const allDone = completedToday === habitsCount && habitsCount > 0;

  return (
    <div className="top-bar">

      {/* Left — greeting */}
      <div>
        <h1 style={{
          fontSize: '16px',
          fontWeight: '700',
          color: '#1a1a2e',
          margin: 0
        }}>
          {greeting}, <span style={{ color: '#6366f1' }}>{user?.name}</span> 👋
        </h1>
        <p style={{
          fontSize: '12px',
          color: '#94a3b8',
          margin: 0
        }}>
          {todayDate}
        </p>
      </div>

      {/* Center — progress pill */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: allDone ? '#f0fdf4' : '#f5f3ff',
        border: `1.5px solid ${allDone ? '#86efac' : '#c4b5fd'}`,
        borderRadius: '14px',
        padding: '8px 18px'
      }}>
        {/* Mini progress bar */}
        <div style={{
          width: '80px',
          height: '6px',
          background: '#e2e8f0',
          borderRadius: '3px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${todayPct}%`,
            background: allDone
              ? 'linear-gradient(90deg, #22c55e, #4ade80)'
              : 'linear-gradient(90deg, #6366f1, #a78bfa)',
            borderRadius: '3px',
            transition: 'width 0.6s ease'
          }} />
        </div>
        <span style={{
          fontSize: '13px',
          fontWeight: '700',
          color: allDone ? '#16a34a' : '#6366f1',
          whiteSpace: 'nowrap'
        }}>
          {allDone
            ? '🎉 All done!'
            : `${completedToday} / ${habitsCount} today`
          }
        </span>
      </div>

      {/* Right — stat pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: '#fff7ed',
          border: '1.5px solid #fed7aa',
          borderRadius: '10px',
          padding: '6px 12px'
        }}>
          <span style={{ fontSize: '14px' }}>🔥</span>
          <span style={{
            fontSize: '12px',
            fontWeight: '700',
            color: '#ea580c'
          }}>
            Streak Active
          </span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: '#eff6ff',
          border: '1.5px solid #bfdbfe',
          borderRadius: '10px',
          padding: '6px 12px'
        }}>
          <span style={{ fontSize: '14px' }}>⚡</span>
          <span style={{
            fontSize: '12px',
            fontWeight: '700',
            color: '#2563eb'
          }}>
            {habitsCount} Habits
          </span>
        </div>
      </div>

    </div>
  );
}