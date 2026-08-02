import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Droplets, Flame } from 'lucide-react';
import Logo from '../components/Logo';
import {
  GOALS,
  ACTIVITY_LEVELS,
  saveProfile,
  markOnboarded,
  computeBMR,
  computeTDEE,
  computeGoalPlan,
  computeWaterIntake,
} from '../data/profile';

const STEPS = 4;

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState('moderate');
  const [goal, setGoal] = useState('');

  const bmr = computeBMR({ weight: Number(weight), height: Number(height), age: Number(age), gender });
  const tdee = computeTDEE(bmr, activity);
  const macros = computeGoalPlan(tdee, goal, Number(weight));
  const water = computeWaterIntake(Number(weight));

  function next() {
    if (step === STEPS - 2) {
      saveProfile({ height: Number(height), weight: Number(weight), age: Number(age), gender, activity, goal });
    }
    setStep((s) => Math.min(s + 1, STEPS - 1));
  }
  function back() {
    if (step === 0) navigate(-1);
    else setStep((s) => s - 1);
  }
  function skip() {
    markOnboarded();
    navigate('/');
  }
  function finish() {
    markOnboarded();
    navigate('/');
  }

  const step0Valid = age && height && weight;

  return (
    <div className="hero-shell fade-up">
      <button className="back-link" onClick={back}>
        <ArrowRight size={16} /> رجوع
      </button>

      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        <Logo size={44} />
      </div>

      <div className="onb-progress">
        {Array.from({ length: STEPS }, (_, i) => (
          <div key={i} className={`dot ${i <= step ? 'active' : ''}`} />
        ))}
      </div>

      {step === 0 && (
        <>
          <p style={{ fontWeight: 800, fontSize: 20, margin: '0 0 4px' }}>عرّفنا عليك</p>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, margin: '0 0 20px' }}>
            نستخدمها نحسب لك كتلتك ومعدل حرقك واحتياجك اليومي
          </p>
          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <div className="field" style={{ flex: 1 }}>
                <label>العمر</label>
                <input type="number" inputMode="numeric" placeholder="25" value={age} onChange={(e) => setAge(e.target.value)} />
              </div>
              <div className="field" style={{ flex: 1 }}>
                <label>الطول (سم)</label>
                <input type="number" inputMode="decimal" placeholder="175" value={height} onChange={(e) => setHeight(e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label>الوزن (كغ)</label>
              <input type="number" inputMode="decimal" placeholder="75" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </div>
            <div className="field" style={{ marginBottom: 0 }}>
              <label>الجنس</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <div className={`activity-chip ${gender === 'male' ? 'selected' : ''}`} onClick={() => setGender('male')}>ذكر</div>
                <div className={`activity-chip ${gender === 'female' ? 'selected' : ''}`} onClick={() => setGender('female')}>أنثى</div>
              </div>
            </div>
          </div>
          <button className="btn btn-primary" disabled={!step0Valid} onClick={next}>التالي</button>
        </>
      )}

      {step === 1 && (
        <>
          <p style={{ fontWeight: 800, fontSize: 20, margin: '0 0 4px' }}>مستوى نشاطك</p>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, margin: '0 0 20px' }}>كم مرة تتمرن بالأسبوع تقريباً؟</p>
          {ACTIVITY_LEVELS.map((a) => (
            <div key={a.id} className={`goal-card ${activity === a.id ? 'selected' : ''}`} onClick={() => setActivity(a.id)}>
              <Flame size={22} style={{ color: 'var(--iron)', flexShrink: 0 }} />
              <div>
                <p style={{ fontWeight: 700, fontSize: 14, margin: 0 }}>{a.label}</p>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>{a.desc}</p>
              </div>
            </div>
          ))}
          <button className="btn btn-primary" style={{ marginTop: 6 }} onClick={next}>التالي</button>
        </>
      )}

      {step === 2 && (
        <>
          <p style={{ fontWeight: 800, fontSize: 20, margin: '0 0 4px' }}>وش هدفك؟</p>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, margin: '0 0 20px' }}>بناءً عليه بنجهز لك ماكروز مناسبة</p>
          {GOALS.map((g) => (
            <div key={g.id} className={`goal-card ${goal === g.id ? 'selected' : ''}`} onClick={() => setGoal(g.id)}>
              <span className="emoji">{g.emoji}</span>
              <div>
                <p style={{ fontWeight: 700, fontSize: 14, margin: 0 }}>{g.label}</p>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>{g.desc}</p>
              </div>
            </div>
          ))}
          <button className="btn btn-primary" style={{ marginTop: 6 }} disabled={!goal} onClick={next}>
            احسب خطتي
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <p style={{ fontWeight: 800, fontSize: 20, margin: '0 0 4px' }}>خطتك جاهزة 🎉</p>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, margin: '0 0 16px' }}>
            تقدير يومي بناءً على بياناتك — تقدر تعدّلها بعدين من البروفايل
          </p>

          <div className="card" style={{ textAlign: 'center', marginBottom: 14 }}>
            <p className="eyebrow" style={{ textAlign: 'center' }}>السعرات المقترحة</p>
            <p style={{ fontSize: 32, fontWeight: 800, margin: 0 }} className="gradient-text">
              {macros?.calories ?? '—'} <span style={{ fontSize: 14 }}>سعرة</span>
            </p>
            <div className="macro-grid">
              <div className="macro-tile">
                <div className="mt-val">{macros?.protein ?? '—'}غ</div>
                <div className="mt-label">بروتين</div>
              </div>
              <div className="macro-tile">
                <div className="mt-val">{macros?.carbs ?? '—'}غ</div>
                <div className="mt-label">كارب</div>
              </div>
              <div className="macro-tile">
                <div className="mt-val">{macros?.fat ?? '—'}غ</div>
                <div className="mt-label">دهون</div>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
            <Droplets size={28} style={{ color: 'var(--iron)', flexShrink: 0 }} />
            <div>
              <p style={{ fontWeight: 700, fontSize: 15, margin: 0 }}>{water ?? '—'} لتر ماء يومياً</p>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>يزيد يوم التمرين — خلك رطّب</p>
            </div>
          </div>

          <button className="btn btn-primary" style={{ marginBottom: 10 }} onClick={finish}>يلا نبدأ</button>
          <button className="btn btn-outline" onClick={() => { markOnboarded(); navigate('/plan'); }}>
            اختار خطة تمرينك
          </button>
        </>
      )}

      {step < 3 && (
        <button className="btn btn-ghost" style={{ marginTop: 10 }} onClick={skip}>
          تخطي الآن
        </button>
      )}
    </div>
  );
}
