// تخزين محلي على الجهاز — يشتغل من أول لحظة بدون تسجيل دخول (وضع الضيف)

const LOGS_KEY = 'ironlog_logs';
const SESSIONS_COUNT_KEY = 'ironlog_session_count';

export function getLogs() {
  try {
    return JSON.parse(localStorage.getItem(LOGS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function clearLogs() {
  localStorage.removeItem(LOGS_KEY);
  localStorage.removeItem(SESSIONS_COUNT_KEY);
}

export function deleteLog(id) {
  const logs = getLogs().filter((l) => l.id !== id);
  localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
  return logs;
}

export function filterByMachine(logs, machineId, positionId) {
  return logs.filter((l) => l.machineId === machineId && l.positionId === positionId);
}

export function addLog(entry) {
  const logs = getLogs();
  const newLog = { id: `${Date.now()}`, date: new Date().toISOString(), ...entry };
  logs.unshift(newLog);
  localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
  bumpSessionCount();
  return newLog;
}

export function getLastLog() {
  const logs = getLogs();
  return logs.length ? logs[0] : null;
}

export function bumpSessionCount() {
  const n = getSessionCount() + 1;
  localStorage.setItem(SESSIONS_COUNT_KEY, String(n));
  return n;
}

export function getSessionCount() {
  return parseInt(localStorage.getItem(SESSIONS_COUNT_KEY) || '0', 10);
}

export function isReturningUser() {
  return getLogs().length > 0;
}

// اقتراح العضلة القادمة بناءً على آخر عضلة تم تدريبها (تناوب بسيط)
const ROTATION = ['chest', 'back', 'shoulders', 'legs', 'arms', 'core'];
export function suggestNextMuscleFrom(lastMuscle) {
  if (!lastMuscle) return ROTATION[0];
  const idx = ROTATION.indexOf(lastMuscle);
  return ROTATION[(idx + 1) % ROTATION.length];
}
export function suggestNextMuscle() {
  return suggestNextMuscleFrom(getLastLog()?.muscle);
}

export function computeStats(logs) {
  const total = logs.length;
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const thisWeek = logs.filter((l) => new Date(l.date) >= weekAgo).length;

  const days = [...new Set(logs.map((l) => new Date(l.date).toDateString()))]
    .map((d) => new Date(d))
    .sort((a, b) => b - a);

  let streak = 0;
  if (days.length) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffFromToday = Math.round((today - days[0]) / 86400000);
    if (diffFromToday <= 1) {
      streak = 1;
      let prev = days[0];
      for (let i = 1; i < days.length; i++) {
        const diff = Math.round((prev - days[i]) / 86400000);
        if (diff === 1) {
          streak++;
          prev = days[i];
        } else break;
      }
    }
  }

  const monthAgo = new Date();
  monthAgo.setDate(monthAgo.getDate() - 30);
  const volumeMonth = logs
    .filter((l) => new Date(l.date) >= monthAgo)
    .reduce((sum, l) => sum + (l.weight || 0) * (l.reps || 0) * (l.sets || 1), 0);

  return { total, thisWeek, streak, volumeMonth: Math.round(volumeMonth) };
}

// معادلة Epley لتقدير أقصى وزن ترفعه مرة وحدة (1RM)
export function computeOneRepMax(weight, reps) {
  if (!weight || !reps) return null;
  if (reps === 1) return Math.round(weight * 10) / 10;
  return Math.round(weight * (1 + reps / 30) * 10) / 10;
}

const WEEK_LABELS = ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'];

// أيام الأسبوع الحالي (الأحد للسبت) مع تعليم اليوم الحالي واللي فيه سجل
export function getWeekOverview(logs) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - today.getDay());

  const loggedDates = new Set(logs.map((l) => new Date(l.date).toDateString()));

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(sunday);
    date.setDate(sunday.getDate() + i);
    return {
      label: WEEK_LABELS[i],
      num: date.getDate(),
      isToday: date.toDateString() === today.toDateString(),
      hasLog: loggedDates.has(date.toDateString()),
    };
  });
}

// آخر الأجهزة المختلفة اللي سجّل فيها المستخدم (لقسم "استمر بالتمرين")
// نستبعد جلسات "الإضافة السريعة" لأنها ما ترتبط بجهاز ثابت تقدر ترجع تفتحه
export function getRecentMachines(logs, limit = 3) {
  const seen = new Set();
  const result = [];
  for (const l of logs) {
    if (l.machineId?.startsWith('quick_')) continue;
    const key = `${l.machineId}:${l.positionId}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const sessionsThisMonth = logs.filter((x) => {
      const monthAgo = new Date();
      monthAgo.setDate(monthAgo.getDate() - 30);
      return x.machineId === l.machineId && x.positionId === l.positionId && new Date(x.date) >= monthAgo;
    }).length;
    result.push({ ...l, sessionsThisMonth });
    if (result.length >= limit) break;
  }
  return result;
}
