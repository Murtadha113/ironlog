// تمارين وأجهزة يضيفها المستخدم بنفسه (مخصصة له) — تُحفظ على جهازه وتظهر بكل مكان
// جنب الأجهزة الجاهزة (البحث، اختيار العضلة، بناء الخطة)

const KEY = 'ironlog_custom_exercises';

export function getCustomExercises() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

export function addCustomExercise({ name, muscle, equipment, videoUrl }) {
  const list = getCustomExercises();
  const entry = {
    id: `custom_${Date.now()}`,
    name,
    name_ar: name,
    muscle,
    equipment: equipment || 'free_weight',
    custom: true,
    image_url: '',
    target_muscles: [],
    positions: [{ id: 'standard', name_ar: 'عادي', video_url: videoUrl || '' }],
  };
  list.unshift(entry);
  localStorage.setItem(KEY, JSON.stringify(list));
  return entry;
}

export function deleteCustomExercise(id) {
  const list = getCustomExercises().filter((e) => e.id !== id);
  localStorage.setItem(KEY, JSON.stringify(list));
  return list;
}
