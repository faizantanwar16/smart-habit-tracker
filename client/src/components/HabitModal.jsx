import { useState } from 'react';
import api from '../api/axios';

const CATEGORIES = [
  { value: 'health',      label: 'Health',      icon: '💪', color: '#4ade80', glow: 'rgba(74,222,128,0.2)',  border: 'rgba(74,222,128,0.25)',  bg: 'rgba(74,222,128,0.08)'  },
  { value: 'learning',    label: 'Learning',    icon: '📚', color: '#60a5fa', glow: 'rgba(96,165,250,0.2)',  border: 'rgba(96,165,250,0.25)',  bg: 'rgba(96,165,250,0.08)'  },
  { value: 'fitness',     label: 'Fitness',     icon: '🏃', color: '#fb923c', glow: 'rgba(251,146,60,0.2)',  border: 'rgba(251,146,60,0.25)',  bg: 'rgba(251,146,60,0.08)'  },
  { value: 'mindfulness', label: 'Mindfulness', icon: '🧘', color: '#a78bfa', glow: 'rgba(167,139,250,0.2)', border: 'rgba(167,139,250,0.25)', bg: 'rgba(167,139,250,0.08)' },
  { value: 'other',       label: 'Other',       icon: '⭐', color: '#94a3b8', glow: 'rgba(148,163,184,0.2)', border: 'rgba(148,163,184,0.25)', bg: 'rgba(148,163,184,0.08)' },
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
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '1rem',
      backdropFilter: 'blur(8px)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '460px',
        background: 'linear-gradient(135deg, #12122a 0%, #0e0e20 100%)',
        border: '1px solid #2a2a4a',
        borderRadius: '24px',
        padding: '2rem',
        boxShadow: '0 0 80px rgba(124,58,237,0.2), 0 0 40px rgba(0,0,0,0.5)',
        position: 'relative',
        overflow: 'hidden'
      }}>

        {/* background glow */}
        <div style={{
          position: 'absolute',
          top: '-60px', left: '50%',
          transform: 'translateX(-50%)',
          width: '300px', height: '200px',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '1.75rem',
          position: 'relative'
        }}>
          <div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '800',
              color: '#e8e8f0',
              margin: '0 0 4px',
              letterSpacing: '-0.3px'
            }}>
              {habit ? '✏️  Edit Habit' : '⚡  New Quest'}
            </h3>
            <p style={{ fontSize: '13px', color: '#4a4a6a', margin: 0 }}>
              {habit ? 'Update your habit details' : 'Add a new habit to your arsenal'}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '34px', height: '34px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid #2a2a4a',
              color: '#6b6b8a',
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

        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.25)',
            borderRadius: '10px',
            padding: '10px 14px',
            color: '#f87171',
            fontSize: '13px',
            marginBottom: '1.25rem'
          }}>
            ⚠️  {error}
          </div>
        )}

        {/* Title input */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            fontSize: '12px',
            fontWeight: '700',
            color: '#6b6b8a',
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
            color: '#6b6b8a',
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
                  background: category === cat.value ? cat.bg : 'rgba(255,255,255,0.02)',
                  border: category === cat.value
                    ? `1px solid ${cat.border}`
                    : '1px solid #2a2a4a',
                  color: category === cat.value ? cat.color : '#4a4a6a',
                  fontSize: '11px',
                  fontWeight: '700',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'all 0.15s',
                  boxShadow: category === cat.value ? `0 0 16px ${cat.glow}` : 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em'
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
            border: `1px solid ${selectedCat.border}`,
            borderRadius: '12px',
            padding: '12px 16px',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: `0 0 20px ${selectedCat.glow}`
          }}>
            <span style={{ fontSize: '24px' }}>{selectedCat.icon}</span>
            <div>
              <p style={{
                fontSize: '14px',
                fontWeight: '700',
                color: '#e8e8f0',
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
            <div style={{
              marginLeft: 'auto',
              fontSize: '11px',
              color: '#4a4a6a'
            }}>
              Preview
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '12px',
              background: 'transparent',
              border: '1px solid #2a2a4a',
              color: '#6b6b8a',
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
                ? 'rgba(124,58,237,0.4)'
                : 'linear-gradient(135deg, #7c3aed, #a78bfa)',
              color: 'white',
              fontWeight: '700',
              fontSize: '14px',
              borderRadius: '12px',
              boxShadow: loading ? 'none' : '0 4px 24px rgba(124,58,237,0.4)',
              letterSpacing: '0.02em'
            }}
          >
            {loading ? '⏳  Saving...' : habit ? '✓  Save Changes' : '⚡  Add to Arsenal'}
          </button>
        </div>

      </div>
    </div>
  );
}