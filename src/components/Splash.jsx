import Logo from './Logo';

export default function Splash() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
      }}
    >
      <div style={{ animation: 'pulse-glow 1.6s ease-in-out infinite' }}>
        <Logo size={72} glow />
      </div>
      <p style={{ fontWeight: 800, fontSize: 20, margin: 0, letterSpacing: '0.02em' }}>IronLog</p>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>سجّل أوزانك. تابع تقدمك.</p>
    </div>
  );
}
