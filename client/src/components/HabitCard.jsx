const today = new Date().toDateString();

const CATEGORIES = {
  health:      { color: '#16a34a', bg: '#f0fdf4', border: '#86efac', iconBg: '#dcfce7', icon: '💪', label: 'Health'      },
  learning:    { color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', iconBg: '#dbeafe', icon: '📚', label: 'Learning'    },
  fitness:     { color: '#ea580c', bg: '#fff7ed', border: '#fed7aa', iconBg: '#ffedd5', icon: '🏃', label: 'Fitness'     },
  mindfulness: { color: '#7c3aed', bg: '#f5f3ff', border: '#c4b5fd', iconBg: '#ede9fe', icon: '🧘', label: 'Mindfulness' },
  other:       { color: '#475569', bg: '#f8fafc', border: '#cbd5e1', iconBg: '#f1f5f9', icon: '⭐', label: 'Other'       },
};

export default function HabitCard({ habit, onComplete, onEdit, onDelete }) {
  const doneToday = habit.completedDates.some(
  date => new Date(date).toDateString() === today
);
  const cat        = CATEGORIES[habit.category] || CATEGORIES.other;
  const streakIcon = habit.streak >= 14 ? '🔥🔥🔥'
                   : habit.streak >= 7  ? '🔥🔥'
                   : habit.streak >= 3  ? '🔥'
                   : '✦';
  const streakPct  = Math.min((habit.streak / 30) * 100, 100);

  return (
    <div
      className="bento-card"
      style={{
        marginBottom: '10px',
        background: doneToday ? cat.bg : '#ffffff',
        border: `1.5px solid ${doneToday ? cat.border : '#e8ecf4'}`,
        borderRadius: '14px',
        padding: '1rem 1.25rem',
        boxShadow: doneToday
          ? `0 4px 16px ${cat.border}60`
          : '0 2px 8px rgba(99,102,241,0.06)'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateX(4px)';
        e.currentTarget.style.boxShadow = `0 6px 20px rgba(99,102,241,0.12)`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateX(0)';
        e.currentTarget.style.boxShadow = doneToday
          ? `0 4px 16px ${cat.border}60`
          : '0 2px 8px rgba(99,102,241,0.06)';
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px'
      }}>

        {/* Category icon */}
        <div style={{
          width: '48px', height: '48px',
          borderRadius: '13px',
          background: cat.iconBg,
          border: `1.5px solid ${cat.border}`,
          display: 'flex', alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          flexShrink: 0
        }}>
          {cat.icon}
        </div>

        {/* Title + category */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h3 style={{
              fontSize: '15px',
              fontWeight: '700',
              color: doneToday ? '#94a3b8' : '#1a1a2e',
              textDecoration: doneToday ? 'line-through' : 'none',
              margin: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {habit.title}
            </h3>
            {doneToday && (
              <span style={{
                fontSize: '11px',
                fontWeight: '700',
                color: '#16a34a',
                background: '#dcfce7',
                border: '1px solid #86efac',
                borderRadius: '6px',
                padding: '1px 7px',
                flexShrink: 0
              }}>
                ✓ Done
              </span>
            )}
          </div>
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
              letterSpacing: '0.04em'
            }}>
              {cat.label}
            </span>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>
              {habit.completedDates.length} completions
            </span>
          </div>
        </div>

        {/* Streak badge */}
        <div style={{
          textAlign: 'center',
          background: '#fff7ed',
          border: '1.5px solid #fed7aa',
          borderRadius: '12px',
          padding: '8px 14px',
          minWidth: '70px',
          flexShrink: 0
        }}>
          <div style={{ fontSize: '11px', marginBottom: '2px' }}>
            {streakIcon}
          </div>
          <div style={{
            fontSize: '22px',
            fontWeight: '800',
            color: '#ea580c',
            lineHeight: 1
          }}>
            {habit.streak}
          </div>
          <div style={{
            fontSize: '10px',
            color: '#94a3b8',
            marginTop: '2px'
          }}>
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
                ? '#f0fdf4'
                : 'linear-gradient(135deg, #16a34a, #4ade80)',
              color: doneToday ? '#86efac' : 'white',
              border: doneToday ? '1.5px solid #86efac' : 'none',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: '700',
              boxShadow: doneToday
                ? 'none'
                : '0 4px 12px rgba(22,163,74,0.3)',
              whiteSpace: 'nowrap'
            }}
          >
            {doneToday ? '✓ Done' : '+ Complete'}
          </button>

          <button
            onClick={() => onEdit(habit)}
            style={{
              padding: '9px 13px',
              background: '#f5f3ff',
              border: '1.5px solid #c4b5fd',
              color: '#7c3aed',
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
              background: '#fef2f2',
              border: '1.5px solid #fecaca',
              color: '#dc2626',
              borderRadius: '10px',
              fontSize: '15px'
            }}
          >
            🗑️
          </button>
        </div>

      </div>

      {/* Progress bar */}
      <div style={{ marginTop: '12px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '5px'
        }}>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>
            Streak progress to 30 days
          </span>
          <span style={{
            fontSize: '11px',
            color: cat.color,
            fontWeight: '600'
          }}>
            {habit.streak > 0
              ? `${habit.streak} / 30 🔥`
              : 'Start your streak!'}
          </span>
        </div>
        <div style={{
          height: '5px',
          background: '#f1f5f9',
          borderRadius: '3px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${streakPct}%`,
            background: `linear-gradient(90deg, ${cat.color}80, ${cat.color})`,
            borderRadius: '3px',
            transition: 'width 0.6s ease'
          }} />
        </div>
      </div>

    </div>
  );
}