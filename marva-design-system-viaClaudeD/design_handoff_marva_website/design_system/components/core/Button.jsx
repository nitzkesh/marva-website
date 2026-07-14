import React from 'react';

const sizes = {
  m: { padding: '12px 22px', font: 'var(--text-body-m)' },
  l: { padding: '16px 28px', font: 'var(--text-body-l)' },
};

const variants = {
  primary: {
    background: 'var(--color-cta-bg)',
    color: 'var(--color-cta-text)',
    border: '1px solid var(--color-cta-bg)',
  },
  secondary: {
    background: 'transparent',
    color: 'var(--marva-black)',
    border: '1px solid var(--marva-black)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--marva-black)',
    border: '1px solid transparent',
  },
};

export function Button({ children, variant = 'primary', size = 'm', disabled = false, onClick, style, ...rest }) {
  const v = variants[variant] || variants.primary;
  const s = sizes[size] || sizes.m;
  const [hover, setHover] = React.useState(false);

  const hoverBg = variant === 'primary' ? 'var(--color-cta-bg-hover)' : variant === 'secondary' ? 'var(--marva-sage-tint)' : 'var(--marva-sage-tint)';

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        font: s.font,
        padding: s.padding,
        borderRadius: 'var(--radius-pill)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: 'background-color 150ms ease, transform 100ms ease',
        background: hover && !disabled ? hoverBg : v.background,
        color: v.color,
        border: v.border,
        transform: hover && !disabled ? 'translateY(-1px)' : 'none',
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
