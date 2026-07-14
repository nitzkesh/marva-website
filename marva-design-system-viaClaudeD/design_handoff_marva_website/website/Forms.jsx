// Forms.jsx — Section 8. Panel-switching form hub (three panels).
const FIND_SPOTS = [
  { date: 'א׳, 12.7', loc: 'טיילת תל אביב · מול גורדון' },
  { date: 'ג׳, 14.7', loc: 'חוף פרישמן' },
  { date: 'ה׳, 16.7', loc: 'כיכר הבימה' },
  { date: 'ו׳, 17.7', loc: 'שרונה מרקט' },
  { date: 'ש׳, 18.7', loc: 'דיזנגוף סנטר' },
];

function BusinessPanel() {
  const { Input, Button } = window.MarvaDesignSystem_1ef21b;
  const [sent, setSent] = React.useState(false);
  if (sent) return <div style={{ textAlign: 'center', padding: '40px 0', font: 'var(--text-body-l)', color: 'var(--marva-sage-deep)' }}>תודה! נחזור אליכם בקרוב.</div>;
  return (
    <form onSubmit={e => { e.preventDefault(); setSent(true); }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        <Input label="שם העסק" placeholder="לדוגמה: קפה השכונה" />
        <Input label="איש קשר ותפקיד" placeholder="שם מלא · תפקיד" />
        <Input label="טלפון" placeholder="050-1234567" />
        <Input label="מיקום העסק" placeholder="עיר · כתובת" />
        <Input label="כמות בקבוקים משוערת לחודש" placeholder="לדוגמה: 500" style={{ gridColumn: '1 / -1' }} />
      </div>
      <Button variant="primary" size="l" style={{ width: '100%' }}>תחזרו אליי</Button>
    </form>
  );
}

function FindPanel() {
  return (
    <div>
      <p style={{ font: 'var(--text-body-m)', color: 'var(--color-text-muted)', margin: '0 0 18px' }}>
        נקודות החלוקה הקרובות — מתעדכן לפי תאריכים ומיקומים.
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {FIND_SPOTS.map((s, i) => (
          <li key={i} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '14px 4px', borderBottom: '1px solid var(--color-border-default)' }}>
            <span style={{ font: '700 0.95rem var(--font-hebrew)', color: 'var(--marva-sage-deep)', minWidth: 72 }}>{s.date}</span>
            <span style={{ font: 'var(--text-body-m)', color: 'var(--marva-black)' }}>{s.loc}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AdvertisePanel() {
  const { Input, Button } = window.MarvaDesignSystem_1ef21b;
  const [delivery, setDelivery] = React.useState('supply');
  const [saveOpen, setSaveOpen] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  if (sent) return <div style={{ textAlign: 'center', padding: '40px 0', font: 'var(--text-body-l)', color: 'var(--marva-sage-deep)' }}>תודה! קיבלנו את הפנייה ונחזור אליכם בקרוב.</div>;
  return (
    <form onSubmit={e => { e.preventDefault(); setSent(true); }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <Input label="שם העסק" placeholder="לדוגמה: קפה השכונה" />
        <Input label="ח.פ./ע.מ" placeholder="123456789" />
        <Input label="איש קשר" placeholder="שם מלא" />
        <Input label="טלפון" placeholder="050-1234567" />
        <Input label="אימייל" type="email" placeholder="name@company.co.il" />
        <Input label="כמות בקבוקים רצויה" placeholder="לדוגמה: 5,000" />
        <Input label="משך קמפיין" placeholder="לדוגמה: חודש" />
        <Input label="תאריך התחלה רצוי" type="date" />
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ font: 'var(--text-label)', color: 'var(--marva-black)', marginBottom: 8 }}>שיטת חלוקה</div>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', font: 'var(--text-body-m)', color: 'var(--marva-black)' }}>
          <label style={{ display: 'flex', gap: 6, alignItems: 'center', cursor: 'pointer' }}>
            <input type="radio" name="delivery" checked={delivery === 'supply'} onChange={() => setDelivery('supply')} />
            אתם מחלקים בעצמכם
          </label>
          <label style={{ display: 'flex', gap: 6, alignItems: 'center', cursor: 'pointer' }}>
            <input type="radio" name="delivery" checked={delivery === 'distribute'} onChange={() => setDelivery('distribute')} />
            אנחנו מחלקים את הבקבוקים עבורכם
          </label>
        </div>
        {delivery === 'distribute' && (
          <div style={{ marginTop: 14 }}>
            <Input label="נקודות חלוקה מועדפות" placeholder="לדוגמה: טיילת ת״א, חוף גורדון" />
          </div>
        )}
      </div>

      {/* Save-on-costs / shared-label feature */}
      <div style={{ marginBottom: 24 }}>
        <button
          type="button"
          onClick={() => setSaveOpen(o => !o)}
          style={{
            padding: '10px 18px', borderRadius: 'var(--radius-pill)', cursor: 'pointer',
            background: saveOpen ? 'var(--marva-sky)' : 'transparent',
            border: '1px solid var(--marva-black)', color: 'var(--marva-black)',
            font: '600 0.9rem var(--font-body)',
          }}
        >
          אני רוצה לחסוך בעלויות
        </button>
        {saveOpen && (
          <div style={{ marginTop: 14, background: 'var(--marva-sky-tint)', borderRadius: 'var(--radius-m)', padding: 16 }}>
            <p style={{ font: 'var(--text-body-m)', color: 'var(--marva-black)', margin: '0 0 12px' }}>
              אפשר לפרסם על חצי תווית יחד עם מישהו אחר ולשלם פחות.
            </p>
            <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start', cursor: 'pointer', font: 'var(--text-body-m)', color: 'var(--marva-black)' }}>
              <input type="checkbox" style={{ marginTop: 4 }} />
              <span>אני רוצה לפרסם יחד עם מישהו אחר (לא תדעו מי המפרסם שחולק איתכם את התווית).</span>
            </label>
          </div>
        )}
      </div>

      <Button variant="primary" size="l" style={{ width: '100%' }}>שליחת פנייה</Button>
    </form>
  );
}

function Forms({ panel, setPanel }) {
  const tabs = [
    { key: 'business', label: 'בקבוקים לעסק שלי' },
    { key: 'find', label: 'איפה תמצאו אותנו?' },
    { key: 'advertise', label: 'אני רוצה לפרסם' },
  ];
  return (
    <section id="forms" style={{ background: 'var(--marva-sand-tint)', padding: 'clamp(48px,8vw,96px) clamp(20px,5vw,64px)' }}>
      <h2 style={{ font: 'var(--text-display-l)', fontFamily: 'var(--font-hebrew)', color: 'var(--marva-black)', textAlign: 'center', margin: '0 0 32px' }}>
        בואו נתחיל
      </h2>
      <div style={{
        background: 'var(--marva-white)', borderRadius: 'var(--radius-l)', boxShadow: 'var(--shadow-card)',
        padding: 'clamp(20px,4vw,40px)', maxWidth: 780, margin: '0 auto',
      }}>
        {/* Panel switcher */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
          {tabs.map(t => (
            <button
              key={t.key}
              type="button"
              onClick={() => setPanel(t.key)}
              style={{
                flex: '1 1 auto', padding: '10px 14px', borderRadius: 'var(--radius-pill)', cursor: 'pointer',
                font: '600 0.9rem var(--font-hebrew)',
                border: panel === t.key ? '1px solid var(--marva-black)' : '1px solid var(--color-border-default)',
                background: panel === t.key ? 'var(--marva-black)' : 'transparent',
                color: panel === t.key ? 'var(--color-text-inverse)' : 'var(--marva-black)',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        {panel === 'business' && <BusinessPanel />}
        {panel === 'find' && <FindPanel />}
        {panel === 'advertise' && <AdvertisePanel />}
      </div>
    </section>
  );
}
window.Forms = Forms;
