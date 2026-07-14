// WhereBottlesGo.jsx — Section 3. Four parallel cards.
const WHERE_CARDS = [
  { title: 'נקודות חלוקה אסטרטגיות', body: 'חופים, טיילות ומוקדים חמים בתל אביב.', accent: 'var(--marva-sage)' },
  { title: 'בתי עסק', body: 'הבקבוקים מגיעים ישירות לסניפי הרשת.', accent: 'var(--marva-sky)' },
  { title: 'אירועים', body: 'אירועי ספורט ותרבות, כנסים, הרצאות, סמינרים וחתונות.', accent: 'var(--marva-sand)' },
  { title: 'סופרמרקטים "הצינור"', body: 'על המדפים בסניפי הרשת.', accent: 'var(--marva-sage)' },
];

function WhereBottlesGo() {
  const { Card } = window.MarvaDesignSystem_1ef21b;
  return (
    <section id="where" style={{ background: 'var(--marva-white)', padding: 'clamp(48px,8vw,96px) clamp(20px,5vw,64px)' }}>
      <h2 style={{ font: 'var(--text-display-l)', fontFamily: 'var(--font-hebrew)', color: 'var(--marva-black)', textAlign: 'center', margin: '0 0 48px' }}>
        לאן הבקבוקים מגיעים?
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, maxWidth: 1080, margin: '0 auto' }}>
        {WHERE_CARDS.map((c, i) => (
          <Card key={i} accent={c.accent}>
            <h3 style={{ font: 'var(--text-display-s)', fontFamily: 'var(--font-hebrew)', color: 'var(--marva-black)', margin: '0 0 10px' }}>{c.title}</h3>
            <p style={{ font: 'var(--text-body-m)', color: '#3A413C', margin: 0 }}>{c.body}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
window.WhereBottlesGo = WhereBottlesGo;
