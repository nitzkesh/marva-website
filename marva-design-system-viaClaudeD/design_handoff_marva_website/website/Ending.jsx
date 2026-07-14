// Ending.jsx — footer: logo, Instagram link, phone/email placeholders.
function Ending() {
  return (
    <footer style={{ background: 'var(--color-bg-page)', padding: 'clamp(40px,6vw,72px) clamp(20px,5vw,64px)', borderTop: '1px solid var(--color-border-default)' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="../../assets/logos/marva-mark.png" alt="" style={{ height: 34, width: 34, objectFit: 'contain' }} />
          <span style={{ font: '700 1.2rem var(--font-hebrew)', color: 'var(--marva-black)' }}>מרווה</span>
        </div>

        <div style={{ textAlign: 'center', font: 'var(--text-body-m)', color: 'var(--marva-black)' }}>
          <div style={{ marginBottom: 6 }}>לשאלות נוספות, דברו איתנו:</div>
          <div style={{ display: 'flex', gap: 18, justifyContent: 'center', color: 'var(--color-text-muted)' }}>
            <span>טלפון: 000-0000000</span>
            <span>·</span>
            <span>info@marva.co.il</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <a href="#" aria-label="Instagram" style={{ display: 'inline-flex' }}>
            <img src="https://unpkg.com/lucide-static@0.469.0/icons/instagram.svg" alt="Instagram" style={{ width: 26, height: 26 }} />
          </a>
          {/* placeholders for future social platforms */}
          <span style={{ width: 26, height: 26, borderRadius: '50%', border: '1px dashed var(--color-border-default)', display: 'inline-block' }} />
          <span style={{ width: 26, height: 26, borderRadius: '50%', border: '1px dashed var(--color-border-default)', display: 'inline-block' }} />
        </div>
      </div>
    </footer>
  );
}
window.Ending = Ending;
