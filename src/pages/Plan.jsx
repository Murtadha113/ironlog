import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Plus, Trash2, X } from 'lucide-react';
import { PLANS } from '../data/plans';
import { MUSCLES } from '../data/seedMachines';
import { fetchMachines } from '../data/machinesRepo';
import { getSelectedPlanId, setSelectedPlan, clearPlan } from '../data/planRepo';
import { getCustomPlans, saveCustomPlan, deleteCustomPlan } from '../data/customPlans';
import { useCustomExercises } from '../hooks/useCustomExercises';

const emptyDay = (n) => ({ label: `يوم ${n}`, muscles: [], exercises: [] });

const EQUIPMENT_FILTERS = [
  { id: 'all', label: 'الكل' },
  { id: 'machine', label: 'جهاز' },
  { id: 'free_weight', label: 'حر' },
];

function ExercisePicker({ machines, dayMuscles, onAdd, onAddCustom }) {
  const [q, setQ] = useState('');
  const [equipmentFilter, setEquipmentFilter] = useState('all');
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customName, setCustomName] = useState('');
  const query = q.trim().toLowerCase();

  const pool = dayMuscles.length ? machines.filter((m) => dayMuscles.includes(m.muscle)) : machines;
  const filtered = pool.filter((m) => {
    if (equipmentFilter !== 'all' && (m.equipment || 'machine') !== equipmentFilter) return false;
    if (query) return m.name_ar.toLowerCase().includes(query) || m.name.toLowerCase().includes(query);
    return true;
  });

  function submitCustom() {
    if (!customName.trim()) return;
    onAddCustom(customName.trim());
    setCustomName('');
    setShowCustomForm(false);
  }

  return (
    <div style={{ marginTop: 12 }}>
      {dayMuscles.length === 0 ? (
        <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>اختر عضلة فوق الأول، عشان نطلعلك تمارينها</p>
      ) : (
        <>
          <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
            {EQUIPMENT_FILTERS.map((f) => (
              <span
                key={f.id}
                className="plan-day-chip"
                style={{
                  cursor: 'pointer',
                  background: equipmentFilter === f.id ? 'var(--iron)' : 'var(--surface-sunken)',
                  color: equipmentFilter === f.id ? 'var(--iron-ink)' : 'var(--text-muted)',
                }}
                onClick={() => setEquipmentFilter(f.id)}
              >
                {f.label}
              </span>
            ))}
          </div>
          <input placeholder="دوّر بين تمارين هذي العضلة..." value={q} onChange={(e) => setQ(e.target.value)} style={{ marginBottom: 8 }} />
          <div style={{ maxHeight: 220, overflowY: 'auto', border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)' }}>
            {filtered.length === 0 ? (
              <p style={{ fontSize: 12, color: 'var(--text-muted)', padding: 12, margin: 0 }}>ما فيه نتائج</p>
            ) : (
              filtered.slice(0, 30).map((m) => (
                <div key={m.id} className="list-row" style={{ cursor: 'pointer' }} onClick={() => onAdd(m)}>
                  <span>{m.name_ar}</span>
                  <Plus size={14} />
                </div>
              ))
            )}
          </div>
        </>
      )}

      {showCustomForm ? (
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          <input
            placeholder="اسم جهازك الخاص"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            style={{ flex: 1 }}
          />
          <button type="button" className="btn" onClick={submitCustom}>إضافة</button>
        </div>
      ) : (
        <button
          type="button"
          className="btn btn-ghost"
          style={{ fontSize: 12, color: 'var(--iron)', marginTop: 10, padding: '6px 0' }}
          onClick={() => setShowCustomForm(true)}
        >
          <Plus size={14} /> جهازك الخاص مو موجود؟ ضيفه
        </button>
      )}
    </div>
  );
}

