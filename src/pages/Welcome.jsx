import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Logo from '../components/Logo';
import { setGuest } from '../hooks/useAuth';
import { isOnboarded } from '../data/profile';

const HERO_IMAGE =
  'https://images.pexels.com/photos/30564728/pexels-photo-30564728/free-photo-of-muscular-man-posing-with-neon-circle-light.jpeg?auto=compress&cs=tinysrgb&w=1080';

export default function Welcome() {
  const navigate = useNavigate();

  function continueAsGuest() {
    setGuest(true);
    navigate(isOnboarded() ? '/' : '/onboarding');
  }

  return (
    <div className="hero-photo-shell fade-up">
      <div className="hero-photo-bg" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
      <div className="hero-photo-overlay" />

      <div className="hero-badge">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Logo size={34} glow />
          <span style={{ fontWeight: 800, fontSize: 16 }}>IronLog</span>
        </div>
      </div>

      <div className="hero-photo-content">
        <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 0 4px', fontWeight: 700 }}>
          مرحباً بك في
        </p>
        <p style={{ fontSize: 34, fontWeight: 800, margin: '0 0 10px' }}>
          Iron<span className="gradient-text">Log</span>
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, margin: '0 0 26px', maxWidth: 320, lineHeight: 1.7 }}>
          سجّل أوزانك بعد كل تمرين، وتابع تقدمك أسبوع بعد أسبوع — تمرين شخصي وبسيط.
        </p>

        <button
          className="btn btn-primary"
          style={{ justifyContent: 'space-between', paddingInline: 22, marginBottom: 10 }}
          onClick={() => navigate('/register')}
        >
          <span>ابدأ الحين</span>
          <ArrowLeft size={18} />
        </button>
        <button className="btn btn-outline" style={{ marginBottom: 10 }} onClick={() => navigate('/login')}>
          تسجيل الدخول
        </button>
        <button className="btn btn-ghost" onClick={continueAsGuest}>
          المتابعة كضيف
        </button>
      </div>
    </div>
  );
}
