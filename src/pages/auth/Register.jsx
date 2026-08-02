import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Logo from '../../components/Logo';
import { useAuth } from '../../hooks/useAuth';
import { migrateLocalLogsToCloud } from '../../data/userLogsRepo';
import { isOnboarded } from '../../data/profile';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await register(name, email, password);
      await migrateLocalLogsToCloud(user.uid);
      navigate(isOnboarded() ? '/' : '/onboarding');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') setError('هذا البريد مسجّل مسبقاً — سجّل دخولك بدل ذلك');
      else if (err.code === 'auth/weak-password') setError('كلمة المرور لازم تكون 6 أحرف على الأقل');
      else if (err.code === 'auth/invalid-email') setError('البريد الإلكتروني غير صالح');
      else setError('تعذر إنشاء الحساب — تأكد من ربط Firebase Authentication');
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
        <p style={{ fontWeight: 800, fontSize: 20, margin: '14px 0 4px' }}>إنشاء حساب</p>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, margin: 0 }}>احفظ سجلك بشكل دائم بالسحابة</p>
      </div>

      <form onSubmit={handleSubmit} className="card">
        <div className="field">
          <label>الاسم</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="اسمك" required />
        </div>
        <div className="field">
          <label>البريد الإلكتروني</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="field">
          <label>كلمة المرور</label>
          <input
            type="password"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="6 أحرف على الأقل"
            required
          />
        </div>
        {error && <p style={{ color: 'var(--danger)', fontSize: 13 }}>{error}</p>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'ينشئ الحساب...' : 'إنشاء حساب'}
        </button>
      </form>

      <p className="split-row" style={{ marginTop: 18 }}>
        عندك حساب؟
        <button className="link-btn" onClick={() => navigate('/login')}>سجّل دخولك</button>
      </p>
    </div>
  );
}
