// HowItWorks.jsx — Section 4. Three numbered cards.
const HOW_STEPS = [
  { n: '01', title: 'קבלת הצעת מחיר', body: 'הצעה לפי פרטי הקמפיין שלכם.' },
  { n: '02', title: 'עיצוב התווית', body: 'מעצבים את התווית — הרקע ואזור עיצוב מוגדר הם שלכם.' },
  { n: '03', title: 'יוצאים לדרך!', body: 'מגיעים ליד של קהל היעד שלכם.' },
];

function HowItWorks() {
  const { Card } = window.MarvaDesignSystem_1ef21b;
  return (
    <section id="how" style={{ background: 'var(--marva-sand-tint)', padding: 'clamp(48px,8vw,96px) clamp(20px,5vw,64px)' }}>
      <h2 style={{ font: 'var(--text-display-l)', fontFamily: 'var(--font-hebrew)', color: 'var(--marva-black)', textAlign: 'center', margin: '0 0 48px' }}>
        איך זה עובד?
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 960, margin: '0 auto' }}>
        {HOW_STEPS.map(s => (
          <Card key={s.n}>
            <div style={{ font: '700 3rem var(--font-display)', color: 'var(--marva-sage-deep)', marginBottom: 8 }}>{s.n}</div>
            <h3 style={{ font: 'var(--text-display-s)', fontFamily: 'var(--font-hebrew)', color: 'var(--marva-black)', margin: '0 0 10px' }}>{s.title}</h3>
            <p style={{ font: 'var(--text-body-m)', color: '#3A413C', margin: 0 }}>{s.body}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
window.HowItWorks = HowItWorks;
