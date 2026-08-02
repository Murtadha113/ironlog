import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { MUSCLES } from '../data/seedMachines';

export default function MuscleSelect() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const preselected = params.get('muscle') || params.get('suggested');

  return (
    <div className="screen fade-up">
      <button className="back-link" onClick={() => navigate(-1)}>
        <ArrowRight size={16} /> رجوع
      </button>
      <p className="eyebrow">اختر العضلة اللي تبي تدربها</p>
      <div className="chip-grid stagger-in">
        {MUSCLES.map((m) => (
          <div
            key={m.id}
            className="chip"
            style={preselected === m.id ? { borderColor: 'var(--iron)', background: 'var(--iron-tint)' } : undefined}
            onClick={() => navigate(`/machines?muscle=${m.id}`)}
          >
            {m.label}
          </div>
        ))}
      </div>
    </div>
  );
}
