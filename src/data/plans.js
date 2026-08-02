import { getCustomPlan } from './customPlans';

export const PLANS = [
  {
    id: 'full_body_3',
    name: 'فل بودي',
    desc: '3 أيام بالأسبوع — كل الجسم كل مرة',
    days: [
      { label: 'يوم 1', muscles: ['chest', 'back', 'legs'] },
      { label: 'يوم 2', muscles: ['shoulders', 'biceps', 'triceps', 'core'] },
      { label: 'يوم 3', muscles: ['chest', 'back', 'legs'] },
    ],
  },
  {
    id: 'upper_lower',
    name: 'أعلى / أسفل',
    desc: '4 أيام بالأسبوع — تقسيم علوي وسفلي',
    days: [
      { label: 'علوي 1', muscles: ['chest', 'back', 'shoulders', 'biceps', 'triceps'] },
      { label: 'سفلي 1', muscles: ['legs', 'core'] },
      { label: 'علوي 2', muscles: ['chest', 'back', 'shoulders', 'biceps', 'triceps'] },
      { label: 'سفلي 2', muscles: ['legs', 'core'] },
    ],
  },
  {
    id: 'ppl',
    name: 'دفع / سحب / أرجل',
    desc: '3 أيام متكررة — Push Pull Legs',
    days: [
      { label: 'دفع', muscles: ['chest', 'shoulders', 'triceps'] },
      { label: 'سحب', muscles: ['back', 'biceps'] },
      { label: 'أرجل', muscles: ['legs', 'core'] },
    ],
  },
  {
    id: 'bro_split',
    name: 'يوم لكل عضلة',
    desc: '5 أيام — تركيز كامل على عضلة وحدة',
    days: [
      { label: 'الصدر', muscles: ['chest'] },
      { label: 'الظهر', muscles: ['back'] },
      { label: 'الأكتاف', muscles: ['shoulders'] },
      { label: 'الأرجل', muscles: ['legs'] },
      { label: 'الذراعين والبطن', muscles: ['biceps', 'triceps', 'forearms', 'core'] },
    ],
  },
];

export function getPlan(id) {
  return PLANS.find((p) => p.id === id) || getCustomPlan(id);
}
