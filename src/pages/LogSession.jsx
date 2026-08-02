import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Repeat, ArrowRight, PlayCircle, AlertTriangle } from 'lucide-react';
import { fetchMachines } from '../data/machinesRepo';
import { filterByMachine } from '../data/localData';
import { useLogs } from '../hooks/useLogs';
import RestTimer from '../components/RestTimer';
import ProgressChart from '../components/ProgressChart';
import { toEmbedUrl } from '../data/youtube';

const VIDEO_TYPE_LABEL = {
  tutorial: 'شرح الاستخدام',
  mistakes: 'أخطاء شائعة',
  alternative: 'بدائل',
};

export default function LogSession() {
  const { machineId } = useParams();
  const [searchParams] = useSearchParams();
  const requestedPosition = searchParams.get('position');
  const navigate = useNavigate();
  const { logs, addLog } = useLogs();
  const [machine, setMachine] = useState(null);
  const [positionId, setPositionId] = useState(null);
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('3');
  const [selectedOption, setSelectedOption] = useState(null);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);

  useEffect(() => {
    fetchMachines().then((all) => {
      const found = all.find((m) => m.id === machineId);
      setMachine(found);
      if (found?.positions?.length) {
        const match = found.positions.find((p) => p.id === requestedPosition);
        setPositionId((match || found.positions[0]).id);
      }
    });
  }, [machineId, requestedPosition]);

  const history = positionId ? filterByMachine(logs, machineId, positionId) : [];

  if (!machine) {
    return (
      <div className="screen">
        <p style={{ color: 'var(--text-muted)' }}>يحمّل...</p>
      </div>
    );
  }

  const position = machine.positions.find((p) => p.id === positionId);
  const lastEntry = history[0];

  const progressOptions = lastEntry
    ? [
        { key: 'up_weight', label: 'زيادة وزن', weight: Math.round((lastEntry.weight + 2.5) * 2) / 2, reps: Math.max(lastEntry.reps - 2, 1) },
        { key: 'up_reps', label: 'زيادة تكرار', weight: lastEntry.weight, reps: lastEntry.reps + 2 },
        { key: 'same', label: 'نفس الشي', weight: lastEntry.weight, reps: lastEntry.reps },
        { key: 'deload', label: 'تخفيف', weight: Math.max(Math.round((lastEntry.weight - 2.5) * 2) / 2, 0), reps: lastEntry.reps },
      ]
    : null;

  function applyOption(opt) {
    setWeight(String(opt.weight));
    setReps(String(opt.reps));
    setSelectedOption(opt.key);
  }

  function selectPosition(id) {
    setPositionId(id);
    setSelectedOption(null);
    setActiveVideoUrl(null);
  }

  function toggleVideo(url) {
    setActiveVideoUrl((current) => (current === url ? null : url));
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!weight || !reps) return;
    setSaveError('');
    try {
      await addLog({
        machineId: machine.id,
        machineName: machine.name_ar,
        positionId,
        positionName: position?.name_ar,
        muscle: machine.muscle,
        weight: Number(weight),
        reps: Number(reps),
        sets: Number(sets) || 1,
      });
      setSaved(true);
    } catch (err) {
      setSaveError('تعذر حفظ الجلسة — تأكد من ربط Firebase');
    }
  }

  if (saved) {
    return (
      <div className="screen fade-up" style={{ textAlign: 'center', paddingTop: 40 }}>
        <CheckCircle2 size={40} style={{ color: 'var(--plate)' }} />
        <p style={{ fontWeight: 700, margin: '16px 0 4px' }}>تم الحفظ</p>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          {history.length === 0 ? 'أول جلسة مسجلة لك على هذا الجهاز' : 'استمر — التقدم يتراكم'}
        </p>

        <RestTimer />

        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 24 }}>
          <button className="btn" onClick={() => { setSaved(false); setSelectedOption(null); }}>
            <Repeat size={16} /> مجموعة ثانية
          </button>
          <button className="btn" onClick={() => navigate('/')}>
            رجوع للرئيسية
          </button>
        </div>
      </div>
    );
  }

  const videos = [
    position?.video_url ? { type: 'tutorial', title: VIDEO_TYPE_LABEL.tutorial, url: position.video_url } : null,
    ...(position?.extra_videos || []).map((v) => ({ ...v, title: v.title || VIDEO_TYPE_LABEL[v.type] || 'فيديو' })),
  ].filter(Boolean);

  return (
    <div className="screen fade-up">
      <button className="back-link" onClick={() => navigate(-1)}>
        <ArrowRight size={16} /> رجوع
      </button>

      {machine.image_url && (
        <img
          src={machine.image_url}
          alt={machine.name_ar}
          style={{ width: '100%', height: 170, objectFit: 'cover', borderRadius: 'var(--radius)', marginBottom: 12, border: '1px solid var(--line)' }}
        />
      )}

      <p style={{ fontWeight: 700, fontSize: 18, margin: '0 0 12px' }}>{machine.name_ar}</p>

      {machine.positions.length > 1 && (
        <div className="position-pills">
          {machine.positions.map((p) => (
            <div
              key={p.id}
              className={`position-pill ${positionId === p.id ? 'active' : ''}`}
              onClick={() => selectPosition(p.id)}
            >
              {p.name_ar}
            </div>
          ))}
        </div>
      )}

      {machine.target_muscles?.length > 0 && (
        <div className="card" style={{ marginBottom: 16 }}>
          <p className="eyebrow" style={{ marginBottom: 12 }}>العضلات المستهدفة</p>
          {machine.target_muscles.map((tm) => (
            <div key={tm.label} className="muscle-bar-row">
              <div className="label-row">
                <span>{tm.label}</span>
                <span className="num">{tm.pct}%</span>
              </div>
              <div className="muscle-bar-track">
                <div className="muscle-bar-fill" style={{ width: `${tm.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {videos.length > 0 && (
        <div className="video-row">
          {videos.map((v, i) => (
            <button
              key={i}
              type="button"
              className={`btn ${activeVideoUrl === v.url ? 'active' : ''}`}
              style={{ color: 'var(--iron)' }}
              onClick={() => toggleVideo(v.url)}
            >
              {v.type === 'mistakes' ? <AlertTriangle size={16} /> : <PlayCircle size={16} />}
              {v.title}
            </button>
          ))}
        </div>
      )}

      {activeVideoUrl && toEmbedUrl(activeVideoUrl) && (
        <div className="video-embed">
          <iframe
            src={toEmbedUrl(activeVideoUrl)}
            title="شرح الفيديو"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {progressOptions && (
        <div className="card" style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '0 0 10px' }}>
            آخر مرة: {lastEntry.weight}كغ × {lastEntry.reps} — شو تبي تسوي اليوم؟
          </p>
          <div className="progress-options">
            {progressOptions.map((opt) => (
              <div
                key={opt.key}
                className={`progress-option ${selectedOption === opt.key ? 'selected' : ''}`}
                onClick={() => applyOption(opt)}
              >
                <div className="po-val">{opt.weight}كغ × {opt.reps}</div>
                <div className="po-label">{opt.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSave} className="card">
        <div className="field">
          <label>الوزن (كغ)</label>
          <input
            type="number"
            step="0.5"
            inputMode="decimal"
            placeholder="50"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div className="field" style={{ flex: 1 }}>
            <label>التكرارات</label>
            <input
              type="number"
              inputMode="numeric"
              placeholder="10"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              required
            />
          </div>
          <div className="field" style={{ flex: 1 }}>
            <label>المجموعات</label>
            <input
              type="number"
              inputMode="numeric"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
            />
          </div>
        </div>
        {saveError && <p style={{ color: 'var(--danger)', fontSize: 13, marginBottom: 10 }}>{saveError}</p>}
        <button type="submit" className="btn btn-primary">حفظ الجلسة</button>
      </form>

      {history.length >= 2 && (
        <div style={{ marginTop: 18 }}>
          <p className="eyebrow">تقدمك بالوزن</p>
          <div className="card">
            <ProgressChart history={history} />
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div style={{ marginTop: 18 }}>
          <p className="eyebrow">سجلك السابق</p>
          <div className="card">
            {history.slice(0, 5).map((h) => (
              <div key={h.id} className="list-row">
                <span style={{ color: 'var(--text-muted)' }}>
                  {new Date(h.date).toLocaleDateString('ar')}
                </span>
                <span className="num">{h.weight}كغ × {h.reps}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
