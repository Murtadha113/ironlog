import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Camera, SwitchCamera, CheckCircle2 } from 'lucide-react';
import { MUSCLES } from '../data/seedMachines';
import { submitPendingMachine, uploadMachinePhoto } from '../data/machinesRepo';

export default function AddMachineRequest() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [muscle, setMuscle] = useState('chest');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      let photo_url = '';
      if (photoFile) {
        photo_url = await uploadMachinePhoto(photoFile);
      }
      await submitPendingMachine({ muscle, company, description, photo_url });
      setSent(true);
    } catch (err) {
      setError('تعذر إرسال الطلب — تأكد من ربط Firebase Storage/Firestore');
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="screen" style={{ textAlign: 'center', paddingTop: 60 }}>
        <CheckCircle2 size={40} style={{ color: 'var(--plate)' }} />
        <p style={{ fontWeight: 700, margin: '16px 0 4px' }}>تم إرسال الطلب</p>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>بنراجعه ونضيف الجهاز قريباً</p>
        <button className="btn" style={{ marginTop: 20 }} onClick={() => navigate('/')}>
          رجوع للرئيسية
        </button>
      </div>
    );
  }

  return (
    <div className="screen fade-up">
      <button className="back-link" onClick={() => navigate(-1)}>
        <ArrowRight size={16} /> رجوع
      </button>
      <p className="eyebrow">جهازك مو موجود؟ صوّره وعرّفنا عليه</p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handlePhotoChange}
        style={{ display: 'none' }}
      />

      {photoPreview ? (
        <div style={{ marginBottom: 16, position: 'relative' }}>
          <img
            src={photoPreview}
            alt="صورة الجهاز"
            style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 'var(--radius)', border: '1px solid var(--line)' }}
          />
          <button
            type="button"
            className="btn"
            style={{ position: 'absolute', bottom: 10, left: 10, fontSize: 12, padding: '8px 12px' }}
            onClick={() => fileInputRef.current?.click()}
          >
            <SwitchCamera size={14} /> صوّر مرة ثانية
          </button>
        </div>
      ) : (
        <button type="button" className="btn-camera" style={{ marginBottom: 16 }} onClick={() => fileInputRef.current?.click()}>
          <Camera size={30} />
          صوّر الجهاز بالكاميرا
        </button>
      )}

      <form onSubmit={handleSubmit} className="card">
        <div className="field">
          <label>العضلة المستهدفة</label>
          <select value={muscle} onChange={(e) => setMuscle(e.target.value)}>
            {MUSCLES.map((m) => (
              <option key={m.id} value={m.id}>{m.label}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>شركة الصنع (لو تعرفها)</label>
          <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Technogym, Life Fitness..." />
        </div>
        <div className="field">
          <label>ملاحظات إضافية (اختياري)</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="أي تفاصيل تساعدنا نتعرف على الجهاز"
          />
        </div>
        {error && <p style={{ color: 'var(--danger)', fontSize: 13 }}>{error}</p>}
        <button type="submit" className="btn btn-primary" disabled={sending}>
          {sending ? 'يرسل...' : 'إرسال الطلب'}
        </button>
      </form>
    </div>
  );
}
