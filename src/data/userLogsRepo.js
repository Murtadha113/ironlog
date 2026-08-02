import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getLogs, clearLogs } from './localData';

export async function fetchUserDoc(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
}

export async function getUserLogs(uid) {
  try {
    const data = await fetchUserDoc(uid);
    return data?.logs || [];
  } catch (e) {
    console.warn('تعذر جلب السجل من Firestore:', e.message);
    return [];
  }
}

export async function addUserLog(uid, entry) {
  const logs = await getUserLogs(uid);
  const newLog = { id: `${Date.now()}`, date: new Date().toISOString(), ...entry };
  const updated = [newLog, ...logs];
  await updateDoc(doc(db, 'users', uid), { logs: updated, updated_at: new Date().toISOString() });
  return newLog;
}

export async function deleteUserLog(uid, id) {
  const logs = await getUserLogs(uid);
  const updated = logs.filter((l) => l.id !== id);
  await updateDoc(doc(db, 'users', uid), { logs: updated, updated_at: new Date().toISOString() });
  return updated;
}

// يدمج سجل الضيف المحلي (قبل ما ينشئ حساب) بسجله السحابي بعد التسجيل/الدخول
export async function migrateLocalLogsToCloud(uid) {
  const local = getLogs();
  if (!local.length) return;
  const cloud = await getUserLogs(uid);
  const existingIds = new Set(cloud.map((l) => l.id));
  const merged = [...cloud, ...local.filter((l) => !existingIds.has(l.id))];
  merged.sort((a, b) => new Date(b.date) - new Date(a.date));
  await updateDoc(doc(db, 'users', uid), { logs: merged, updated_at: new Date().toISOString() });
  clearLogs();
}