export default function Plan() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(getSelectedPlanId());
  const [customPlans, setCustomPlans] = useState(getCustomPlans());
  const [building, setBuilding] = useState(false);
  const [planName, setPlanName] = useState('');
  const [days, setDays] = useState([emptyDay(1)]);
  const [machines, setMachines] = useState([]);
  const { addCustomExercise } = useCustomExercises();

  useEffect(() => {
    fetchMachines().then(setMachines);
  }, []);

  function choose(planId) {
    setSelectedPlan(planId);
    setSelected(planId);
  }

  function remove() {
    clearPlan();
    setSelected(null);
  }

  function removeCustomPlan(id, e) {
    e.stopPropagation();
    if (!confirm('تحذف هذي الخطة؟')) return;
    setCustomPlans(deleteCustomPlan(id));
    if (selected === id) remove();
  }

  function startBuilding() {
    setPlanName('');
    setDays([emptyDay(1)]);
    setBuilding(true);
  }

  function addDay() {
    setDays((d) => [...d, emptyDay(d.length + 1)]);
  }

  function removeDay(index) {
    setDays((d) => d.filter((_, i) => i !== index));
  }

  function updateDayLabel(index, label) {
    setDays((d) => d.map((day, i) => (i === index ? { ...day, label } : day)));
  }

  function toggleDayMuscle(index, muscleId) {
    setDays((d) =>
      d.map((day, i) => {
        if (i !== index) return day;
        const has = day.muscles.includes(muscleId);
        return { ...day, muscles: has ? day.muscles.filter((m) => m !== muscleId) : [...day.muscles, muscleId] };
      })
    );
  }

  function addExercise(index, machine) {
    setDays((d) =>
      d.map((day, i) => {
        if (i !== index) return day;
        if (day.exercises.some((e) => e.machineId === machine.id)) return day;
        const muscles = day.muscles.includes(machine.muscle) ? day.muscles : [...day.muscles, machine.muscle];
        return {
          ...day,
          muscles,
          exercises: [...day.exercises, { machineId: machine.id, machineName: machine.name_ar, weight: '' }],
        };
      })
    );
  }

  async function addCustomExerciseToDay(index, name) {
    const day = days[index];
    const muscle = day.muscles[0] || 'chest';
    const entry = await addCustomExercise({ name, muscle, equipment: 'machine', videoUrl: '' });
    setMachines((m) => [entry, ...m]);
    addExercise(index, entry);
  }

  function removeExercise(index, exIndex) {
    setDays((d) =>
      d.map((day, i) => (i === index ? { ...day, exercises: day.exercises.filter((_, j) => j !== exIndex) } : day))
    );
  }

  function updateExerciseWeight(index, exIndex, weight) {
    setDays((d) =>
      d.map((day, i) =>
        i === index ? { ...day, exercises: day.exercises.map((e, j) => (j === exIndex ? { ...e, weight } : e)) } : day
      )
    );
  }

  function saveBuilder(e) {
    e.preventDefault();
    const cleanDays = days.filter((d) => d.muscles.length > 0 || d.exercises.length > 0);
    if (!planName.trim() || cleanDays.length === 0) return;
    const plan = saveCustomPlan({ name: planName.trim(), days: cleanDays });
    setCustomPlans(getCustomPlans());
    choose(plan.id);
    setBuilding(false);
  }

  const allPlans = [...customPlans, ...PLANS];

  if (building) {
    return (
      <div className="screen fade-up">
        <button className="back-link" onClick={() => setBuilding(false)}>
          <ArrowRight size={16} /> رجوع
        </button>
        <p className="eyebrow">أنشئ خطتك الخاصة</p>

        <form onSubmit={saveBuilder} className="card" style={{ marginBottom: 16 }}>
          <div className="field">
            <label>اسم الخطة</label>
            <input value={planName} onChange={(e) => setPlanName(e.target.value)} placeholder="مثلاً: خطتي" required />
          </div>
        </form>

        {days.map((day, i) => (
          <div key={i} className="card" style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
              <input
                style={{ flex: 1, border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)', padding: 10, fontSize: 14, fontWeight: 700, background: 'var(--surface-sunken)', color: 'var(--text)' }}
                value={day.label}
                onChange={(e) => updateDayLabel(i, e.target.value)}
              />
              {days.length > 1 && (
                <button type="button" className="btn btn-ghost" style={{ padding: 8, color: 'var(--danger)' }} onClick={() => removeDay(i)}>
                  <Trash2 size={16} />
                </button>
              )}
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {MUSCLES.map((m) => (
                <span
                  key={m.id}
                  className="plan-day-chip"
                  style={{
                    cursor: 'pointer',
                    background: day.muscles.includes(m.id) ? 'var(--iron)' : 'var(--surface-sunken)',
                    color: day.muscles.includes(m.id) ? 'var(--iron-ink)' : 'var(--text-muted)',
                  }}
                  onClick={() => toggleDayMuscle(i, m.id)}
                >
                  {m.label}
                </span>
              ))}
            </div>

            {day.exercises.length > 0 && (
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {day.exercises.map((ex, ei) => (
                  <div key={ex.machineId} className="list-row">
                    <span style={{ fontSize: 13 }}>{ex.machineName}</span>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <input
                        type="number"
                        inputMode="decimal"
                        step="0.5"
                        placeholder="كغ"
                        value={ex.weight}
                        onChange={(e) => updateExerciseWeight(i, ei, e.target.value)}
                        style={{ width: 64, padding: '6px 8px', fontSize: 13 }}
                      />
                      <button
                        type="button"
                        className="btn btn-ghost"
                        style={{ padding: 4, color: 'var(--danger)' }}
                        onClick={() => removeExercise(i, ei)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <ExercisePicker
              machines={machines}
              dayMuscles={day.muscles}
              onAdd={(m) => addExercise(i, m)}
              onAddCustom={(name) => addCustomExerciseToDay(i, name)}
            />
          </div>
        ))}

        <button type="button" className="btn" style={{ width: '100%', marginBottom: 16 }} onClick={addDay}>
          <Plus size={16} /> أضف يوم
        </button>

        <button type="button" className="btn btn-primary" onClick={saveBuilder}>
          احفظ الخطة
        </button>
      </div>
    );
  }

  return (
    <div className="screen fade-up">
      <button className="back-link" onClick={() => navigate(-1)}>
        <ArrowRight size={16} /> رجوع
      </button>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <p className="eyebrow" style={{ margin: 0 }}>اختار خطة تمرينك</p>
        <button className="btn btn-ghost" style={{ fontSize: 12, color: 'var(--iron)' }} onClick={startBuilding}>
          <Plus size={16} /> خطة جديدة
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {allPlans.map((p) => {
          const active = selected === p.id;
          return (
            <div
              key={p.id}
              className="card"
              style={{ cursor: 'pointer', borderColor: active ? 'var(--iron)' : undefined }}
              onClick={() => choose(p.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <p style={{ fontWeight: 700, fontSize: 15, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                  {p.name}
                  {p.custom && <span className="badge badge-plate">خاصتك</span>}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {active && (
                    <span className="badge badge-iron">
                      <Check size={12} /> مفعّلة
                    </span>
                  )}
                  {p.custom && (
                    <button className="btn btn-ghost" style={{ padding: 4, color: 'var(--danger)' }} onClick={(e) => removeCustomPlan(p.id, e)}>
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>
              {p.desc && <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '0 0 10px' }}>{p.desc}</p>}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {p.days.map((d, i) => (
                  <span key={i} className="plan-day-chip">
                    {d.label}: {d.muscles.map((m) => MUSCLES.find((mu) => mu.id === m)?.label).join('، ')}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <button className="btn btn-ghost" style={{ width: '100%', marginTop: 16, color: 'var(--danger)' }} onClick={remove}>
          إلغاء الخطة
        </button>
      )}
    </div>
  );
}
