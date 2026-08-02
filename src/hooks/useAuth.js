import { useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

const GUEST_KEY = 'ironlog_guest';

export function isGuest() {
  return localStorage.getItem(GUEST_KEY) === '1';
}

export function setGuest(value) {
  if (value) localStorage.setItem(GUEST_KEY, '1');
  else localStorage.removeItem(GUEST_KEY);
}

export function useAuth() {
  const [user, setUser] = useState(undefined); // undefined = لسه يتحقق, null = مو مسجل دخول

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return unsub;
  }, []);

  async function register(name, email, password) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name) await updateProfile(cred.user, { displayName: name });
    await setDoc(doc(db, 'users', cred.user.uid), {
      name: name || '',
      email,
      logs: [],
      created_at: serverTimestamp(),
    });
    setGuest(false);
    return cred.user;
  }

  async function login(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    setGuest(false);
    return cred.user;
  }

  async function logout() {
    await signOut(auth);
    setGuest(false);
  }

  return { user, register, login, logout };
}
