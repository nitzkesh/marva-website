// Header.jsx — simple non-sticky header
function Header({ onAdvertise }) {
  const { Button } = window.MarvaDesignSystem_1ef21b;
  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px clamp(20px, 5vw, 64px)', background: 'var(--marva-white)',
      borderBottom: '1px solid var(--color-border-default)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src="../../assets/logos/marva-mark.png" alt="" style={{ height: 38, width: 38, objectFit: 'contain' }} />
        <span style={{ font: '700 1.3rem var(--font-hebrew)', color: 'var(--marva-black)' }}>מרווה</span>
      </div>
      <nav style={{ display: 'flex', gap: 28, font: 'var(--text-body-m)', color: 'var(--marva-black)' }}>
        <a href="#who" style={{ color: 'inherit', textDecoration: 'none' }}>מי אנחנו</a>
        <a href="#where" style={{ color: 'inherit', textDecoration: 'none' }}>לאן מגיעים</a>
        <a href="#how" style={{ color: 'inherit', textDecoration: 'none' }}>איך זה עובד</a>
      </nav>
      <Button variant="primary" size="m" onClick={onAdvertise}>אני רוצה לפרסם</Button>
    </header>
  );
}
window.Header = Header;
