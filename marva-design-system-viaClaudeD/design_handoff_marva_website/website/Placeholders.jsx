// Placeholders.jsx — Section 6 (Partners) & Section 7 (Testimonials). Empty for now.
function Placeholders() {
  const block = (id, title) => (
    <section id={id} style={{ background: id === 'partners' ? 'var(--marva-sand-tint)' : 'var(--marva-white)', padding: 'clamp(40px,7vw,80px) clamp(20px,5vw,64px)' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ font: 'var(--text-display-l)', fontFamily: 'var(--font-hebrew)', color: 'var(--marva-black)', margin: '0 0 24px' }}>{title}</h2>
        <div style={{
          border: '2px dashed var(--color-border-default)', borderRadius: 'var(--radius-l)',
          padding: '48px 20px', font: 'var(--text-body-m)', color: 'var(--color-text-muted)',
        }}>
          בקרוב
        </div>
      </div>
    </section>
  );
  return (
    <React.Fragment>
      {block('partners', 'שותפים')}
      {block('testimonials', 'ממליצים')}
    </React.Fragment>
  );
}
window.Placeholders = Placeholders;
