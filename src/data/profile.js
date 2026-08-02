const HEIGHT_KEY = 'ironlog_height_cm';
const WEIGHT_KEY = 'ironlog_weight_kg';
const AGE_KEY = 'ironlog_age';
const GENDER_KEY = 'ironlog_gender';
const GOAL_KEY = 'ironlog_goal';
const ACTIVITY_KEY = 'ironlog_activity';
const ONBOARDED_KEY = 'ironlog_onboarded';

export const GOALS = [
  { id: 'bulk', label: 'تضخيم عضلي', desc: 'زيادة كتلة عضلية ووزن بشكل تدريجي', emoji: '💪' },
  { id: 'cut', label: 'تنشيف', desc: 'تقليل الدهون مع المحافظة على العضل', emoji: '🔥' },
  { id: 'burn_belly', label: 'حرق دهون الكرش', desc: 'عجز سعرات أكبر + تركيز على البطن والكارديو', emoji: '⚡' },
];

export const ACTIVITY_LEVELS = [
  { id: 'light', label: 'خفيف', desc: '1-2 تمرين بالأسبوع', factor: 1.375 },
  { id: 'moderate', label: 'متوسط', desc: '3-4 تمارين بالأسبوع', factor: 1.55 },
  { id: 'high', label: 'عالي', desc: '5+ تمارين بالأسبوع', factor: 1.725 },
];

export function getProfile() {
  return {
    height: parseFloat(localStorage.getItem(HEIGHT_KEY)) || '',
    weight: parseFloat(localStorage.getItem(WEIGHT_KEY)) || '',
    age: parseInt(localStorage.getItem(AGE_KEY), 10) || '',
    gender: localStorage.getItem(GENDER_KEY) || 'male',
    goal: localStorage.getItem(GOAL_KEY) || '',
    activity: localStorage.getItem(ACTIVITY_KEY) || 'moderate',
  };
}

export function saveProfile({ height, weight, age, gender, goal, activity }) {
  if (height) localStorage.setItem(HEIGHT_KEY, String(height));
  if (weight) localStorage.setItem(WEIGHT_KEY, String(weight));
  if (age) localStorage.setItem(AGE_KEY, String(age));
  if (gender) localStorage.setItem(GENDER_KEY, gender);
  if (goal) localStorage.setItem(GOAL_KEY, goal);
  if (activity) localStorage.setItem(ACTIVITY_KEY, activity);
}

export function isOnboarded() {
  return localStorage.getItem(ONBOARDED_KEY) === '1';
}

export function markOnboarded() {
  localStorage.setItem(ONBOARDED_KEY, '1');
}

export function computeBmi(heightCm, weightKg) {
  if (!heightCm || !weightKg) return null;
  const m = heightCm / 100;
  return Math.round((weightKg / (m * m)) * 10) / 10;
}

export function bmiCategory(bmi) {
  if (bmi == null) return null;
  if (bmi < 18.5) return { label: 'نحافة', color: 'var(--iron)' };
  if (bmi < 25) return { label: 'وزن طبيعي', color: 'var(--plate)' };
  if (bmi < 30) return { label: 'وزن زائد', color: '#FFB020' };
  return { label: 'سمنة', color: 'var(--danger)' };
}

// معادلة Mifflin-St Jeor لحساب معدل الأيض الأساسي (BMR)
export function computeBMR({ weight, height, age, gender }) {
  if (!weight || !height || !age) return null;
  const base = 10 * weight + 6.25 * height - 5 * age;
  return Math.round(gender === 'female' ? base - 161 : base + 5);
}

export function computeTDEE(bmr, activity) {
  if (!bmr) return null;
  const factor = ACTIVITY_LEVELS.find((a) => a.id === activity)?.factor || 1.55;
  return Math.round(bmr * factor);
}

// سعرات وماكروز مقترحة حسب الهدف
export function computeGoalPlan(tdee, goal, weight) {
  if (!tdee || !weight) return null;
  let calories = tdee;
  let proteinPerKg = 1.8;
  if (goal === 'bulk') {
    calories = tdee + 400;
    proteinPerKg = 1.9;
  } else if (goal === 'cut') {
    calories = tdee - 450;
    proteinPerKg = 2.2;
  } else if (goal === 'burn_belly') {
    calories = tdee - 550;
    proteinPerKg = 2.2;
  }
  calories = Math.max(Math.round(calories), 1200);
  const protein = Math.round(weight * proteinPerKg);
  const fat = Math.round((calories * 0.25) / 9);
  const carbs = Math.max(Math.round((calories - protein * 4 - fat * 9) / 4), 0);
  return { calories, protein, carbs, fat };
}

// كمية الماء المقترحة باللتر (35 مل لكل كغ + نص لتر إضافي بيوم التمرين)
export function computeWaterIntake(weight, trainedToday = true) {
  if (!weight) return null;
  const liters = (weight * 0.035) + (trainedToday ? 0.5 : 0);
  return Math.round(liters * 10) / 10;
}
