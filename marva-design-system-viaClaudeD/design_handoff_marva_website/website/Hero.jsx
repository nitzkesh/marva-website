// Hero.jsx — Section 1. Background off-white, geometric Bauhaus accents, no photo.
function Hero({ onAdvertise }) {
  const { Button } = window.MarvaDesignSystem_1ef21b;
  return (
    <section style={{
      position: 'relative', overflow: 'hidden', background: 'var(--color-bg-page)',
      padding: 'clamp(56px,9vw,110px) clamp(20px,5vw,64px)',
    }}>
      {/* Bauhaus geometry accents */}
      <div style={{ position: 'absolute', top: -60, insetInlineStart: -60, width: 260, height: 260, borderRadius: '0 0 100% 0', background: 'var(--marva-sage)', opacity: 0.5, zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: 40, insetInlineEnd: 80, width: 120, height: 120, borderRadius: '50%', background: 'var(--marva-sky)', opacity: 0.45, zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: -40, insetInlineEnd: -40, width: 180, height: 180, background: 'var(--marva-sand)', opacity: 0.55, zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 760 }}>
        <h1 style={{ font: 'var(--text-display-xl)', fontFamily: 'var(--font-hebrew)', color: 'var(--marva-black)', margin: '0 0 18px' }}>
          מים בחינם
        </h1>
        <p style={{ font: 'var(--text-display-m)', fontFamily: 'var(--font-hebrew)', color: 'var(--marva-black)', margin: '0 0 14px', fontWeight: 700 }}>
          המותג שלכם, ביד של כולם
        </p>
        <p style={{ font: 'var(--text-body-l)', color: '#3A413C', maxWidth: 520, margin: '0 0 30px' }}>
          מפרסמים משלמים על הבקבוקים, אנשים שותים בחינם.
        </p>
        <Button variant="primary" size="l" onClick={onAdvertise}>אני רוצה לפרסם</Button>
      </div>
    </section>
  );
}
window.Hero = Hero;
