import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, LogOut, Trash2, Plus, X, Camera } from 'lucide-react';
import { MUSCLES } from '../data/seedMachines';
import { useLogs } from '../hooks/useLogs';
import { useAuth } from '../hooks/useAuth';
import { uploadLogPhoto } from '../data/userLogsRepo';

export default function Notebook() {
  const navigate = useNavigate();
  const { logs, authed, addLog, deleteLog } = useLogs();
  const { user, logout } = useAuth();
  const fileInputRef = useRef(null);
  const [quickOpen, setQuickOpen] = useState(false);
  const [name, setName] = useState('');
  const [muscle, setMuscle] = useState('chest');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('3');
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [quickError, setQuickError] = useState('');

  async function handleLogout() {
    await logout();
    navigate('/welcome');
  }

  async function handleDelete(id) {
    if (!confirm('تحذف هذي الجلسة؟')) return;
    await deleteLog(id);
  }

  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  function resetQuickForm() {
    setName('');
    setWeight('');
    setReps('');
    setPhotoFile(null);
    setPhotoPreview('');
    setQuickOpen(false);
  }

  async function handleQuickAdd(e) {
    e.preventDefault();
    if (!name.trim() || !weight || !reps) return;
    setSaving(true);
    setQuickError('');
    try {
      let photo_url = '';
      if (photoFile) {
        photo_url = await uploadLogPhoto(photoFile);
      }
      await addLog({
        machineId: `quick_${Date.now()}`,
        machineName: name.trim(),
        positionId: 'quick',
        positionName: '',
        muscle,
        weight: Number(weight),
        reps: Number(reps),
        sets: Number(sets) || 1,
        photo_url,
      });
      resetQuickForm();
    } catch (err) {
      setQuickError('تعذر الحفظ — جرب بدون صورة أو تأكد من الاتصال');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="screen fade-up">
      <button className="back-link" onClick={() => navigate(-1)}>
        <ArrowRight size={16} /> رجوع
      </button>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <p className="eyebrow" style={{ margin: 0 }}>دفترك</p>
        <button className="btn btn-ghost" style={{ fontSize: 12, color: 'var(--iron)' }} onClick={() => (quickOpen ? resetQuickForm() : setQuickOpen(true))}>
          {quickOpen ? <X size={16} /> : <Plus size={16} />}
          {quickOpen ? 'إلغاء' : 'إضافة سريعة'}
        </button>
      </div>

      {quickOpen && (
        <form onSubmit={handleQuickAdd} className="card" style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '0 0 12px' }}>
            سجّل أي تمرين بوزنك — مو شرط يكون من قائمة الأجهزة
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handlePhotoChange}
            style={{ display: 'none' }}
          />
          {photoPreview ? (
            <div style={{ marginBottom: 14, position: 'relative' }}>
              <img
                src={photoPreview}
                alt=""
                style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--line)' }}
              />
              <button
                type="button"
                className="btn"
                style={{ position: 'absolute', bottom: 8, left: 8, fontSize: 11, padding: '6px 10px' }}
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera size={13} /> غيّر الصورة
              </button>
            </div>
          ) : (
            <button type="button" className="btn" style={{ width: '100%', marginBottom: 14, color: 'var(--text-muted)' }} onClick={() => fileInputRef.current?.click()}>
              <Camera size={16} /> أضف صورة (اختياري)
            </button>
          )}

          <div className="field">
            <label>اسم التمرين</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="مثلاً: ضغط دمبل بالبيت" required />
          </div>
          <div className="field">
            <label>العضلة</label>
            <select value={muscle} onChange={(e) => setMuscle(e.target.value)}>
              {MUSCLES.map((m) => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div className="field" style={{ flex: 1 }}>
              <label>الوزن (كغ)</label>
              <input type="number" inputMode="decimal" step="0.5" value={weight} onChange={(e) => setWeight(e.target.value)} required />
            </div>
            <div className="field" style={{ flex: 1 }}>
              <label>التكرارات</label>
              <input type="number" inputMode="numeric" value={reps} onChange={(e) => setReps(e.target.value)} required />
            </div>
            <div className="field" style={{ flex: 1 }}>
              <label>المجموعات</label>
              <input type="number" inputMode="numeric" value={sets} onChange={(e) => setSets(e.target.value)} />
            </div>
          </div>
          {quickError && <p style={{ color: 'var(--danger)', fontSize: 13, marginBottom: 10 }}>{quickError}</p>}
          <button type="submit" className="btn btn-primary" disabled={saving} style={{ marginTop: 4 }}>
            {saving ? 'يحفظ...' : 'حفظ الجلسة'}
          </button>
        </form>
      )}

      {!authed && logs.length >= 3 && (
        <div className="card" style={{ marginBottom: 16, background: 'var(--iron-tint)', border: 'none' }}>
          <p style={{ fontSize: 13, fontWeight: 600, margin: '0 0 8px' }}>
            عندك {logs.length} تمارين مسجلة — تبي تحفظها بشكل دائم؟
          </p>
          <button className="btn" style={{ fontSize: 12, padding: '8px 12px' }} onClick={() => navigate('/register')}>
            أنشئ حساب واحفظ سجلك
          </button>
        </div>
      )}

      {authed && (
        <div
          className="card"
          style={{
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '0 0 2px' }}>سجلك محفوظ بالسحابة</p>
            <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>{user?.email}</p>
          </div>
          <button className="btn btn-ghost" style={{ fontSize: 12 }} onClick={handleLogout}>
            <LogOut size={14} /> خروج
          </button>
        </div>
      )}

      {logs.length === 0 && (
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>ما فيه تمارين مسجلة بعد.</p>
      )}

      <div className="card">
        {logs.map((l) => (
          <div key={l.id} className="list-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {l.photo_url && (
                <img src={l.photo_url} alt="" style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
              )}
              <div>
                <p style={{ margin: 0, fontWeight: 600 }}>{l.machineName}</p>
                <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)' }}>
                  {MUSCLES.find((m) => m.id === l.muscle)?.label} · {l.positionName} ·{' '}
                  {new Date(l.date).toLocaleDateString('ar')}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="num">{l.weight}كغ × {l.reps}</span>
              <button
                className="btn btn-ghost"
                style={{ padding: 6, color: 'var(--danger)' }}
                onClick={() => handleDelete(l.id)}
                aria-label="حذف"
              >
                <Trash2 size={17} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
