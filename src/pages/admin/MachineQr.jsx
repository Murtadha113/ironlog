import { useState } from 'react';
import { QrCode } from 'lucide-react';
import QRCode from 'qrcode';

export default function MachineQr({ machineId, name }) {
  const [dataUrl, setDataUrl] = useState('');
  const [open, setOpen] = useState(false);

  async function toggle() {
    if (!dataUrl) {
      const url = await QRCode.toDataURL(`ironlog:${machineId}`, {
        margin: 1,
        width: 260,
        color: { dark: '#0A0E17', light: '#FFFFFF' },
      });
      setDataUrl(url);
    }
    setOpen((o) => !o);
  }

  return (
    <>
      <button type="button" className="btn" style={{ padding: '6px 10px', fontSize: 12 }} onClick={toggle}>
        <QrCode size={14} /> QR
      </button>
      {open && dataUrl && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
          }}
          onClick={() => setOpen(false)}
        >
          <div className="card" style={{ textAlign: 'center', width: 300 }} onClick={(e) => e.stopPropagation()}>
            <p style={{ fontWeight: 700, marginBottom: 10 }}>{name}</p>
            <img src={dataUrl} alt="QR" style={{ width: '100%', borderRadius: 12, background: '#fff', padding: 8 }} />
            <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: '10px 0' }}>
              اطبعه وحطه على الجهاز — المستخدم يمسحه ويوصل لتسجيل الجلسة مباشرة
            </p>
            <a href={dataUrl} download={`ironlog-${machineId}.png`} className="btn btn-primary">
              تحميل QR
            </a>
          </div>
        </div>
      )}
    </>
  );
}
