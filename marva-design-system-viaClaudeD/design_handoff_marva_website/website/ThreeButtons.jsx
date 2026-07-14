// ThreeButtons.jsx — Section 5. Three routes into the forms panel below.
function ThreeButtons({ onRoute }) {
  const options = [
    { key: 'business', label: 'אני רוצה בקבוקים לעסק שלי' },
    { key: 'find', label: 'איפה תמצאו אותנו?' },
    { key: 'advertise', label: 'אני רוצה לפרסם' },
  ];
  return (
    <section style={{ background: 'var(--marva-white)', padding: 'clamp(48px,8vw,96px) clamp(20px,5vw,64px)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, maxWidth: 900, margin: '0 auto' }}>
        {options.map(o => (
          <button
            key={o.key}
            onClick={() => onRoute(o.key)}
            style={{
              padding: '28px 20px', borderRadius: 'var(--radius-l)', cursor: 'pointer',
              background: 'var(--marva-sand-tint)', border: '1px solid var(--color-border-default)',
              font: '700 1.15rem var(--font-hebrew)', color: 'var(--marva-black)',
              transition: 'background-color 150ms ease, transform 100ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--marva-sand)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--marva-sand-tint)'; e.currentTarget.style.transform = 'none'; }}
          >
            {o.label}
          </button>
        ))}
      </div>
    </section>
  );
}
window.ThreeButtons = ThreeButtons;
