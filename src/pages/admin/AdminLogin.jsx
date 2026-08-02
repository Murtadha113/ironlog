import { useState } from 'react';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import Logo from '../../components/Logo';

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError('بيانات الدخول غير صحيحة');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-shell" style={{ maxWidth: 380, paddingTop: 80 }}>
      <div style={{ marginBottom: 16 }}><Logo size={44} /></div>
      <p style={{ fontWeight: 700, fontSize: 20, marginBottom: 4 }}>لوحة تحكم IronLog</p>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>
        سجّل دخولك للوصول للوحة الإدارة
      </p>
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
      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 16 }}>
        أنشئ حساب الأدمن من Firebase Console → Authentication → Add user
      </p>
    </div>
  );
}
