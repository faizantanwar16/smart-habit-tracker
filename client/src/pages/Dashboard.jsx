import { useEffect, useState } from 'react';
import api from '../api/axios';
import Sidebar    from '../components/Sidebar';
import TopBar     from '../components/TopBar';
import StatsBar   from '../components/StatsBar';
import HabitCard  from '../components/HabitCard';
import HabitModal from '../components/HabitModal';

export default function Dashboard() {
  const [habits, setHabits]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editHabit, setEditHabit] = useState(null);

  useEffect(() => {
    const loadHabits = async () => {
      try {
        const { data } = await api.get('/habits');
        setHabits(data);
      } catch (err) {
        console.error('Failed to fetch habits', err);
      } finally {
        setLoading(false);
      }
    };
    loadHabits();
  }, []);

  const fetchHabits = async () => {
    const { data } = await api.get('/habits');
    setHabits(data);
  };

  const handleComplete = async (id) => {
    try {
      const { data } = await api.post(`/habits/${id}/complete`);
      setHabits(prev => prev.map(h => h._id === id ? data : h));
    } catch (err) {
      alert(err.response?.data?.msg || 'Error completing habit');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this habit?')) return;
    try {
      await api.delete(`/habits/${id}`);
      setHabits(prev => prev.filter(h => h._id !== id));
    } catch {
      alert('Failed to delete habit');
    }
  };

  const openEdit   = (habit) => { setEditHabit(habit); setShowModal(true); };
  const closeModal = ()      => { setShowModal(false); setEditHabit(null); };

  const today          = new Date().toISOString().split('T')[0];
  const completedToday = habits.filter(h => h.completedDates.includes(today)).length;
  const todayPct       = habits.length > 0
    ? Math.round((completedToday / habits.length) * 100) : 0;
  const longestStreak  = habits.length > 0
    ? Math.max(...habits.map(h => h.streak)) : 0;

  return (
    <div className="app-shell">

      <Sidebar />

      <div className="main-content">
        <TopBar
          habitsCount={habits.length}
          completedToday={completedToday}
        />

        <div className="page-content">

          {/* Stats row */}
          <StatsBar habits={habits} />

          {/* Middle bento row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '12px',
            marginBottom: '1.25rem'
          }}>

            {/* Daily quest progress */}
            <div
              className="bento-card"
              style={{
                gridColumn: 'span 2',
                background: todayPct === 100 ? '#f0fdf4' : '#ffffff',
                border: `1.5px solid ${todayPct === 100 ? '#86efac' : '#e8ecf4'}`
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <div>
                  <p style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    margin: '0 0 4px'
                  }}>
                    Daily Quest Progress
                  </p>
                  <h3 style={{
                    fontSize: '32px',
                    fontWeight: '800',
                    color: todayPct === 100 ? '#16a34a' : '#1a1a2e',
                    margin: 0,
                    lineHeight: 1
                  }}>
                    {todayPct}%
                  </h3>
                </div>
                <div style={{
                  background: todayPct === 100 ? '#dcfce7' : '#f5f3ff',
                  border: `1.5px solid ${todayPct === 100 ? '#86efac' : '#c4b5fd'}`,
                  borderRadius: '10px',
                  padding: '6px 12px',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: todayPct === 100 ? '#16a34a' : '#6366f1'
                }}>
                  {completedToday} / {habits.length} done
                </div>
              </div>

              {/* Progress bar */}
              <div style={{
                height: '10px',
                background: '#f1f5f9',
                borderRadius: '5px',
                overflow: 'hidden',
                marginBottom: '8px'
              }}>
                <div style={{
                  height: '100%',
                  width: `${todayPct}%`,
                  background: todayPct === 100
                    ? 'linear-gradient(90deg, #16a34a, #4ade80)'
                    : 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                  borderRadius: '5px',
                  transition: 'width 0.8s ease',
                  boxShadow: todayPct === 100
                    ? '0 0 12px rgba(74,222,128,0.4)'
                    : '0 0 12px rgba(99,102,241,0.3)'
                }} />
              </div>

              {/* Markers */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                {['25%', '50%', '75%', '100%'].map(m => (
                  <span key={m} style={{ fontSize: '10px', color: '#cbd5e1' }}>
                    {m}
                  </span>
                ))}
              </div>

              {/* Habit pills */}
              {todayPct === 100 && habits.length > 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '10px',
                  background: '#dcfce7',
                  border: '1.5px solid #86efac',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#16a34a'
                }}>
                  🎉 All quests complete! You crushed it today!
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {habits.map(h => {
                    const done = h.completedDates.includes(today);
                    return (
                      <div key={h._id} style={{
                        fontSize: '11px',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: done ? '#dcfce7' : '#f8fafc',
                        border: `1px solid ${done ? '#86efac' : '#e2e8f0'}`,
                        color: done ? '#16a34a' : '#94a3b8',
                        fontWeight: '600'
                      }}>
                        {done ? '✓' : '○'} {h.title}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Top streaks */}
            <div className="bento-card">
              <p style={{
                fontSize: '11px',
                fontWeight: '700',
                color: '#94a3b8',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                margin: '0 0 1rem'
              }}>
                🏆 Top Streaks
              </p>

              {habits.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '2rem 0',
                  color: '#cbd5e1',
                  fontSize: '13px'
                }}>
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>🏆</div>
                  No habits yet
                </div>
              ) : (
                [...habits]
                  .sort((a, b) => b.streak - a.streak)
                  .slice(0, 4)
                  .map((h, i) => (
                    <div key={h._id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 0',
                      borderBottom: i < 3 ? '1px solid #f1f5f9' : 'none'
                    }}>
                      <span style={{
                        fontSize: '14px',
                        width: '20px',
                        textAlign: 'center',
                        flexShrink: 0
                      }}>
                        {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '4️⃣'}
                      </span>
                      <span style={{
                        fontSize: '13px',
                        color: '#334155',
                        flex: 1,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontWeight: '500'
                      }}>
                        {h.title}
                      </span>
                      <span style={{
                        fontSize: '13px',
                        fontWeight: '700',
                        color: '#ea580c',
                        flexShrink: 0
                      }}>
                        🔥 {h.streak}
                      </span>
                    </div>
                  ))
              )}

              {habits.length > 0 && (
                <div style={{
                  marginTop: '1rem',
                  padding: '8px',
                  background: '#fff7ed',
                  border: '1.5px solid #fed7aa',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <span style={{
                    fontSize: '12px',
                    color: '#ea580c',
                    fontWeight: '700'
                  }}>
                    Best: {longestStreak} day streak 🔥
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Habits list */}
          <div className="bento-card">

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <div>
                <h2 style={{
                  fontSize: '16px',
                  fontWeight: '800',
                  color: '#1a1a2e',
                  margin: '0 0 3px'
                }}>
                  My Habits
                </h2>
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
                  {habits.length} active {habits.length === 1 ? 'habit' : 'habits'} · {completedToday} done today
                </p>
              </div>

              <button
                onClick={() => setShowModal(true)}
                style={{
                  padding: '9px 18px',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  color: 'white',
                  fontWeight: '700',
                  fontSize: '13px',
                  borderRadius: '10px',
                  boxShadow: '0 4px 16px rgba(99,102,241,0.35)'
                }}
              >
                + Add Habit
              </button>
            </div>

            {/* Category filter pills */}
            {habits.length > 0 && (
              <div style={{
                display: 'flex',
                gap: '6px',
                marginBottom: '1rem',
                flexWrap: 'wrap'
              }}>
                {['all', 'health', 'learning', 'fitness', 'mindfulness', 'other'].map(cat => {
                  const count = cat === 'all'
                    ? habits.length
                    : habits.filter(h => h.category === cat).length;
                  if (count === 0 && cat !== 'all') return null;
                  return (
                    <div key={cat} style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      padding: '4px 12px',
                      borderRadius: '8px',
                      background: cat === 'all' ? '#f5f3ff' : '#f8fafc',
                      border: `1.5px solid ${cat === 'all' ? '#c4b5fd' : '#e2e8f0'}`,
                      color: cat === 'all' ? '#6366f1' : '#64748b',
                      cursor: 'pointer',
                      textTransform: 'capitalize'
                    }}>
                      {cat === 'all' ? `All (${count})` : `${cat} (${count})`}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div style={{
                textAlign: 'center',
                padding: '3rem',
                color: '#94a3b8'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>⏳</div>
                <p style={{ fontSize: '14px' }}>Loading your habits...</p>
              </div>
            )}

            {/* Empty state */}
            {!loading && habits.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '3rem 2rem',
                border: '1.5px dashed #e2e8f0',
                borderRadius: '16px',
                background: '#f8fafc'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '1rem' }}>🎯</div>
                <h3 style={{
                  color: '#1a1a2e',
                  marginBottom: '8px',
                  fontSize: '18px',
                  fontWeight: '700'
                }}>
                  No habits yet
                </h3>
                <p style={{
                  color: '#94a3b8',
                  fontSize: '14px',
                  marginBottom: '1.5rem'
                }}>
                  Add your first habit and start building your streak today
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  style={{
                    padding: '10px 24px',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    color: 'white',
                    fontWeight: '700',
                    borderRadius: '10px',
                    boxShadow: '0 4px 16px rgba(99,102,241,0.35)'
                  }}
                >
                  ⚡ Add Your First Habit
                </button>
              </div>
            )}

            {/* Habit cards */}
            {!loading && habits.map(h => (
              <HabitCard
                key={h._id}
                habit={h}
                onComplete={handleComplete}
                onEdit={openEdit}
                onDelete={handleDelete}
              />
            ))}

          </div>

        </div>
      </div>

      {showModal && (
        <HabitModal
          habit={editHabit}
          onClose={closeModal}
          onSave={fetchHabits}
        />
      )}

    </div>
  );
}