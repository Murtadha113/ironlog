export default function Logo({ size = 36, glow = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={glow ? { filter: 'drop-shadow(0 0 18px rgba(228,255,61,0.55))' } : undefined}
    >
      <rect width="64" height="64" rx="16" fill="#111110" />
      <g fill="url(#ironlog-g)">
        <rect x="6" y="24" width="6" height="16" rx="2" />
        <rect x="14" y="19" width="5" height="26" rx="2" />
        <rect x="19" y="30" width="26" height="4" rx="2" />
        <rect x="45" y="19" width="5" height="26" rx="2" />
        <rect x="52" y="24" width="6" height="16" rx="2" />
      </g>
      <defs>
        <linearGradient id="ironlog-g" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E4FF3D" />
          <stop offset="1" stopColor="#B8D400" />
        </linearGradient>
      </defs>
    </svg>
  );
}
