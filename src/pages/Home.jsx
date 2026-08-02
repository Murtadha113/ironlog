import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  QrCode,
  Camera,
  Notebook,
  ClipboardList,
  Play,
  UserPlus,
  X,
  Search,
  Flame,
  Dumbbell,
  TrendingUp,
  BarChart3,
} from 'lucide-react';
import { MUSCLES } from '../data/seedMachines';
import { fetchMachines } from '../data/machinesRepo';
import { suggestNextMuscleFrom, computeStats, getWeekOverview, getRecentMachines } from '../data/localData';
import { useLogs } from '../hooks/useLogs';
import { useAuth, isGuest } from '../hooks/useAuth';
import { getSelectedPlanId, getPlanDayIndex, advancePlanDay } from '../data/planRepo';
import { getPlan } from '../data/plans';

const GUEST_BANNER_DISMISSED_KEY = 'ironlog_guest_banner_dismissed';

const DISCOVER_IDS = ['chest_press', 'lat_pulldown', 'leg_press', 'shoulder_press', 'ab_crunch', 'bicep_curl'];

const FALLBACK_HERO_IMAGE =
  'https://images.pexels.com/photos/28805366/pexels-photo-28805366/free-photo-of-back-view-of-man-lifting-weights-in-gym.jpeg?auto=compress&cs=tinysrgb&w=900';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { logs, loading } = useLogs();
  const [machines, setMachines] = useState([]);
  const [bannerDismissed, setBannerDismissed] = useState(localStorage.getItem(GUEST_BANNER_DISMISSED_KEY) === '1');
  const [query, setQuery] = useState('');
  const returning = logs.length > 0;
  const lastLog = logs[0];
  const nextMuscle = MUSCLES.find((m) => m.id === suggestNextMuscleFrom(lastLog?.muscle));
  const stats = computeStats(logs);
  const week = getWeekOverview(logs);
  const recentMachines = getRecentMachines(logs, 3);

  useEffect(() => {
    fetchMachines().then(setMachines);
  }, []);

  const planId = getSelectedPlanId();
  const plan = planId ? getPlan(planId) : null;
  const today = plan ? plan.days[getPlanDayIndex() % plan.days.length] : null;

  function startPlanDay() {
    advancePlanDay(plan.days.length);
    navigate(`/muscle?muscle=${today.muscles[0]}`);
  }

  function machineFor(id) {
    return machines.find((m) => m.id === id);
  }

  function dismissBanner() {
    localStorage.setItem(GUEST_BANNER_DISMISSED_KEY, '1');
    setBannerDismissed(true);
  }

  const showGuestBanner = !user && isGuest() && !bannerDismissed;

  const trimmedQuery = query.trim().toLowerCase();
  const searchResults = trimmedQuery
    ? machines.filter((m) => m.name_ar.toLowerCase().includes(trimmedQuery) || m.name.toLowerCase().includes(trimmedQuery)).slice(0, 6)
    : [];

  if (loading) {
    return (
      <div className="screen">
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 40, textAlign: 'center' }}>يحمّل...</p>
      </div>
    );
  }

  const heroMuscle = today ? today.muscles[0] : returning ? nextMuscle?.id : MUSCLES[0].id;
  const heroMachine = machines.find((m) => m.muscle === heroMuscle && m.image_url);
  const heroImage = heroMachine?.image_url || FALLBACK_HERO_IMAGE;
  const heroTitle = today ? today.label : returning ? nextMuscle?.label : 'جاهز تبدأ؟';
  const heroSubtitle = today
    ? `${plan.name} — ${today.muscles.map((m) => MUSCLES.find((mu) => mu.id === m)?.label).join('، ')}`
    : returning
    ? 'التمرين المقترح اليوم'
    : 'سجّل أوزانك بعد كل تمرين، وتابع تقدمك بدون تعقيد';
  const heroCtaLabel = today ? `ابدأ تمرين ${today.label}` : returning ? `ابدأ تمرين ${nextMuscle?.label}` : 'ابدأ تمرينك';
  const heroCtaAction = today ? startPlanDay : () => navigate(`/muscle${returning ? `?suggested=${nextMuscle?.id}` : ''}`);

  return (
    <div className="screen fade-up">
      <div className="hero-workout-card">
        <div className="hwc-bg" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="hwc-overlay" />
        {returning && (
          <div className="hwc-badge">
            <Flame size={14} style={{ color: '#FF9142' }} /> {stats.streak}
          </div>
        )}
        <div className="hwc-content">
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--iron)', margin: '0 0 4px' }}>
            {returning ? 'مرحباً فيك من جديد 👋' : 'IronLog'}
          </p>
          <p style={{ fontSize: 24, fontWeight: 800, margin: '0 0 6px' }}>{heroTitle}</p>
          <p style={{ fontSize: 12, color: '#C8CCC2', margin: '0 0 16px' }}>{heroSubtitle}</p>
          <button className="btn btn-primary" style={{ marginBottom: today ? 8 : 0 }} onClick={heroCtaAction}>
            {heroCtaLabel}
          </button>
          {today && (
            <button className="btn btn-ghost" style={{ width: '100%', color: '#C8CCC2', fontSize: 12 }} onClick={() => navigate('/plan')}>
              تغيير الخطة
            </button>
          )}
        </div>
      </div>

      <div className="field" style={{ position: 'relative', marginBottom: searchResults.length || trimmedQuery ? 8 : 16 }}>
        <Search
          size={16}
          style={{ position: 'absolute', insetInlineStart: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}
        />
        <input
          style={{ paddingInlineStart: 36 }}
          placeholder="دوّر على جهاز أو تمرين..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {trimmedQuery && (
        <div className="card" style={{ marginBottom: 16 }}>
          {searchResults.length === 0 ? (
            <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>ما لقينا جهاز بهذا الاسم</p>
          ) : (
            searchResults.map((m) => (
              <div key={m.id} className="list-row" style={{ cursor: 'pointer' }} onClick={() => navigate(`/log/${m.id}`)}>
                <span>{m.name_ar}</span>
                {m.image_url && <img src={m.image_url} alt="" style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover' }} />}
              </div>
            ))
          )}
        </div>
      )}

      {showGuestBanner && (
        <div className="card" style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <UserPlus size={22} style={{ color: 'var(--iron)', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 700, fontSize: 13, margin: 0 }}>احفظ تقدمك بحساب مجاني</p>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0 }}>سجلك محفوظ بجهازك بس — سوّي حساب يزامنه بالسحابة</p>
          </div>
          <button className="btn btn-primary" style={{ width: 'auto', padding: '8px 14px', fontSize: 12, animation: 'none' }} onClick={() => navigate('/register')}>
            سجّل
          </button>
          <button className="btn btn-ghost" style={{ padding: 6 }} onClick={dismissBanner} aria-label="إغلاق">
            <X size={16} />
          </button>
        </div>
      )}

      <div className="week-strip">
        {week.map((d, i) => (
          <div key={i} className={`week-day ${d.isToday ? 'today' : ''}`}>
            <span className="wd-label">{d.label}</span>
            <span className="wd-num">{d.num}</span>
            {d.hasLog ? <span className="wd-dot" /> : <span className="wd-dot-empty" />}
          </div>
        ))}
      </div>

      {returning && (
        <div className="bento-stats stagger-in">
          <div className="bento-stat">
            <div className="bs-icon tile-green"><Dumbbell size={18} /></div>
            <span className="bs-val">{stats.total}</span>
            <span className="bs-label">جلسة تمرين</span>
          </div>
          <div className="bento-stat">
            <div className="bs-icon tile-orange"><Flame size={18} /></div>
            <span className="bs-val">{stats.streak}</span>
            <span className="bs-label">أيام متتالية</span>
          </div>
          <div className="bento-stat">
            <div className="bs-icon tile-blue"><TrendingUp size={18} /></div>
            <span className="bs-val">{stats.thisWeek}</span>
            <span className="bs-label">هالأسبوع</span>
          </div>
          <div className="bento-stat">
            <div className="bs-icon tile-purple"><BarChart3 size={18} /></div>
            <span className="bs-val">{stats.volumeMonth.toLocaleString('en-US')} كغ</span>
            <span className="bs-label">حجم هالشهر</span>
          </div>
        </div>
      )}

      <div className="action-grid stagger-in" style={{ marginBottom: 24 }}>
        <button className="action-tile" onClick={() => navigate('/scan')}>
          <div className="icon-box tile-blue"><QrCode size={22} /></div>
          <span>مسح QR</span>
        </button>
        <button className="action-tile" onClick={() => navigate('/add-machine')}>
          <div className="icon-box tile-purple"><Camera size={22} /></div>
          <span>صوّر جهاز</span>
        </button>
        <button className="action-tile" onClick={() => navigate('/notebook')}>
          <div className="icon-box tile-green"><Notebook size={22} /></div>
          <span>دفترك</span>
        </button>
        <button className="action-tile" onClick={() => navigate('/plan')}>
          <div className="icon-box tile-orange"><ClipboardList size={22} /></div>
          <span>خطتك</span>
        </button>
      </div>

      {recentMachines.length > 0 && (
        <>
          <p className="eyebrow">استمر بالتمرين</p>
          <div style={{ marginBottom: 22 }}>
            {recentMachines.map((l) => {
              const m = machineFor(l.machineId);
              const pct = Math.min(100, Math.round((l.sessionsThisMonth / 8) * 100)) || 8;
              return (
                <div
                  key={`${l.machineId}:${l.positionId}`}
                  className="continue-row"
                  onClick={() => navigate(`/log/${l.machineId}?position=${l.positionId}`)}
                >
                  {m?.image_url && <img src={m.image_url} alt={l.machineName} />}
                  <div className="cr-body">
                    <p className="cr-title">{l.machineName}</p>
                    <div className="cr-bar-track">
                      <div className="cr-bar-fill" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <div className="cr-play"><Play size={14} fill="currentColor" /></div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <p className="eyebrow">أجهزة تناسب البداية</p>
      <div className="discover-row" style={{ marginBottom: 22 }}>
        {DISCOVER_IDS.map((id) => {
          const m = machineFor(id);
          if (!m) return null;
          return (
            <div key={id} className="discover-card" onClick={() => navigate(`/log/${id}`)}>
              <img src={m.image_url} alt={m.name_ar} />
              <span>{m.name_ar}</span>
            </div>
          );
        })}
      </div>

      <p className="eyebrow">أو اختر عضلة</p>
      <div className="chip-grid stagger-in">
        {MUSCLES.map((m) => (
          <div key={m.id} className="chip" onClick={() => navigate(`/muscle?muscle=${m.id}`)}>
            {m.label}
          </div>
        ))}
      </div>
    </div>
  );
}
