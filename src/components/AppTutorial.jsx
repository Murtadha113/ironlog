import { useState } from 'react';
import { Search, ClipboardList, Dumbbell, Notebook } from 'lucide-react';

const SEEN_KEY = 'ironlog_tutorial_seen';

export function tutorialSeen() {
  return localStorage.getItem(SEEN_KEY) === '1';
}

const STEPS = [
  {
    icon: Dumbbell,
    title: 'مرحباً فيك بـ IronLog',
    desc: 'سجّل أوزانك بعد كل تمرين، وتابع تقدمك أسبوع بعد أسبوع بدون تعقيد.',
  },
  {
    icon: Search,
    title: 'دوّر على جهازك',
    desc: 'من الرئيسية اختر عضلة، دوّر بالبحث، أو امسح كود QR اللي على الجهاز عشان توصل لتسجيله مباشرة.',
  },
  {
    icon: ClipboardList,
    title: 'سجّل وزنك وتابع تقدمك',
    desc: 'بعد كل مجموعة سجّل الوزن والتكرارات. الموقع يتذكر آخر وزن سجلته ويقترح عليك تزيد أو تكرر نفس الشي.',
  },
  {
    icon: Dumbbell,
    title: 'سوّي خطتك',
    desc: 'من "خطتك" تقدر تختار خطة جاهزة أو تسوي وحدة خاصة فيك — حدد أجهزتك وأوزانك مسبقاً، والموقع يذكّرك فيها كل يوم.',
  },
  {
    icon: Notebook,
    title: 'دفترك',
    desc: 'كل تمرين تسجله يترتب بدفترك حسب العضلة. تقدر كمان تسجل أي تمرين حتى لو مو موجود بالقائمة، أو تضيف جهازك الخاص.',
  },
];

export default function AppTutorial({ onDone }) {
  const [step, setStep] = useState(0);
  const isLast = step === STEPS.length - 1;
  const current = STEPS[step];
  const Icon = current.icon;

  function finish() {
    localStorage.setItem(SEEN_KEY, '1');
    onDone();
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.72)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
        padding: 20,
      }}
    >
      <div className="card" style={{ width: '100%', maxWidth: 360, textAlign: 'center' }}>
        <div className="onb-progress">
          {STEPS.map((_, i) => (
            <div key={i} className={`dot ${i <= step ? 'active' : ''}`} />
          ))}
        </div>

        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'var(--iron-tint)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            color: 'var(--iron)',
          }}
        >
          <Icon size={28} />
        </div>

        <p style={{ fontWeight: 800, fontSize: 17, margin: '0 0 8px' }}>{current.title}</p>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 0 22px', lineHeight: 1.7 }}>{current.desc}</p>

        <button
          className="btn btn-primary"
          style={{ marginBottom: 10 }}
          onClick={() => (isLast ? finish() : setStep((s) => s + 1))}
        >
          {isLast ? 'ابدأ الحين' : 'التالي'}
        </button>
        {!isLast && (
          <button className="btn btn-ghost" style={{ width: '100%', color: 'var(--text-muted)', fontSize: 12 }} onClick={finish}>
            تخطي
          </button>
        )}
      </div>
    </div>
  );
}
