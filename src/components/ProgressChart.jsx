const WIDTH = 300;
const HEIGHT = 110;
const PAD_Y = 14;

export default function ProgressChart({ history }) {
  // history متوقعة الأحدث أولاً (زي بقية التطبيق) — نعكسها عشان الرسم من الأقدم للأحدث
  const points = [...history].reverse();
  if (points.length < 2) return null;

  const weights = points.map((p) => p.weight);
  const min = Math.min(...weights);
  const max = Math.max(...weights);
  const range = max - min || 1;

  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * WIDTH;
    const y = HEIGHT - PAD_Y - ((p.weight - min) / range) * (HEIGHT - PAD_Y * 2);
    return { x, y, weight: p.weight };
  });

  const linePath = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ');
  const areaPath = `${linePath} L ${WIDTH} ${HEIGHT} L 0 ${HEIGHT} Z`;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>أقل: {min}كغ</span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>أعلى: {max}كغ</span>
      </div>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} width="100%" height={HEIGHT} preserveAspectRatio="none">
        <defs>
          <linearGradient id="progress-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--iron)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--iron)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#progress-fill)" />
        <path d={linePath} fill="none" stroke="var(--iron)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {coords.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r={i === coords.length - 1 ? 4 : 2.5} fill={i === coords.length - 1 ? 'var(--iron)' : 'var(--text-muted)'} />
        ))}
      </svg>
    </div>
  );
}
