import React from 'react';

export function Input({ label, type = 'text', placeholder, value, onChange, style }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-body)', ...style }}>
      {label && <span style={{ font: 'var(--text-label)', color: 'var(--marva-black)' }}>{label}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          font: 'var(--text-body-m)',
          fontFamily: 'var(--font-body)',
          padding: '12px 14px',
          borderRadius: 'var(--radius-s)',
          border: `1px solid ${focus ? 'var(--marva-sage-deep)' : 'var(--color-border-default)'}`,
          outline: focus ? '2px solid var(--marva-sage-tint)' : 'none',
          background: 'var(--color-bg-surface)',
          color: 'var(--marva-black)',
          transition: 'border-color 120ms ease',
        }}
      />
    </label>
  );
}
