import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import Home from './pages/Home';
import MuscleSelect from './pages/MuscleSelect';
import MachineSelect from './pages/MachineSelect';
import LogSession from './pages/LogSession';
import AddMachineRequest from './pages/AddMachineRequest';
import CustomExercise from './pages/CustomExercise';
import Scan from './pages/Scan';
import Plan from './pages/Plan';
import Profile from './pages/Profile';
import Notebook from './pages/Notebook';
import Welcome from './pages/Welcome';
import Onboarding from './pages/Onboarding';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import BottomNav from './components/BottomNav';
import Logo from './components/Logo';
import Splash from './components/Splash';
import AppTutorial, { tutorialSeen } from './components/AppTutorial';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminMachines from './pages/admin/AdminMachines';
import AdminPending from './pages/admin/AdminPending';
import { useAuth, isGuest } from './hooks/useAuth';

function UserApp() {
  const navigate = useNavigate();
  const [showTutorial, setShowTutorial] = useState(!tutorialSeen());

  return (
    <div className="app-shell">
      <div className="topbar">
        <div className="mark"><Logo size={36} /></div>
        <h1 style={{ flex: 1 }}>IronLog</h1>
        <div className="avatar" onClick={() => navigate('/profile')}>
          <User size={18} />
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/muscle" element={<MuscleSelect />} />
        <Route path="/machines" element={<MachineSelect />} />
        <Route path="/log/:machineId" element={<LogSession />} />
        <Route path="/add-machine" element={<AddMachineRequest />} />
        <Route path="/custom-exercise" element={<CustomExercise />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notebook" element={<Notebook />} />
      </Routes>
      <BottomNav />
      {showTutorial && <AppTutorial onDone={() => setShowTutorial(false)} />}
    </div>
  );
}

function Gated({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  const [minSplashDone, setMinSplashDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMinSplashDone(true), 900);
    return () => clearTimeout(t);
  }, []);

  if (user === undefined || !minSplashDone) return <Splash />;
  if (!user && !isGuest()) {
    return <Navigate to="/welcome" replace state={{ from: location }} />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="machines" element={<AdminMachines />} />
        <Route path="pending" element={<AdminPending />} />
      </Route>
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <Gated>
            <UserApp />
          </Gated>
        }
      />
    </Routes>
  );
}
