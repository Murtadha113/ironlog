import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, Dumbbell, HelpCircle, Plus, Search } from 'lucide-react';
import { fetchMachines } from '../data/machinesRepo';
import { MUSCLES } from '../data/seedMachines';

export default function MachineSelect() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const muscle = params.get('muscle');
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchMachines().then((all) => {
      setMachines(muscle ? all.filter((m) => m.muscle === muscle) : all);
      setLoading(false);
    });
  }, [muscle]);

  const muscleLabel = MUSCLES.find((m) => m.id === muscle)?.label;
  const trimmedQuery = query.trim().toLowerCase();
  const visibleMachines = trimmedQuery
    ? machines.filter((m) => m.name_ar.toLowerCase().includes(trimmedQuery) || m.name.toLowerCase().includes(trimmedQuery))
    : machines;

  return (
    <div className="screen fade-up">
      <button className="back-link" onClick={() => navigate(-1)}>
        <ArrowRight size={16} /> رجوع
      </button>
      <p className="eyebrow">اختر جهازك{muscleLabel ? ` — ${muscleLabel}` : ''}</p>

      <div className="field" style={{ position: 'relative', marginBottom: 16 }}>
        <Search
          size={16}
          style={{ position: 'absolute', insetInlineStart: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}
        />
        <input
          style={{ paddingInlineStart: 36 }}
          placeholder="دوّر بين الأجهزة..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading && <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>يحمّل الأجهزة...</p>}

      {!loading && visibleMachines.length === 0 && (
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
          {trimmedQuery ? 'ما لقينا جهاز بهذا الاسم' : 'ما فيه أجهزة مسجلة لهذي العضلة بعد.'}
        </p>
      )}

      <div className="chip-grid stagger-in">
        {visibleMachines.map((m) => (
          <div
            key={m.id}
            className="chip"
            style={{ textAlign: 'center', position: 'relative' }}
            onClick={() => navigate(`/log/${m.id}`)}
          >
            {m.custom ? (
              <span className="badge badge-plate" style={{ position: 'absolute', top: 8, insetInlineStart: 8 }}>خاصك</span>
            ) : m.equipment === 'free_weight' ? (
              <span className="badge badge-iron" style={{ position: 'absolute', top: 8, insetInlineStart: 8 }}>حر</span>
            ) : null}
            {m.image_url ? (
              <img src={m.image_url} alt={m.name_ar} loading="lazy" />
            ) : (
              <Dumbbell size={24} style={{ display: 'block', margin: '0 auto 6px' }} />
            )}
            {m.name_ar}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
        <button
          className="btn"
          style={{ flex: 1, color: 'var(--text-muted)' }}
          onClick={() => navigate('/add-machine')}
        >
          <HelpCircle size={16} /> جهازي مو موجود
        </button>
        <button
          className="btn"
          style={{ flex: 1, color: 'var(--iron)' }}
          onClick={() => navigate(`/custom-exercise${muscle ? `?muscle=${muscle}` : ''}`)}
        >
          <Plus size={16} /> أضف تمرينك الخاص
        </button>
      </div>
    </div>
  );
}
