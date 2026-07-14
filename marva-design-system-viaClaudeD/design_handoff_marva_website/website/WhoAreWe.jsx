// WhoAreWe.jsx — Section 2. Text + bottle mockup with a blank "Your Brand Here" label.
function WhoAreWe() {
  return (
    <section id="who" style={{ background: 'var(--marva-sand-tint)', padding: 'clamp(48px,8vw,96px) clamp(20px,5vw,64px)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 56, alignItems: 'center', maxWidth: 1080, margin: '0 auto' }}>
        <div>
          <h2 style={{ font: 'var(--text-display-l)', fontFamily: 'var(--font-hebrew)', color: 'var(--marva-black)', margin: '0 0 20px' }}>
            מי אנחנו?
          </h2>
          <p style={{ font: 'var(--text-body-l)', color: '#3A413C', margin: 0, maxWidth: 460 }}>
            חברת מרווה היא פלטפורמה לפרסום על תוויות של בקבוקי מים. כשהבקבוקים מחולקים בחינם — כולם מרוויחים.
          </p>
        </div>

        {/* Bottle mockup with an overlaid blank label */}
        <div style={{ position: 'relative', justifySelf: 'center', width: '100%', maxWidth: 360 }}>
          <img src="../../assets/imagery/lifestyle-bottle-promenade.png" alt="בקבוק מרווה" style={{ width: '100%', borderRadius: 'var(--radius-l)', display: 'block' }} />
          {/* Blank customizable label covering the printed one */}
          <div style={{
            position: 'absolute', top: '43%', insetInlineStart: '31%', width: '42%', height: '46%',
            background: 'var(--marva-off-white)', borderRadius: 4,
            boxShadow: '0 1px 4px rgba(17,17,17,0.12)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 8px', boxSizing: 'border-box',
          }}>
            <span style={{ flex: 1, display: 'flex', alignItems: 'center', textAlign: 'center', font: '700 clamp(0.7rem,1.6vw,1rem)/1.2 var(--font-hebrew)', color: 'var(--marva-black)' }}>
              המותג שלכם כאן
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <img src="../../assets/logos/marva-mark.png" alt="" style={{ height: 18, width: 18, objectFit: 'contain' }} />
              <span style={{ font: '700 0.75rem var(--font-hebrew)', color: 'var(--marva-black)' }}>מרווה</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
window.WhoAreWe = WhoAreWe;
