import { useEffect, useState } from 'react';

const PRESETS = [60, 90, 120];
const RADIUS = 70;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function RestTimer() {
  const [duration, setDuration] = useState(90);
  const [remaining, setRemaining] = useState(90);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running || remaining <= 0) return;
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [running, remaining]);

  function setPreset(seconds) {
    setDuration(seconds);
    setRemaining(seconds);
    setRunning(true);
  }

  const pct = duration ? remaining / duration : 0;
  const done = remaining <= 0;

  return (
    <div style={{ textAlign: 'center', marginTop: 12 }}>
      <p className="eyebrow" style={{ textAlign: 'center' }}>وقت الراحة</p>
      <div className="timer-ring">
        <svg width="160" height="160" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r={RADIUS} fill="none" stroke="var(--surface-sunken)" strokeWidth="10" />
          <circle
            cx="80"
            cy="80"
            r={RADIUS}
            fill="none"
            stroke={done ? 'var(--plate)' : 'var(--iron)'}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - pct)}
            style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s ease' }}
          />
        </svg>
        <span className="timer-val">{done ? '💪' : remaining}</span>
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16, flexWrap: 'wrap' }}>
        {PRESETS.map((s) => (
          <button
            key={s}
            type="button"
            className="btn"
            style={{ padding: '8px 14px', fontSize: 12, borderColor: duration === s ? 'var(--iron)' : undefined }}
            onClick={() => setPreset(s)}
          >
            {s}ث
          </button>
        ))}
        <button type="button" className="btn btn-ghost" style={{ fontSize: 12 }} onClick={() => setRunning((r) => !r)}>
          {running ? 'إيقاف' : 'استمرار'}
        </button>
      </div>
    </div>
  );
}
