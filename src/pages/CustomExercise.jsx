import { useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, Camera, SwitchCamera } from 'lucide-react';
import { MUSCLES } from '../data/seedMachines';
import { useCustomExercises } from '../hooks/useCustomExercises';
import { fileToCompressedDataUrl } from '../data/imageUtils';

export default function CustomExercise() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { addCustomExercise } = useCustomExercises();
  const fileInputRef = useRef(null);
  const scannedVideoUrl = params.get('videoUrl') || '';
  const [name, setName] = useState('');
  const [muscle, setMuscle] = useState(params.get('muscle') || 'chest');
  const [equipment, setEquipment] = useState('free_weight');
  const [videoUrl, setVideoUrl] = useState(scannedVideoUrl);
  const [photoPreview, setPhotoPreview] = useState('');
  const [photoProcessing, setPhotoProcessing] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoProcessing(true);
    try {
      const dataUrl = await fileToCompressedDataUrl(file);
      setPhotoPreview(dataUrl);
    } catch {
      // تجاهل — تصوير اختياري، ما نوقف المستخدم
    } finally {
      setPhotoProcessing(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || saving) return;
    setSaving(true);
    const entry = await addCustomExercise({
      name: name.trim(),
      muscle,
      equipment,
      videoUrl: videoUrl.trim(),
      imageDataUrl: photoPreview,
    });
    navigate(`/log/${entry.id}`);
  }

  return (
    <div className="screen fade-up">
      <button className="back-link" onClick={() => navigate(-1)}>
        <ArrowRight size={16} /> رجوع
      </button>
      <p className="eyebrow">أضف تمرينك أو جهازك الخاص</p>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '-6px 0 16px' }}>
        يتحفظ بحسابك ويطلع لك بكل مكان — بحث، اختيار عضلة، خطتك
      </p>

      {scannedVideoUrl && (
        <div className="card" style={{ marginBottom: 16, background: 'var(--iron-tint)', border: 'none' }}>
          <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>
            لقينا فيديو بكود الـ QR اللي مسحته — كمّل بيانات الجهاز واحفظه، والفيديو بيتربط فيه تلقائي
          </p>
        </div>
      )}

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
            style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 'var(--radius)', border: '1px solid var(--line)' }}
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
        <button type="button" className="btn-camera" style={{ marginBottom: 16 }} onClick={() => fileInputRef.current?.click()} disabled={photoProcessing}>
          <Camera size={30} />
          {photoProcessing ? 'يعالج الصورة...' : 'صوّر جهازك بالجم (اختياري)'}
        </button>
      )}

      <form onSubmit={handleSubmit} className="card">
        <div className="field">
          <label>اسم التمرين</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="مثلاً: دمبل منزلي، جهاز الجيم بتاعي" required />
        </div>

        <div className="field">
          <label>العضلة المستهدفة</label>
          <select value={muscle} onChange={(e) => setMuscle(e.target.value)}>
            {MUSCLES.map((m) => (
              <option key={m.id} value={m.id}>{m.label}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>النوع</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <div className={`activity-chip ${equipment === 'free_weight' ? 'selected' : ''}`} onClick={() => setEquipment('free_weight')}>
              وزن حر
            </div>
            <div className={`activity-chip ${equipment === 'machine' ? 'selected' : ''}`} onClick={() => setEquipment('machine')}>
              جهاز
            </div>
          </div>
        </div>

        <div className="field" style={{ marginBottom: 0 }}>
          <label>رابط فيديو يوتيوب (اختياري)</label>
          <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..." />
        </div>

        <button type="submit" className="btn btn-primary" style={{ marginTop: 16 }} disabled={saving}>
          {saving ? 'يحفظ...' : 'حفظ وابدأ'}
        </button>
      </form>
    </div>
  );
}
