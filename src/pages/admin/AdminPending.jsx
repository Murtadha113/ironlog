import { useEffect, useState } from 'react';
import { fetchPendingMachines, updatePendingStatus } from '../../data/machinesRepo';
import { MUSCLES } from '../../data/seedMachines';

export default function AdminPending() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function reload() {
    setLoading(true);
    setItems(await fetchPendingMachines());
    setLoading(false);
  }

  useEffect(() => { reload(); }, []);

  async function handleStatus(id, status) {
    await updatePendingStatus(id, status);
    reload();
  }

  return (
    <div className="card">
      <p style={{ fontWeight: 600, marginBottom: 12 }}>طلبات إضافة أجهزة ({items.length})</p>
      {loading && <p style={{ color: 'var(--text-muted)' }}>يحمّل...</p>}
      {!loading && items.length === 0 && (
        <p style={{ color: 'var(--text-muted)' }}>ما فيه طلبات حالياً.</p>
      )}
      <table className="admin-table">
        <thead>
          <tr>
            <th>الصورة</th>
            <th>العضلة</th>
            <th>الشركة</th>
            <th>الوصف</th>
            <th>الحالة</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.id}>
              <td>
                {it.photo_url ? (
                  <a href={it.photo_url} target="_blank" rel="noreferrer">
                    <img src={it.photo_url} alt="صورة الجهاز" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8 }} />
                  </a>
                ) : (
                  <span style={{ color: 'var(--text-muted)' }}>—</span>
                )}
              </td>
              <td>{MUSCLES.find((m) => m.id === it.muscle)?.label || it.muscle}</td>
              <td>{it.company || '—'}</td>
              <td style={{ maxWidth: 260 }}>{it.description}</td>
              <td>
                <span className={`badge ${it.status === 'approved' ? 'badge-plate' : it.status === 'rejected' ? 'badge-danger' : 'badge-iron'}`}>
                  {it.status === 'approved' ? 'مقبول' : it.status === 'rejected' ? 'مرفوض' : 'قيد المراجعة'}
                </span>
              </td>
              <td style={{ display: 'flex', gap: 6 }}>
                <button className="btn" style={{ padding: '6px 10px', fontSize: 12 }} onClick={() => handleStatus(it.id, 'approved')}>قبول</button>
                <button className="btn" style={{ padding: '6px 10px', fontSize: 12, color: 'var(--danger)' }} onClick={() => handleStatus(it.id, 'rejected')}>رفض</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
