import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Notebook, ClipboardList } from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      <button className={`nav-item ${location.pathname === '/' ? 'active' : ''}`} onClick={() => navigate('/')}>
        <Home size={20} />
        الرئيسية
      </button>

      <button className="nav-item nav-item-elevated" onClick={() => navigate('/plan')}>
        <div className="nav-fab">
          <ClipboardList size={22} />
        </div>
        <span>خطتك</span>
      </button>

      <button
        className={`nav-item ${location.pathname === '/notebook' ? 'active' : ''}`}
        onClick={() => navigate('/notebook')}
      >
        <Notebook size={20} />
        دفترك
      </button>
    </nav>
  );
}
