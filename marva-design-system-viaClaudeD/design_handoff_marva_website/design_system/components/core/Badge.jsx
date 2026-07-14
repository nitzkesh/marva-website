import React from 'react';

const tones = {
  sage: { background: 'var(--marva-sage)', color: 'var(--marva-black)' },
  sky: { background: 'var(--marva-sky)', color: 'var(--marva-black)' },
  sand: { background: 'var(--marva-sand)', color: 'var(--marva-black)' },
  outline: { background: 'transparent', color: 'var(--marva-off-white)', border: '1px solid rgba(251,250,246,0.4)' },
};

export function Badge({ children, tone = 'sage', style }) {
  const t = tones[tone] || tones.sage;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '6px 14px',
        borderRadius: 'var(--radius-pill)',
        font: 'var(--text-label)',
        letterSpacing: 'var(--tracking-wide)',
        textTransform: 'uppercase',
        ...t,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
