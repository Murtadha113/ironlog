import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { fetchUserDoc } from './userLogsRepo';

// تمارين المستخدم المخصصة على السحابة (Firestore) — بدون Firebase Storage،
// الصورة تنخزن كـ base64 مضغوط جوا نفس المستند

export async function getUserCustomExercises(uid) {
  try {
    const data = await fetchUserDoc(uid);
    return data?.custom_exercises || [];
  } catch (e) {
    console.warn('تعذر جلب التمارين المخصصة من Firestore:', e.message);
    return [];
  }
}

export async function addUserCustomExercise(uid, entry) {
  const list = await getUserCustomExercises(uid);
  const updated = [entry, ...list];
  await updateDoc(doc(db, 'users', uid), { custom_exercises: updated, updated_at: new Date().toISOString() });
  return entry;
}

export async function deleteUserCustomExercise(uid, id) {
  const list = await getUserCustomExercises(uid);
  const updated = list.filter((e) => e.id !== id);
  await updateDoc(doc(db, 'users', uid), { custom_exercises: updated, updated_at: new Date().toISOString() });
  return updated;
}
