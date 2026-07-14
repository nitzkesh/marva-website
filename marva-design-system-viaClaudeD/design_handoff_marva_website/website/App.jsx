// App.jsx
function App() {
  const [panel, setPanel] = React.useState('advertise');

  const route = (key) => {
    setPanel(key);
    const el = document.getElementById('forms');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 20, behavior: 'smooth' });
  };

  return (
    <div style={{ fontFamily: 'var(--font-body)', background: 'var(--color-bg-page)' }}>
      <window.Header onAdvertise={() => route('advertise')} />
      <window.Hero onAdvertise={() => route('advertise')} />
      <window.WhoAreWe />
      <window.WhereBottlesGo />
      <window.HowItWorks />
      <window.ThreeButtons onRoute={route} />
      <window.Placeholders />
      <window.Forms panel={panel} setPanel={setPanel} />
      <window.Ending />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
