import { NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAdminAuth } from '../../hooks/useAdminAuth';

export default function AdminLayout() {
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();

  if (user === undefined) {
    return <div className="admin-shell">يتحقق من الدخول...</div>;
  }

  if (user === null) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="admin-shell">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <p style={{ fontWeight: 700, fontSize: 18, margin: 0 }}>لوحة تحكم IronLog</p>
        <button className="btn btn-ghost" onClick={() => { logout(); navigate('/admin/login'); }}>
          <LogOut size={14} /> خروج
        </button>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24, borderBottom: '1px solid var(--line)', paddingBottom: 12 }}>
        <NavLink to="/admin/machines" className="btn" style={({ isActive }) => (isActive ? { borderColor: 'var(--iron)', color: 'var(--iron-dark)' } : {})}>
          الأجهزة
        </NavLink>
        <NavLink to="/admin/pending" className="btn" style={({ isActive }) => (isActive ? { borderColor: 'var(--iron)', color: 'var(--iron-dark)' } : {})}>
          طلبات الإضافة
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
}
