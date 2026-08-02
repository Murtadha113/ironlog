import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported as analyticsIsSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyDmFZK_FCY86RiMEH-2HwgNEY2xcrQ5iaY',
  authDomain: 'ironlog-d0bb2.firebaseapp.com',
  projectId: 'ironlog-d0bb2',
  storageBucket: 'ironlog-d0bb2.firebasestorage.app',
  messagingSenderId: '56837654364',
  appId: '1:56837654364:web:b43ac015ed5f7be8886399',
  measurementId: 'G-M7VJL6JLTD',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Analytics ما يشتغل إلا بالمتصفح (مو أثناء أي server-side rendering)، فنتحقق أول
analyticsIsSupported().then((supported) => {
  if (supported) getAnalytics(app);
});
