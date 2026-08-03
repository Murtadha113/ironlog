import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, Dumbbell } from 'lucide-react';
import { fetchMachines } from '../data/machinesRepo';
import { MUSCLES } from '../data/seedMachines';
import { getSelectedPlanId, getPlanDayIndex } from '../data/planRepo';
import { getPlan } from '../data/plans';

export default function PlanDay() {
  const navigate = useNavigate();
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    fetchMachines().then(setMachines);
  }, []);

  const planId = getSelectedPlanId();
  const plan = planId ? getPlan(planId) : null;
  const today = plan ? plan.days[getPlanDayIndex() % plan.days.length] : null;

  if (!plan || !today) {
    navigate('/plan', { replace: true });
    return null;
  }

  function machineFor(id) {
    return machines.find((m) => m.id === id);
  }

  return (
    <div className="screen fade-up">
      <button className="back-link" onClick={() => navigate(-1)}>
        <ArrowRight size={16} /> رجوع
      </button>
      <p className="eyebrow">{plan.name} — {today.label}</p>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '-6px 0 16px' }}>
        اختر أي تمرين تبدأ فيه، وتقدر تسجل باقي التمارين بأي ترتيب
      </p>

      {today.exercises?.length > 0 ? (
        <div>
          {today.exercises.map((ex) => {
            const m = machineFor(ex.machineId);
            const name = ex.machineName || m?.name_ar || '...';
            const topMuscle = m?.target_muscles?.[0]?.label;
            return (
              <div key={ex.machineId} className="continue-row" onClick={() => navigate(`/log/${ex.machineId}`)}>
                {m?.image_url ? (
                  <img src={m.image_url} alt={name} />
                ) : (
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: 'var(--surface-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Dumbbell size={20} style={{ color: 'var(--text-muted)' }} />
                  </div>
                )}
                <div className="cr-body">
                  <p className="cr-title">{name}</p>
                  <p style={{ margin: 0, fontSize: 11, color: 'var(--text-muted)' }}>
                    {(ex.sets || ex.reps) && `${ex.sets || 3} × ${ex.reps || 10}`}
                    {ex.rest ? ` · راحة ${ex.rest}ث` : ''}
                    {topMuscle ? ` · 🎯 ${topMuscle}` : ''}
                  </p>
                  {ex.weight && (
                    <p style={{ margin: 0, fontSize: 12, color: 'var(--iron)', fontWeight: 700 }}>{ex.weight} كغ</p>
                  )}
                  {ex.notes && (
                    <p style={{ margin: 0, fontSize: 11, color: 'var(--text-muted)' }}>📝 {ex.notes}</p>
                  )}
                </div>
                <div className="cr-play"><Play size={14} fill="currentColor" /></div>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
            هذا اليوم مو محدد له أجهزة معينة بالخطة — اختر عضلة عشان تشوف أجهزتها
          </p>
          <div className="chip-grid stagger-in">
            {today.muscles.map((muscleId) => {
              const muscle = MUSCLES.find((mu) => mu.id === muscleId);
              if (!muscle) return null;
              return (
                <div key={muscleId} className="chip" onClick={() => navigate(`/muscle?muscle=${muscleId}`)}>
                  {muscle.label}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
