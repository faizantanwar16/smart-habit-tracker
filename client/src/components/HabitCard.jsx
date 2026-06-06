const today = new Date().toISOString().split('T')[0];

const CATEGORIES = {
  health:      { color: '#4ade80', glow: 'rgba(74,222,128,0.2)',   border: 'rgba(74,222,128,0.25)',   bg: 'rgba(74,222,128,0.08)',   icon: '💪', label: 'Health'      },
  learning:    { color: '#60a5fa', glow: 'rgba(96,165,250,0.2)',   border: 'rgba(96,165,250,0.25)',   bg: 'rgba(96,165,250,0.08)',   icon: '📚', label: 'Learning'    },
  fitness:     { color: '#fb923c', glow: 'rgba(251,146,60,0.2)',   border: 'rgba(251,146,60,0.25)',   bg: 'rgba(251,146,60,0.08)',   icon: '🏃', label: 'Fitness'     },
  mindfulness: { color: '#a78bfa', glow: 'rgba(167,139,250,0.2)',  border: 'rgba(167,139,250,0.25)',  bg: 'rgba(167,139,250,0.08)',  icon: '🧘', label: 'Mindfulness' },
  other:       { color: '#94a3b8', glow: 'rgba(148,163,184,0.2)',  border: 'rgba(148,163,184,0.25)',  bg: 'rgba(148,163,184,0.08)',  icon: '⭐', label: 'Other'       },
};

export default function HabitCard({ habit, onComplete, onEdit, onDelete }) {
  const doneToday = habit.completedDates.includes(today);
  const cat       = CATEGORIES[habit.category] || CATEGORIES.other;
  const streakIcon = habit.streak >= 14 ? '🔥🔥🔥'
                   : habit.streak >= 7  ? '🔥🔥'
                   : habit.streak >= 3  ? '🔥'
                   : '✦';

  const streakPct = Math.min((habit.streak / 30) * 100, 100);

  return (
    <div
      style={{
        background: doneToday
          ? `linear-gradient(135deg, #12122a, ${cat.color}08)`
          : 'linear-gradient(135deg, #12122a, #0e0e20)',
        border: `1px solid ${doneToday ? cat.color + '40' : '#2a2a4a'}`,
        borderRadius: '18px',
        padding: '1.25rem 1.5rem',
        marginBottom: '12px',
        transition: 'all 0.25s',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: doneToday ? `0 0 30px ${cat.glow}` : '0 2px 20px rgba(0,0,0,0.3)'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateX(6px)';
        e.currentTarget.style.borderColor = doneToday ? cat.color + '60' : '#3a3a5a';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateX(0)';
        e.currentTarget.style.borderColor = doneToday ? cat.color + '40' : '#2a2a4a';
      }}
    >
      {/* done today glow */}
      {doneToday && (
        <div style={{
          position: 'absolute',
          top: 0, right: 0,
          width: '200px', height: '100%',
          background: `radial-gradient(ellipse at right, ${cat.color}08 0%, transparent 70%)`,
          pointerEvents: 'none'
        }} />
      )}

      {/* done badge */}
      {doneToday && (
        <div style={{
          position: 'absolute',
          top: '12px', right: '12px',
          background: `${cat.color}20`,
          border: `1px solid ${cat.color}40`,
          borderRadius: '8px',
          padding: '3px 10px',
          fontSize: '11px',
          fontWeight: '700',
          color: cat.color,
          letterSpacing: '0.05em'
        }}>
          ✓ DONE
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>

        {/* Category icon */}
        <div style={{
          width: '52px', height: '52px',
          borderRadius: '14px',
          background: cat.bg,
          border: `1px solid ${cat.border}`,
          display: 'flex', alignItems: 'center',
          justifyContent: 'center',
          fontSize: '26px',
          flexShrink: 0,
          boxShadow: `0 0 20px ${cat.glow}`
        }}>
          {cat.icon}
        </div>

        {/* Title + category */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '700',
            color: doneToday ? '#6b6b8a' : '#e8e8f0',
            textDecoration: doneToday ? 'line-through' : 'none',
            margin: '0 0 5px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {habit.title}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              fontSize: '11px',
              fontWeight: '600',
              color: cat.color,
              background: cat.bg,
              border: `1px solid ${cat.border}`,
              borderRadius: '6px',
              padding: '2px 8px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {cat.label}
            </span>
            <span style={{ fontSize: '11px', color: '#4a4a6a' }}>
              {habit.completedDates.length} completions
            </span>
          </div>
        </div>

        {/* Streak badge */}
        <div style={{
          textAlign: 'center',
          background: 'rgba(251,146,60,0.08)',
          border: '1px solid rgba(251,146,60,0.25)',
          borderRadius: '14px',
          padding: '10px 16px',
          minWidth: '72px',
          flexShrink: 0,
          boxShadow: habit.streak > 0 ? '0 0 20px rgba(251,146,60,0.15)' : 'none'
        }}>
          <div style={{
            fontSize: '11px',
            marginBottom: '2px'
          }}>
            {streakIcon}
          </div>
          <div style={{
            fontSize: '22px',
            fontWeight: '800',
            color: '#fb923c',
            lineHeight: 1,
            textShadow: habit.streak > 0 ? '0 0 20px rgba(251,146,60,0.6)' : 'none'
          }}>
            {habit.streak}
          </div>
          <div style={{ fontSize: '10px', color: '#4a4a6a', marginTop: '2px' }}>
            day streak
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
          <button
            onClick={() => onComplete(habit._id)}
            disabled={doneToday}
            style={{
              padding: '9px 16px',
              background: doneToday
                ? `${cat.color}15`
                : 'linear-gradient(135deg, #059669, #4ade80)',
              color: doneToday ? cat.color : 'white',
              border: doneToday ? `1px solid ${cat.color}30` : 'none',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: '700',
              boxShadow: doneToday ? 'none' : '0 4px 15px rgba(74,222,128,0.3)',
              whiteSpace: 'nowrap'
            }}
          >
            {doneToday ? '✓ Done' : '+ Complete'}
          </button>

          <button
            onClick={() => onEdit(habit)}
            style={{
              padding: '9px 13px',
              background: 'rgba(167,139,250,0.08)',
              border: '1px solid rgba(167,139,250,0.2)',
              color: '#a78bfa',
              borderRadius: '10px',
              fontSize: '15px'
            }}
          >
            ✏️
          </button>

          <button
            onClick={() => onDelete(habit._id)}
            style={{
              padding: '9px 13px',
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.2)',
              color: '#f87171',
              borderRadius: '10px',
              fontSize: '15px'
            }}
          >
            🗑️
          </button>
        </div>

      </div>

      {/* Progress bar */}
      <div style={{ marginTop: '14px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '6px'
        }}>
          <span style={{ fontSize: '11px', color: '#4a4a6a' }}>
            Streak progress to 30 days
          </span>
          <span style={{ fontSize: '11px', color: cat.color, fontWeight: '600' }}>
            {habit.streak > 0 ? `${habit.streak} / 30 days 🔥` : 'Start your streak!'}
          </span>
        </div>
        <div style={{
          height: '5px',
          background: '#1e1e3a',
          borderRadius: '3px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${streakPct}%`,
            background: `linear-gradient(90deg, ${cat.color}60, ${cat.color})`,
            borderRadius: '3px',
            transition: 'width 0.6s ease',
            boxShadow: `0 0 8px ${cat.color}60`
          }} />
        </div>
      </div>

    </div>
  );
}