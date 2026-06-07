import { useState } from 'react';
import api from '../api/axios';

const CATEGORIES = [
  { value: 'health',      label: 'Health',      icon: '💪', color: '#16a34a', bg: '#f0fdf4', border: '#86efac', iconBg: '#dcfce7' },
  { value: 'learning',    label: 'Learning',    icon: '📚', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', iconBg: '#dbeafe' },
  { value: 'fitness',     label: 'Fitness',     icon: '🏃', color: '#ea580c', bg: '#fff7ed', border: '#fed7aa', iconBg: '#ffedd5' },
  { value: 'mindfulness', label: 'Mindfulness', icon: '🧘', color: '#7c3aed', bg: '#f5f3ff', border: '#c4b5fd', iconBg: '#ede9fe' },
  { value: 'other',       label: 'Other',       icon: '⭐', color: '#475569', bg: '#f8fafc', border: '#cbd5e1', iconBg: '#f1f5f9' },
];

export default function HabitModal({ habit, onClose, onSave }) {
  const [title, setTitle]       = useState(habit?.title || '');
  const [category, setCategory] = useState(habit?.category || 'health');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const selectedCat = CATEGORIES.find(c => c.value === category);

  const handleSave = async () => {
    if (!title.trim()) { setError('Please enter a habit title'); return; }
    setLoading(true);
    setError('');
    try {
      if (habit) {
        await api.put(`/habits/${habit._id}`, { title, category });
      } else {
        await api.post('/habits', { title, category });
      }
      onSave();
      onClose();
    } catch (err) {
      setError(err.response?.data?.msg || 'Save failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15,15,30,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '1rem',
      backdropFilter: 'blur(6px)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '460px',
        background: '#ffffff',
        border: '1.5px solid #e8ecf4',
        borderRadius: '24px',
        padding: '2rem',
        boxShadow: '0 20px 60px rgba(99,102,241,0.15)'
      }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '1.75rem'
        }}>
          <div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '800',
              color: '#1a1a2e',
              margin: '0 0 4px',
              letterSpacing: '-0.3px'
            }}>
              {habit ? '✏️  Edit Habit' : '⚡  New Habit'}
            </h3>
            <p style={{
              fontSize: '13px',
              color: '#94a3b8',
              margin: 0
            }}>
              {habit
                ? 'Update your habit details'
                : 'Add a new habit to track daily'}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '34px', height: '34px',
              borderRadius: '10px',
              background: '#f1f5f9',
              border: '1.5px solid #e2e8f0',
              color: '#94a3b8',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              flexShrink: 0
            }}
          >
            ✕
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1.5px solid #fecaca',
            borderRadius: '10px',
            padding: '10px 14px',
            color: '#dc2626',
            fontSize: '13px',
            marginBottom: '1.25rem'
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Title input */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            fontSize: '12px',
            fontWeight: '700',
            color: '#64748b',
            display: 'block',
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em'
          }}>
            Habit Title
          </label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Read Quran 30 minutes"
            autoFocus
          />
        </div>

        {/* Category selector */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            fontSize: '12px',
            fontWeight: '700',
            color: '#64748b',
            display: 'block',
            marginBottom: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em'
          }}>
            Category
          </label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '8px'
          }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                style={{
                  padding: '12px 6px',
                  borderRadius: '12px',
                  background: category === cat.value
                    ? cat.bg
                    : '#f8fafc',
                  border: category === cat.value
                    ? `1.5px solid ${cat.border}`
                    : '1.5px solid #e2e8f0',
                  color: category === cat.value
                    ? cat.color
                    : '#94a3b8',
                  fontSize: '11px',
                  fontWeight: '700',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'all 0.15s',
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em',
                  boxShadow: category === cat.value
                    ? `0 4px 12px ${cat.border}80`
                    : 'none'
                }}
              >
                <span style={{ fontSize: '22px' }}>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live preview */}
        {title.trim() && (
          <div style={{
            background: selectedCat.bg,
            border: `1.5px solid ${selectedCat.border}`,
            borderRadius: '12px',
            padding: '12px 16px',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: `0 4px 12px ${selectedCat.border}60`
          }}>
            <div style={{
              width: '40px', height: '40px',
              borderRadius: '10px',
              background: selectedCat.iconBg,
              display: 'flex', alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              flexShrink: 0
            }}>
              {selectedCat.icon}
            </div>
            <div>
              <p style={{
                fontSize: '14px',
                fontWeight: '700',
                color: '#1a1a2e',
                margin: '0 0 2px'
              }}>
                {title}
              </p>
              <p style={{
                fontSize: '11px',
                color: selectedCat.color,
                margin: 0,
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {selectedCat.label} · 0 day streak
              </p>
            </div>
            <span style={{
              marginLeft: 'auto',
              fontSize: '11px',
              color: '#94a3b8',
              fontWeight: '500'
            }}>
              Preview
            </span>
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '12px',
              background: '#f8fafc',
              border: '1.5px solid #e2e8f0',
              color: '#64748b',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            style={{
              flex: 2,
              padding: '12px',
              background: loading
                ? '#c4b5fd'
                : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: 'white',
              fontWeight: '700',
              fontSize: '14px',
              borderRadius: '12px',
              boxShadow: loading
                ? 'none'
                : '0 4px 20px rgba(99,102,241,0.35)',
              letterSpacing: '0.02em'
            }}
          >
            {loading
              ? '⏳ Saving...'
              : habit ? '✓ Save Changes' : '⚡ Add Habit'}
          </button>
        </div>

      </div>
    </div>
  );
}