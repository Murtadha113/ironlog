import { useEffect, useState } from 'react';
import { Trash2, Plus } from 'lucide-react';
import { fetchMachines, addMachine, updateMachine, deleteMachine } from '../../data/machinesRepo';
import { MUSCLES } from '../../data/seedMachines';
import MachineQr from './MachineQr';

const emptyPosition = () => ({ id: `p${Date.now()}`, name_ar: '', video_url: '' });

const emptyForm = {
  name: '',
  name_ar: '',
  muscle: 'chest',
  image_url: '',
  positions: [emptyPosition()],
};

export default function AdminMachines() {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState('');

  async function reload() {
    setLoading(true);
    const list = await fetchMachines();
    setMachines(list);
    setLoading(false);
  }

  useEffect(() => { reload(); }, []);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 2200);
  }

  function updatePosition(index, patch) {
    setForm((f) => ({
      ...f,
      positions: f.positions.map((p, i) => (i === index ? { ...p, ...patch } : p)),
    }));
  }

  function addPositionRow() {
    setForm((f) => ({ ...f, positions: [...f.positions, emptyPosition()] }));
  }

  function removePositionRow(index) {
    setForm((f) => ({ ...f, positions: f.positions.filter((_, i) => i !== index) }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      name: form.name,
      name_ar: form.name_ar,
      muscle: form.muscle,
      image_url: form.image_url,
      positions: form.positions
        .filter((p) => p.name_ar.trim())
        .map((p, i) => ({ id: p.id || `p${i}`, name_ar: p.name_ar, video_url: p.video_url })),
    };
    try {
      if (editingId) {
        await updateMachine(editingId, payload);
        showToast('تم تحديث الجهاز');
      } else {
        await addMachine(payload);
        showToast('تم إضافة الجهاز');
      }
      setForm(emptyForm);
      setEditingId(null);
      reload();
    } catch (err) {
      showToast('تعذر الحفظ — تأكد من ربط Firebase');
    }
  }

  function startEdit(m) {
    setEditingId(m.id);
    setForm({
      name: m.name || '',
      name_ar: m.name_ar || '',
      muscle: m.muscle || 'chest',
      image_url: m.image_url || '',
      positions: m.positions?.length ? m.positions : [emptyPosition()],
    });
  }

  async function handleDelete(id) {
    if (!confirm('تحذف هذا الجهاز؟')) return;
    await deleteMachine(id);
    showToast('تم الحذف');
    reload();
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'start' }}>
      <div className="card">
        <p style={{ fontWeight: 600, marginBottom: 12 }}>الأجهزة ({machines.length})</p>
        {loading ? (
          <p style={{ color: 'var(--text-muted)' }}>يحمّل...</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>الصورة</th>
                <th>الاسم</th>
                <th>العضلة</th>
                <th>الوضعيات</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {machines.map((m) => (
                <tr key={m.id}>
                  <td>
                    {m.image_url ? (
                      <img src={m.image_url} alt={m.name_ar} style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 8 }} />
                    ) : (
                      <span style={{ color: 'var(--text-muted)' }}>—</span>
                    )}
                  </td>
                  <td>{m.name_ar} <span style={{ color: 'var(--text-muted)' }}>({m.name})</span></td>
                  <td>{MUSCLES.find((mu) => mu.id === m.muscle)?.label}</td>
                  <td>{m.positions?.length || 0}</td>
                  <td style={{ display: 'flex', gap: 6 }}>
                    <MachineQr machineId={m.id} name={m.name_ar} />
                    <button className="btn" style={{ padding: '6px 10px', fontSize: 12 }} onClick={() => startEdit(m)}>تعديل</button>
                    <button className="btn" style={{ padding: '6px 10px', fontSize: 12, color: 'var(--danger)' }} onClick={() => handleDelete(m.id)}>حذف</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <form onSubmit={handleSubmit} className="card">
        <p style={{ fontWeight: 600, marginBottom: 12 }}>{editingId ? 'تعديل جهاز' : 'إضافة جهاز جديد'}</p>
        <div className="field">
          <label>الاسم بالإنجليزي</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div className="field">
          <label>الاسم بالعربي</label>
          <input value={form.name_ar} onChange={(e) => setForm({ ...form, name_ar: e.target.value })} required />
        </div>
        <div className="field">
          <label>العضلة</label>
          <select value={form.muscle} onChange={(e) => setForm({ ...form, muscle: e.target.value })}>
            {MUSCLES.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
          </select>
        </div>
        <div className="field">
          <label>رابط صورة الجهاز</label>
          <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." />
        </div>

        <p style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, margin: '4px 0 8px' }}>الوضعيات</p>
        {form.positions.map((p, i) => (
          <div key={p.id || i} style={{ border: '1px solid var(--line-soft)', borderRadius: 'var(--radius-sm)', padding: 10, marginBottom: 10 }}>
            <div className="field" style={{ marginBottom: 8 }}>
              <input
                value={p.name_ar}
                onChange={(e) => updatePosition(i, { name_ar: e.target.value })}
                placeholder="اسم الوضعية (مثلاً: مسطح)"
              />
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <input
                style={{ flex: 1, border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)', padding: 10, fontSize: 13, background: 'var(--surface-sunken)', color: 'var(--text)' }}
                value={p.video_url}
                onChange={(e) => updatePosition(i, { video_url: e.target.value })}
                placeholder="رابط فيديو يوتيوب"
              />
              {form.positions.length > 1 && (
                <button type="button" className="btn" style={{ padding: '8px 10px', color: 'var(--danger)' }} onClick={() => removePositionRow(i)}>
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
        <button type="button" className="btn" style={{ width: '100%', marginBottom: 14, fontSize: 12 }} onClick={addPositionRow}>
          <Plus size={14} /> إضافة وضعية
        </button>

        <div style={{ display: 'flex', gap: 8 }}>
          <button type="submit" className="btn btn-primary">{editingId ? 'حفظ التعديل' : 'إضافة'}</button>
          {editingId && (
            <button type="button" className="btn" onClick={() => { setEditingId(null); setForm(emptyForm); }}>إلغاء</button>
          )}
        </div>
      </form>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
