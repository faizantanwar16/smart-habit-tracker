import { useEffect, useState } from 'react';
import api from '../api/axios';
import HabitCard  from '../components/HabitCard';
import HabitModal from '../components/HabitModal';
import StatsBar   from '../components/StatsBar';
import Navbar     from '../components/Navbar';

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
    } catch (err) {
      alert('Failed to delete habit');
    }
  };

  const openEdit   = (habit) => { setEditHabit(habit); setShowModal(true); };
  const closeModal = ()      => { setShowModal(false); setEditHabit(null); };

  const today           = new Date().toISOString().split('T')[0];
  const completedToday  = habits.filter(h => h.completedDates.includes(today)).length;
  const todayPct        = habits.length > 0
    ? Math.round((completedToday / habits.length) * 100) : 0;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f0f1a',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <Navbar />
        <StatsBar habits={habits} />

        {/* Daily progress bar */}
        <div style={{
          background: '#13132a',
          border: '1px solid #2e2e4e',
          borderRadius: '16px',
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px'
          }}>
            <span style={{ fontSize: '13px', color: '#9090b0', fontWeight: '500' }}>
              Daily Quest Progress
            </span>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#2dd4bf' }}>
              {completedToday} / {habits.length} completed
            </span>
          </div>
          <div style={{
            height: '8px',
            background: '#2e2e4e',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${todayPct}%`,
              background: todayPct === 100
                ? 'linear-gradient(90deg, #059669, #4ade80)'
                : 'linear-gradient(90deg, #7c3aed, #2dd4bf)',
              borderRadius: '4px',
              transition: 'width 0.6s ease',
              boxShadow: todayPct === 100
                ? '0 0 12px rgba(74,222,128,0.5)'
                : '0 0 12px rgba(45,212,191,0.3)'
            }} />
          </div>
          {todayPct === 100 && habits.length > 0 && (
            <p style={{
              textAlign: 'center',
              marginTop: '8px',
              fontSize: '13px',
              color: '#4ade80',
              fontWeight: '600'
            }}>
              🎉 All habits complete! Amazing work today!
            </p>
          )}
        </div>

        {/* Habits header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#e8e8f0', margin: 0 }}>
              My Habits
            </h2>
            <p style={{ fontSize: '12px', color: '#6b6b8a', margin: '3px 0 0' }}>
              {habits.length} active {habits.length === 1 ? 'habit' : 'habits'}
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
              color: 'white',
              fontWeight: '600',
              fontSize: '14px',
              borderRadius: '10px',
              boxShadow: '0 4px 20px rgba(124,58,237,0.3)'
            }}
          >
            + Add Habit
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#6b6b8a' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>⏳</div>
            <p>Loading your habits...</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && habits.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: '#13132a',
            border: '1px dashed #2e2e4e',
            borderRadius: '20px'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '1rem' }}>🎯</div>
            <h3 style={{ color: '#e8e8f0', marginBottom: '8px' }}>
              No habits yet
            </h3>
            <p style={{ color: '#6b6b8a', fontSize: '14px', marginBottom: '1.5rem' }}>
              Add your first habit and start building your streak today
            </p>
            <button
              onClick={() => setShowModal(true)}
              style={{
                padding: '10px 24px',
                background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
                color: 'white',
                fontWeight: '600',
                borderRadius: '10px',
                boxShadow: '0 4px 20px rgba(124,58,237,0.3)'
              }}
            >
              ⚡ Add Your First Habit
            </button>
          </div>
        )}

        {/* Habit list */}
        {habits.map(h => (
          <HabitCard
            key={h._id}
            habit={h}
            onComplete={handleComplete}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        ))}

        {showModal && (
          <HabitModal
            habit={editHabit}
            onClose={closeModal}
            onSave={fetchHabits}
          />
        )}

      </div>
    </div>
  );
}