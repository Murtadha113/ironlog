import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { SEED_MACHINES } from './seedMachines';
import { getCustomExercises } from './customExercises';

// طول ما إعدادات Firebase لسه ما تحطت (REPLACE_ME)، نشتغل بالبيانات المحلية
// عشان تقدر تجرب التطبيق فوراً بدون ما تنتظر ربط قاعدة البيانات
function isFirebaseConfigured() {
  return !db?.app?.options?.apiKey || db.app.options.apiKey !== 'REPLACE_ME';
}

// تمارين المستخدم المخصصة تنضم دايماً لقائمة الأجهزة — مخزنة على جهازه بس
export async function fetchMachines() {
  const custom = getCustomExercises();
  if (!isFirebaseConfigured()) return [...SEED_MACHINES, ...custom];
  try {
    const snap = await getDocs(collection(db, 'machines'));
    const base = snap.empty ? SEED_MACHINES : snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return [...base, ...custom];
  } catch (e) {
    console.warn('Firestore غير متاح، استخدمنا البيانات المحلية:', e.message);
    return [...SEED_MACHINES, ...custom];
  }
}

export async function addMachine(machine) {
  return addDoc(collection(db, 'machines'), machine);
}

export async function updateMachine(id, patch) {
  return updateDoc(doc(db, 'machines', id), patch);
}

export async function deleteMachine(id) {
  return deleteDoc(doc(db, 'machines', id));
}

// رفع صورة الجهاز اللي صوّرها المستخدم لـ Firebase Storage
export async function uploadMachinePhoto(file) {
  const path = `pending_machine_photos/${Date.now()}_${file.name || 'photo.jpg'}`;
  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, file);
  return getDownloadURL(fileRef);
}

// طلبات إضافة جهاز من المستخدمين
export async function submitPendingMachine(payload) {
  return addDoc(collection(db, 'pending_machines'), {
    ...payload,
    status: 'pending',
    created_at: serverTimestamp(),
  });
}

export async function fetchPendingMachines() {
  try {
    const snap = await getDocs(collection(db, 'pending_machines'));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.warn('تعذر جلب الطلبات:', e.message);
    return [];
  }
}

export async function updatePendingStatus(id, status) {
  return updateDoc(doc(db, 'pending_machines', id), { status });
}
