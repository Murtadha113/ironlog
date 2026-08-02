import { useCallback, useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { getCustomExercises, addCustomExercise as addLocal, mergeCustomExercises, deleteCustomExercise as deleteLocal } from '../data/customExercises';
import { getUserCustomExercises, addUserCustomExercise, deleteUserCustomExercise } from '../data/userCustomExercisesRepo';

// طبقة موحّدة للتمارين المخصصة — محلي للضيف، ومزامنة مع Firestore للمسجّلين
// (بدون Firebase Storage — الصورة base64 مضغوطة داخل نفس المستند)
export function useCustomExercises() {
  const { user } = useAuth();
  const authed = !!user;
  const [customExercises, setCustomExercises] = useState(getCustomExercises());

  const reload = useCallback(async () => {
    if (authed) {
      const cloud = await getUserCustomExercises(user.uid);
      setCustomExercises(mergeCustomExercises(cloud));
    } else {
      setCustomExercises(getCustomExercises());
    }
  }, [authed, user]);

  useEffect(() => {
    if (user !== undefined) reload();
  }, [reload, user]);

  async function addCustomExercise(payload) {
    const entry = addLocal(payload);
    setCustomExercises(getCustomExercises());
    if (authed) {
      await addUserCustomExercise(user.uid, entry).catch((e) => console.warn('تعذرت مزامنة التمرين المخصص:', e.message));
    }
    return entry;
  }

  async function deleteCustomExercise(id) {
    setCustomExercises(deleteLocal(id));
    if (authed) {
      await deleteUserCustomExercise(user.uid, id).catch((e) => console.warn('تعذر حذف التمرين المخصص من السحابة:', e.message));
    }
  }

  return { customExercises, addCustomExercise, deleteCustomExercise, reload };
}
