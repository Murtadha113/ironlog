import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Logo from '../../components/Logo';
import { useAuth } from '../../hooks/useAuth';
import { migrateLocalLogsToCloud } from '../../data/userLogsRepo';
import { isOnboarded } from '../../data/profile';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await login(email, password);
      await migrateLocalLogsToCloud(user.uid);
      navigate(isOnboarded() ? '/' : '/onboarding');
    } catch (err) {
      setError('البريد أو كلمة المرور غير صحيحة');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="hero-shell">
      <button className="back-link" onClick={() => navigate('/welcome')}>
        <ArrowRight size={16} /> رجوع
      </button>

      <div style={{ textAlign: 'center', margin: '8px 0 24px' }}>
        <Logo size={52} />
        <p style={{ fontWeight: 800, fontSize: 20, margin: '14px 0 4px' }}>تسجيل الدخول</p>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, margin: 0 }}>رجّعلك سجلك المحفوظ بالسحابة</p>
      </div>

      <form onSubmit={handleSubmit} className="card">
        <div className="field">
          <label>البريد الإلكتروني</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="field">
          <label>كلمة المرور</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p style={{ color: 'var(--danger)', fontSize: 13 }}>{error}</p>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'يدخل...' : 'دخول'}
        </button>
      </form>

      <p className="split-row" style={{ marginTop: 18 }}>
        ماعندك حساب؟
        <button className="link-btn" onClick={() => navigate('/register')}>أنشئ حساب</button>
      </p>
    </div>
  );
}
