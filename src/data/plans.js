import { getCustomPlan } from './customPlans';

// تمرين جاهز بخطة — sets/reps/rest افتراضية معقولة، المستخدم يقدر يعدلها بعدين
function ex(machineId, { sets = 3, reps = 10, rest = 60, notes = '' } = {}) {
  return { machineId, weight: '', sets, reps, rest, notes };
}

export const PLANS = [
  {
    id: 'full_body_3',
    name: 'فل بودي',
    desc: '3 أيام بالأسبوع — كل الجسم كل مرة',
    days: [
      {
        label: 'يوم 1',
        muscles: ['chest', 'back', 'legs'],
        exercises: [
          ex('barbell_bench_press', { sets: 4, reps: 8, rest: 120 }),
          ex('cable_fly', { reps: 12 }),
          ex('lat_pulldown', { sets: 4, reps: 10, rest: 90 }),
          ex('seated_row', { reps: 12 }),
          ex('barbell_squat', { sets: 4, reps: 8, rest: 120 }),
          ex('leg_press', { reps: 12 }),
        ],
      },
      {
        label: 'يوم 2',
        muscles: ['shoulders', 'biceps', 'triceps', 'core'],
        exercises: [
          ex('shoulder_press', { sets: 4, reps: 10, rest: 90 }),
          ex('lateral_raise_machine', { reps: 15, rest: 45 }),
          ex('bicep_curl', { reps: 12 }),
          ex('tricep_pushdown', { reps: 12 }),
          ex('ab_crunch', { reps: 15, rest: 45 }),
        ],
      },
      {
        label: 'يوم 3',
        muscles: ['chest', 'back', 'legs'],
        exercises: [
          ex('incline_db_bench', { sets: 4, reps: 10, rest: 90 }),
          ex('pec_deck', { reps: 12 }),
          ex('t_bar_row', { sets: 4, reps: 10, rest: 90 }),
          ex('deadlift', { sets: 3, reps: 6, rest: 150, notes: 'شكل الظهر أهم من الوزن' }),
          ex('leg_curl', { reps: 12 }),
          ex('calf_raise_machine', { reps: 15, rest: 45 }),
        ],
      },
    ],
  },
  {
    id: 'upper_lower',
    name: 'أعلى / أسفل',
    desc: '4 أيام بالأسبوع — تقسيم علوي وسفلي',
    days: [
      {
        label: 'علوي 1',
        muscles: ['chest', 'back', 'shoulders', 'biceps', 'triceps'],
        exercises: [
          ex('barbell_bench_press', { sets: 4, reps: 8, rest: 120 }),
          ex('lat_pulldown', { sets: 4, reps: 10, rest: 90 }),
          ex('shoulder_press', { reps: 10, rest: 90 }),
          ex('bicep_curl', { reps: 12 }),
          ex('tricep_pushdown', { reps: 12 }),
        ],
      },
      {
        label: 'سفلي 1',
        muscles: ['legs', 'core'],
        exercises: [
          ex('barbell_squat', { sets: 4, reps: 8, rest: 120 }),
          ex('leg_curl', { reps: 12 }),
          ex('calf_raise_machine', { reps: 15, rest: 45 }),
        ],
      },
      {
        label: 'علوي 2',
        muscles: ['chest', 'back', 'shoulders', 'biceps', 'triceps'],
        exercises: [
          ex('incline_db_bench', { sets: 4, reps: 10, rest: 90 }),
          ex('seated_row', { sets: 4, reps: 10, rest: 90 }),
          ex('dumbbell_shoulder_press', { reps: 10, rest: 90 }),
          ex('dumbbell_curl', { reps: 12 }),
          ex('overhead_tricep_ext', { reps: 12 }),
        ],
      },
      {
        label: 'سفلي 2',
        muscles: ['legs', 'core'],
        exercises: [
          ex('leg_press', { sets: 4, reps: 10, rest: 90 }),
          ex('hip_thrust_machine', { reps: 12 }),
          ex('standing_calf_raise', { reps: 15, rest: 45 }),
        ],
      },
    ],
  },
  {
    id: 'ppl',
    name: 'دفع / سحب / أرجل',
    desc: '3 أيام متكررة — Push Pull Legs',
    days: [
      {
        label: 'دفع',
        muscles: ['chest', 'shoulders', 'triceps'],
        exercises: [
          ex('barbell_bench_press', { sets: 4, reps: 8, rest: 120 }),
          ex('incline_db_bench', { reps: 10, rest: 90 }),
          ex('shoulder_press', { reps: 10, rest: 90 }),
          ex('tricep_pushdown', { reps: 12 }),
        ],
      },
      {
        label: 'سحب',
        muscles: ['back', 'biceps'],
        exercises: [
          ex('deadlift', { sets: 3, reps: 6, rest: 150, notes: 'شكل الظهر أهم من الوزن' }),
          ex('lat_pulldown', { sets: 4, reps: 10, rest: 90 }),
          ex('seated_row', { reps: 12 }),
          ex('bicep_curl', { reps: 12 }),
        ],
      },
      {
        label: 'أرجل',
        muscles: ['legs', 'core'],
        exercises: [
          ex('barbell_squat', { sets: 4, reps: 8, rest: 120 }),
          ex('leg_press', { reps: 12 }),
          ex('leg_curl', { reps: 12 }),
          ex('calf_raise_machine', { reps: 15, rest: 45 }),
        ],
      },
    ],
  },
  {
    id: 'bro_split',
    name: 'يوم لكل عضلة',
    desc: '5 أيام — تركيز كامل على عضلة وحدة',
    days: [
      {
        label: 'الصدر',
        muscles: ['chest'],
        exercises: [
          ex('barbell_bench_press', { sets: 4, reps: 8, rest: 120 }),
          ex('incline_db_bench', { reps: 10, rest: 90 }),
          ex('cable_fly', { reps: 12 }),
          ex('pec_deck', { reps: 15, rest: 45 }),
          ex('assisted_dip', { reps: 10, rest: 90 }),
        ],
      },
      {
        label: 'الظهر',
        muscles: ['back'],
        exercises: [
          ex('deadlift', { sets: 3, reps: 6, rest: 150, notes: 'شكل الظهر أهم من الوزن' }),
          ex('lat_pulldown', { sets: 4, reps: 10, rest: 90 }),
          ex('t_bar_row', { reps: 10, rest: 90 }),
          ex('seated_row', { reps: 12 }),
        ],
      },
      {
        label: 'الأكتاف',
        muscles: ['shoulders'],
        exercises: [
          ex('shoulder_press', { sets: 4, reps: 10, rest: 90 }),
          ex('lateral_raise_machine', { reps: 15, rest: 45 }),
          ex('cable_face_pull', { reps: 15, rest: 45 }),
          ex('dumbbell_shoulder_press', { reps: 10, rest: 90 }),
        ],
      },
      {
        label: 'الأرجل',
        muscles: ['legs'],
        exercises: [
          ex('barbell_squat', { sets: 4, reps: 8, rest: 120 }),
          ex('leg_press', { reps: 12 }),
          ex('leg_curl', { reps: 12 }),
          ex('leg_extension', { reps: 15, rest: 45 }),
          ex('calf_raise_machine', { reps: 15, rest: 45 }),
        ],
      },
      {
        label: 'الذراعين والبطن',
        muscles: ['biceps', 'triceps', 'forearms', 'core'],
        exercises: [
          ex('bicep_curl', { reps: 12 }),
          ex('tricep_pushdown', { reps: 12 }),
          ex('dumbbell_curl', { reps: 12 }),
          ex('ab_crunch', { reps: 15, rest: 45 }),
        ],
      },
    ],
  },
];

export function getPlan(id) {
  return PLANS.find((p) => p.id === id) || getCustomPlan(id);
}
