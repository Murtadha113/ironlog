import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { MUSCLES } from '../data/seedMachines';
import { addCustomExercise } from '../data/customExercises';

export default function CustomExercise() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [name, setName] = useState('');
  const [muscle, setMuscle] = useState(params.get('muscle') || 'chest');
  const [equipment, setEquipment] = useState('free_weight');
  const [videoUrl, setVideoUrl] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    const entry = addCustomExercise({ name: name.trim(), muscle, equipment, videoUrl: videoUrl.trim() });
    navigate(`/log/${entry.id}`);
  }

  return (
    <div className="screen fade-up">
      <button className="back-link" onClick={() => navigate(-1)}>
        <ArrowRight size={16} /> رجوع
      </button>
      <p className="eyebrow">أضف تمرينك أو جهازك الخاص</p>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '-6px 0 16px' }}>
        يتحفظ بجهازك ويطلع لك بكل مكان — بحث، اختيار عضلة، خطتك
      </p>

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

        <button type="submit" className="btn btn-primary" style={{ marginTop: 16 }}>حفظ وابدأ</button>
      </form>
    </div>
  );
}
