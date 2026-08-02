import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, User, Droplets } from 'lucide-react';
import {
  getProfile,
  saveProfile,
  computeBmi,
  bmiCategory,
  computeBMR,
  computeTDEE,
  computeGoalPlan,
  computeWaterIntake,
  GOALS,
  ACTIVITY_LEVELS,
} from '../data/profile';
import { computeOneRepMax } from '../data/localData';
import { useAuth } from '../hooks/useAuth';

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const initial = getProfile();
  const [height, setHeight] = useState(initial.height);
  const [weight, setWeight] = useState(initial.weight);
  const [age, setAge] = useState(initial.age);
  const [gender, setGender] = useState(initial.gender);
  const [goal, setGoal] = useState(initial.goal);
  const [activity, setActivity] = useState(initial.activity);
  const [saved, setSaved] = useState(false);
  const [rmWeight, setRmWeight] = useState('');
  const [rmReps, setRmReps] = useState('');

  const bmi = computeBmi(Number(height), Number(weight));
  const category = bmiCategory(bmi);
  const oneRepMax = computeOneRepMax(Number(rmWeight), Number(rmReps));

  const bmr = computeBMR({ weight: Number(weight), height: Number(height), age: Number(age), gender });
  const tdee = computeTDEE(bmr, activity);
  const macros = goal ? computeGoalPlan(tdee, goal, Number(weight)) : null;
  const water = computeWaterIntake(Number(weight));

  function handleSubmit(e) {
    e.preventDefault();
    saveProfile({ height: Number(height), weight: Number(weight), age: Number(age), gender, goal, activity });
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  return (
    <div className="screen fade-up">
      <button className="back-link" onClick={() => navigate(-1)}>
        <ArrowRight size={16} /> رجوع
      </button>

      <div style={{ textAlign: 'center', marginBottom: 18 }}>
        <div className="avatar" style={{ width: 60, height: 60, margin: '0 auto 10px' }}>
          <User size={26} />
        </div>
        <p style={{ fontWeight: 700, fontSize: 16, margin: 0 }}>{user?.email || 'وضع الضيف'}</p>
      </div>

      <p className="eyebrow">بياناتك</p>
      <form onSubmit={handleSubmit} className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <div className="field" style={{ flex: 1 }}>
            <label>العمر</label>
            <input type="number" inputMode="numeric" placeholder="25" value={age} onChange={(e) => setAge(e.target.value)} />
          </div>
          <div className="field" style={{ flex: 1 }}>
            <label>الطول (سم)</label>
            <input type="number" inputMode="decimal" placeholder="175" value={height} onChange={(e) => setHeight(e.target.value)} />
          </div>
          <div className="field" style={{ flex: 1 }}>
            <label>الوزن (كغ)</label>
            <input type="number" inputMode="decimal" placeholder="75" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
        </div>

        <div className="field">
          <label>الجنس</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <div className={`activity-chip ${gender === 'male' ? 'selected' : ''}`} onClick={() => setGender('male')}>ذكر</div>
            <div className={`activity-chip ${gender === 'female' ? 'selected' : ''}`} onClick={() => setGender('female')}>أنثى</div>
          </div>
        </div>

        <div className="field">
          <label>مستوى النشاط</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {ACTIVITY_LEVELS.map((a) => (
              <div key={a.id} className={`activity-chip ${activity === a.id ? 'selected' : ''}`} onClick={() => setActivity(a.id)}>
                {a.label}
              </div>
            ))}
          </div>
        </div>

        <div className="field" style={{ marginBottom: 0 }}>
          <label>هدفك</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {GOALS.map((g) => (
              <div
                key={g.id}
                className={`activity-chip ${goal === g.id ? 'selected' : ''}`}
                style={{ fontSize: 12 }}
                onClick={() => setGoal(g.id)}
              >
                {g.emoji} {g.label}
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ marginTop: 14 }}>{saved ? 'تم الحفظ ✓' : 'احفظ'}</button>
      </form>

      {bmi && (
        <>
          <p className="eyebrow">كتلة الجسم (BMI)</p>
          <div className="card" style={{ textAlign: 'center', marginBottom: 16 }}>
            <div className="timer-ring" style={{ width: 130, height: 130 }}>
              <svg width="130" height="130" viewBox="0 0 130 130">
                <circle cx="65" cy="65" r="55" fill="none" stroke="var(--surface-sunken)" strokeWidth="10" />
                <circle
                  cx="65"
                  cy="65"
                  r="55"
                  fill="none"
                  stroke={category?.color}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 55}
                  strokeDashoffset={2 * Math.PI * 55 * (1 - Math.min(bmi / 40, 1))}
                  style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                />
              </svg>
              <span className="timer-val" style={{ fontSize: 24 }}>{bmi}</span>
            </div>
            <span className="badge" style={{ background: 'transparent', border: `1px solid ${category.color}`, color: category.color, marginTop: 10 }}>
              {category.label}
            </span>
          </div>
        </>
      )}

      {macros && (
        <>
          <p className="eyebrow">خطتك الغذائية اليومية</p>
          <div className="card" style={{ textAlign: 'center', marginBottom: 16 }}>
            <p style={{ fontSize: 30, fontWeight: 800, margin: 0 }} className="gradient-text">
              {macros.calories} <span style={{ fontSize: 13 }}>سعرة</span>
            </p>
            <div className="macro-grid">
              <div className="macro-tile">
                <div className="mt-val">{macros.protein}غ</div>
                <div className="mt-label">بروتين</div>
              </div>
              <div className="macro-tile">
                <div className="mt-val">{macros.carbs}غ</div>
                <div className="mt-label">كارب</div>
              </div>
              <div className="macro-tile">
                <div className="mt-val">{macros.fat}غ</div>
                <div className="mt-label">دهون</div>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
            <Droplets size={26} style={{ color: 'var(--iron)', flexShrink: 0 }} />
            <div>
              <p style={{ fontWeight: 700, fontSize: 14, margin: 0 }}>{water} لتر ماء يومياً</p>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>يزيد يوم التمرين — خلك رطّب</p>
            </div>
          </div>
        </>
      )}

      <p className="eyebrow">حاسبة أقصى وزن (1RM)</p>
      <div className="card">
        <div style={{ display: 'flex', gap: 10, marginBottom: oneRepMax ? 14 : 0 }}>
          <div className="field" style={{ flex: 1, marginBottom: 0 }}>
            <label>الوزن (كغ)</label>
            <input type="number" inputMode="decimal" placeholder="60" value={rmWeight} onChange={(e) => setRmWeight(e.target.value)} />
          </div>
          <div className="field" style={{ flex: 1, marginBottom: 0 }}>
            <label>التكرارات</label>
            <input type="number" inputMode="numeric" placeholder="8" value={rmReps} onChange={(e) => setRmReps(e.target.value)} />
          </div>
        </div>
        {oneRepMax && (
          <div style={{ textAlign: 'center', paddingTop: 14, borderTop: '1px solid var(--line-soft)' }}>
            <span className="stat-val" style={{ fontSize: 26 }}>{oneRepMax} كغ</span>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: '4px 0 0' }}>أقصى وزن تقدر ترفعه مرة وحدة (تقديري)</p>
          </div>
        )}
      </div>
    </div>
  );
}
