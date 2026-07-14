import React from 'react';

export function Card({ children, accent, style }) {
  return (
    <div
      style={{
        background: 'var(--color-bg-surface)',
        borderRadius: 'var(--radius-l)',
        boxShadow: 'var(--shadow-card)',
        padding: 'var(--space-6)',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {accent && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            insetInlineStart: 0,
            width: '100%',
            height: 4,
            background: accent,
          }}
        />
      )}
      {children}
    </div>
  );
}
