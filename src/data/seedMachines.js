// هذا الشكل بالضبط هو اللي لازم تكون عليه مستندات مجموعة "machines" بفايربيس
// كل جهاز = مستند، وبداخله مصفوفة positions
// video_url لكل وضعية = فيديو يوتيوب حقيقي شغّال (مو رابط وهمي)

export const MUSCLES = [
  { id: 'chest', label: 'الصدر' },
  { id: 'back', label: 'الظهر' },
  { id: 'shoulders', label: 'الأكتاف' },
  { id: 'legs', label: 'الأرجل' },
  { id: 'biceps', label: 'الباي' },
  { id: 'triceps', label: 'التراي' },
  { id: 'forearms', label: 'السواعد' },
  { id: 'core', label: 'البطن' },
  { id: 'cardio', label: 'كارديو' },
  { id: 'functional', label: 'تمارين وظيفية' },
  { id: 'neck', label: 'الرقبة' },
];

export const SEED_MACHINES = [
  // ===== الصدر =====
  {
    id: 'chest_press',
    name: 'Chest Press Machine',
    name_ar: 'جهاز ضغط الصدر',
    muscle: 'chest',
    image_url: 'https://images.pexels.com/photos/3838937/pexels-photo-3838937.jpeg?auto=compress&cs=tinysrgb&w=640',
    target_muscles: [
      { label: 'الصدر', pct: 70 },
      { label: 'الترايسبس', pct: 20 },
      { label: 'الأكتاف', pct: 10 },
    ],
    positions: [
      { id: 'flat', name_ar: 'مسطح', video_url: 'https://www.youtube.com/watch?v=sqNwDkUU_Ps' },
      { id: 'incline', name_ar: 'مرتفع', video_url: 'https://www.youtube.com/watch?v=VesHgJR14E8' },
    ],
  },
  {
    id: 'pec_deck',
    name: 'Pec Deck',
    name_ar: 'بيك ديك',
    muscle: 'chest',
    image_url: 'https://images.pexels.com/photos/3768913/pexels-photo-3768913.jpeg?auto=compress&cs=tinysrgb&w=640',
    target_muscles: [
      { label: 'الصدر', pct: 90 },
      { label: 'الأكتاف', pct: 10 },
    ],
    positions: [{ id: 'standard', name_ar: 'عادي', video_url: 'https://www.youtube.com/shorts/g3T7LsEeDWQ' }],
  },
  {
    id: 'cable_fly',
    name: 'Cable Crossover',
    name_ar: 'كيبل فلاي',
    muscle: 'chest',
    image_url: 'https://images.pexels.com/photos/5327505/pexels-photo-5327505.jpeg?auto=compress&cs=tinysrgb&w=640',
    target_muscles: [
      { label: 'الصدر', pct: 85 },
      { label: 'الأكتاف', pct: 15 },
    ],
    positions: [
      { id: 'high_low', name_ar: 'من فوق لتحت', video_url: 'https://www.youtube.com/watch?v=JUDTGZh4rhg' },
      { id: 'low_high', name_ar: 'من تحت لفوق', video_url: 'https://www.youtube.com/watch?v=JUDTGZh4rhg' },
    ],
  },
  {
    id: 'incline_chest_press',
    name: 'Incline Chest Press Machine',
    name_ar: 'جهاز ضغط الصدر المرتفع',
    muscle: 'chest',
    image_url: 'https://images.pexels.com/photos/4047156/pexels-photo-4047156.jpeg?auto=compress&cs=tinysrgb&w=640',
    target_muscles: [
      { label: 'الصدر العلوي', pct: 65 },
      { label: 'الأكتاف', pct: 25 },
      { label: 'الترايسبس', pct: 10 },
    ],
    positions: [{ id: 'standard', name_ar: 'عادي', video_url: 'https://www.youtube.com/watch?v=VesHgJR14E8' }],
  },
  {
    id: 'assisted_dip',
    name: 'Assisted Dip Machine',
    name_ar: 'جهاز الدفع المساعد (Dips)',
    muscle: 'chest',
    image_url: 'https://images.pexels.com/photos/34043576/pexels-photo-34043576/free-photo-of-man-exercising-in-gym-on-dip-machine.jpeg?auto=compress&cs=tinysrgb&w=640',
    target_muscles: [
      { label: 'الترايسبس', pct: 45 },
      { label: 'الصدر', pct: 40 },
      { label: 'الأكتاف', pct: 15 },
    ],
    positions: [{ id: 'standard', name_ar: 'عادي', video_url: 'https://www.youtube.com/watch?v=P9CkuhCc0TE' }],
  },

  // ===== الظهر =====
  {
    id: 'lat_pulldown',
    name: 'Lat Pulldown',
    name_ar: 'سحب علوي',
    muscle: 'back',
    image_url: 'https://images.pexels.com/photos/18060085/pexels-photo-18060085/free-photo-of-man-on-the-lat-pulldown-low-row-machine-in-the-gym.jpeg?auto=compress&cs=tinysrgb&w=640',
    target_muscles: [
      { label: 'الظهر', pct: 70 },
      { label: 'البايسبس', pct: 20 },
      { label: 'الأكتاف', pct: 10 },
    ],
    positions: [
      { id: 'wide', name_ar: 'مسكة واسعة', video_url: 'https://www.youtube.com/watch?v=AOpi-p0cJkc' },
      { id: 'close', name_ar: 'مسكة ضيقة', video_url: 'https://www.youtube.com/watch?v=AOpi-p0cJkc' },
    ],
  },
  {
    id: 'seated_row',
    name: 'Seated Row',
    name_ar: 'سحب جالس',
    muscle: 'back',
    image_url: 'https://images.pexels.com/photos/4162481/pexels-photo-4162481.jpeg?auto=compress&cs=tinysrgb&w=640',
    target_muscles: [
      { label: 'الظهر', pct: 75 },
      { label: 'البايسبس', pct: 25 },
    ],
    positions: [{ id: 'standard', name_ar: 'عادي', video_url: 'https://www.youtube.com/watch?v=CsROhQ1onAg' }],
  },
  {
    id: 't_bar_row',
    name: 'T-Bar Row',
    name_ar: 'سحب تي بار',
    muscle: 'back',
    image_url: 'https://images.pexels.com/photos/6551423/pexels-photo-6551423.jpeg?auto=compress&cs=tinysrgb&w=640',
    target_muscles: [
      { label: 'الظهر', pct: 80 },
      { label: 'البايسبس', pct: 20 },
    ],
    positions: [{ id: 'standard', name_ar: 'عادي', video_url: 'https://www.youtube.com/watch?v=TyLoy3n_a10' }],
  },
  {
    id: 'assisted_pullup',
    name: 'Assisted Pull-up Machine',
    name_ar: 'جهاز العقلة المساعد',
    muscle: 'back',
    image_url: 'https://images.pexels.com/photos/10873745/pexels-photo-10873745.jpeg?auto=compress&cs=tinysrgb&w=640',
    target_muscles: [
      { label: 'الظهر', pct: 65 },
      { label: 'البايسبس', pct: 25 },
      { label: 'الأكتاف', pct: 10 },
    ],
    positions: [{ id: 'standard', name_ar: 'عادي', video_url: 'https://www.youtube.com/watch?v=gx0RWT7WbmA' }],
  },

  // ===== الأكتاف =====
  {
    id: 'shoulder_press',
    name: 'Shoulder Press Machine',
    name_ar: 'جهاز ضغط الأكتاف',
    muscle: 'shoulders',
    image_url: 'https://images.pexels.com/photos/34669288/pexels-photo-34669288/free-photo-of-man-exercising-with-shoulder-press-machine-in-gym.jpeg?auto=compress&cs=tinysrgb&w=640',
    target_muscles: [
      { label: 'الأكتاف', pct: 80 },
      { label: 'الترايسبس', pct: 20 },
    ],
    positions: [{ id: 'seated', name_ar: 'جالس', video_url: 'https://www.youtube.com/watch?v=GcY6TZxfS0k' }],
  },
  {
    id: 'lateral_raise_machine',
    name: 'Lateral Raise Machine',
    name_ar: 'جهاز الرفرفة الجانبية',
    muscle: 'shoulders',
    image_url: 'https://images.pexels.com/photos/3837388/pexels-photo-3837388.jpeg?auto=compress&cs=tinysrgb&w=640',
    target_muscles: [{ label: 'الأكتاف الجانبية', pct: 95 }, { label: 'الترابيس', pct: 5 }],
    positions: [{ id: 'standard', name_ar: 'عادي', video_url: 'https://www.youtube.com/watch?v=NNAs8jx_zJI' }],
  },

  // ===== الأرجل =====
  {
    id: 'leg_press',
    name: 'Leg Press',
    name_ar: 'دفع الأرجل',
    muscle: 'legs',
    image_url: 'https://images.pexels.com/photos/37570727/pexels-photo-37570727/free-photo-of-woman-exercising-on-leg-press-machine-in-gym.jpeg?auto=compress&cs=tinysrgb&w=640',
    target_muscles: [
      { label: 'الأرجل الأمامية', pct: 60 },
      { label: 'الأرداف', pct: 30 },
      { label: 'الأرجل الخلفية', pct: 10 },
    ],
    positions: [
      { id: 'narrow', name_ar: 'ضيق', video_url: 'https://www.youtube.com/shorts/EotSw18oR9w' },
      { id: 'wide', name_ar: 'واسع', video_url: 'https://www.youtube.com/shorts/EotSw18oR9w' },
    ],
  },
  {
    id: 'leg_extension',
    name: 'Leg Extension',
    name_ar: 'مد الأرجل',
    muscle: 'legs',
    image_url: 'https://images.pexels.com/photos/19722966/pexels-photo-19722966/free-photo-of-man-exercising-his-legs-at-the-gym.jpeg?auto=compress&cs=tinysrgb&w=640',
    target_muscles: [{ label: 'الأرجل الأمامية', pct: 100 }],
    positions: [{ id: 'standard', name_ar: 'عادي', video_url: 'https://www.youtube.com/shorts/iQ92TuvBqRo' }],
  },
  {
    id: 'leg_curl',
    name: 'Leg Curl Machine',
    name_ar: 'جهاز ثني الأرجل',
    muscle: 'legs',
    image_url: 'https://images.pexels.com/photos/13965338/pexels-photo-13965338.jpeg?auto=compress&cs=tinysrgb&w=640',
    target_muscles: [{ label: 'الأرجل الخلفية', pct: 100 }],
    positions: [{ id: 'standard', name_ar: 'عادي', video_url: 'https://www.youtube.com/watch?v=t9sTSr-JYSs' }],
  },
  {
    id: 'hip_thrust_machine',
    name: 'Hip Thrust Machine',
    name_ar: 'جهاز دفع الحوض',
    muscle: 'legs',
    image_url: 'https://images.pexels.com/photos/31028213/pexels-photo-31028213/free-photo-of-focused-woman-exercising-in-a-dark-gym-setting.jpeg?auto=compress&cs=tinysrgb&w=640',
    target_muscles: [{ label: 'الأرداف', pct: 85 }, { label: 'الأرجل الخلفية', pct: 15 }],
    positions: [{ id: 'standard', name_ar: 'عادي', video_url: 'https://www.youtube.com/shorts/e7_zkMK53AU' }],
  },
  {
    id: 'calf_raise_machine',
    name: 'Calf Raise Machine',
    name_ar: 'جهاز رفع السمانة',
    muscle: 'legs',
    image_url: 'https://images.pexels.com/photos/13965339/pexels-photo-13965339.jpeg?auto=compress&cs=tinysrgb&w=640',
    target_muscles: [{ label: 'السمانة', pct: 100 }],
    positions: [{ id: 'seated', name_ar: 'جالس', video_url: 'https://www.youtube.com/shorts/oBTzbugWbzI' }],
  },
  {
    id: 'smith_squat',
    name: 'Smith Machine Squat',
    name_ar: 'سكوات سميث ماشين',
    muscle: 'legs',
    image_url: 'https://images.pexels.com/photos/29259728/pexels-photo-29259728/free-photo-of-woman-performing-squats-in-modern-gym-setting.jpeg?auto=compress&cs=tinysrgb&w=640',
    target_muscles: [
      { label: 'الأرجل الأمامية', pct: 50 },
      { label: 'الأرداف', pct: 35 },
      { label: 'أسفل الظهر', pct: 15 },
    ],
    positions: [{ id: 'standard', name_ar: 'عادي', video_url: 'https://www.youtube.com/shorts/3PpzYOubZ5A' }],
  },

  // ===== الذراعين =====
  {
    id: 'bicep_curl',
    name: 'Bicep Curl Machine',
    name_ar: 'جهاز البايسبس',
    muscle: 'biceps',
    image_url: 'https://images.pexels.com/photos/29850900/pexels-photo-29850900/free-photo-of-muscular-man-performing-cable-bicep-curl-in-gym.jpeg?auto=compress&cs=tinysrgb&w=640',
    target_muscles: [{ label: 'البايسبس', pct: 100 }],
    positions: [{ id: 'standard', name_ar: 'عادي', video_url: 'https://www.youtube.com/shorts/XFAYzZgcbSc' }],
  },
  {
    id: 'tricep_pushdown',
    name: 'Tricep Pushdown',
    name_ar: 'ضغط الترايسبس',
    muscle: 'triceps',
    image_url: 'https://images.pexels.com/photos/6243176/pexels-photo-6243176.jpeg?auto=compress&cs=tinysrgb&w=640',
    target_muscles: [{ label: 'الترايسبس', pct: 100 }],
    positions: [
      {
        id: 'rope',
        name_ar: 'حبل',
        video_url: 'https://www.youtube.com/watch?v=-zLyUAo1gMw',
        extra_videos: [
          { type: 'mistakes', title: 'أخطاء شائعة تجنبها', url: 'https://www.youtube.com/shorts/Rc7-euA8FDI' },
        ],
      },
    ],
  },
  {
    id: 'preacher_curl',
    name: 'Preacher Curl Machine',
    name_ar: 'جهاز البايسبس المائل',
    muscle: 'biceps',
    image_url: 'https://images.pexels.com/photos/6050745/pexels-photo-6050745.png?auto=compress&cs=tinysrgb&w=640',
    target_muscles: [{ label: 'البايسبس', pct: 100 }],
    positions: [{ id: 'standard', name_ar: 'عادي', video_url: 'https://www.youtube.com/shorts/Htw-s61mOw0' }],
  },

  // ===== البطن =====
  {
    id: 'ab_crunch',
    name: 'Ab Crunch Machine',
    name_ar: 'جهاز البطن',
    muscle: 'core',
    image_url: 'https://images.pexels.com/photos/4162548/pexels-photo-4162548.jpeg?auto=compress&cs=tinysrgb&w=640',
    target_muscles: [{ label: 'البطن', pct: 100 }],
    positions: [{ id: 'standard', name_ar: 'عادي', video_url: 'https://www.youtube.com/shorts/mnRhbUB3Fjs' }],
  },
  {
    id: 'back_extension',
    name: 'Back Extension (Roman Chair)',
    name_ar: 'جهاز مد الظهر',
    muscle: 'core',
    image_url: 'https://images.pexels.com/photos/18060236/pexels-photo-18060236/free-photo-of-athletic-woman-exercising-in-the-gym.jpeg?auto=compress&cs=tinysrgb&w=640',
    target_muscles: [{ label: 'أسفل الظهر', pct: 70 }, { label: 'الأرداف', pct: 30 }],
    positions: [{ id: 'standard', name_ar: 'عادي', video_url: 'https://www.youtube.com/shorts/EKNRR9cSy9E' }],
  },
  {
    id: 'cable_woodchopper',
    name: 'Cable Woodchopper',
    name_ar: 'كيبل الخصر المائل',
    muscle: 'core',
    image_url: 'https://images.pexels.com/photos/3931303/pexels-photo-3931303.jpeg?auto=compress&cs=tinysrgb&w=640',
    target_muscles: [{ label: 'الخصر (المائلة)', pct: 80 }, { label: 'البطن', pct: 20 }],
    positions: [{ id: 'standard', name_ar: 'عادي', video_url: 'https://www.youtube.com/watch?v=pAplQXk3dkU' }],
  },

  // ===== أوزان حرة (بار وأثقال) =====
  {
    id: 'barbell_bench_press',
    name: 'Barbell Bench Press',
    name_ar: 'ضغط بنش بار',
    muscle: 'chest',
    equipment: 'free_weight',
    image_url: 'https://images.pexels.com/photos/3916762/pexels-photo-3916762.jpeg?auto=compress&cs=tinysrgb&w=640',
    target_muscles: [{ label: 'الصدر', pct: 65 }, { label: 'الترايسبس', pct: 25 }, { label: 'الأكتاف', pct: 10 }],
    positions: [{ id: 'standard', name_ar: 'عادي', video_url: 'https://www.youtube.com/watch?v=lWFknlOTbyM' }],
  },
  {
    id: 'bent_over_row',
    name: 'Bent-Over Barbell Row',
    name_ar: 'سحب بار منحني',
    muscle: 'back',
    equipment: 'free_weight',
    image_url: 'https://images.pexels.com/photos/4944006/pexels-photo-4944006.jpeg?auto=compress&cs=tinysrgb&w=640',
    target_muscles: [{ label: 'الظهر', pct: 75 }, { label: 'البايسبس', pct: 25 }],
    positions: [{ id: 'standard', name_ar: 'عادي', video_url: 'https://www.youtube.com/watch?v=FWJR5Ve8bnQ' }],
  },
  {
    id: 'deadlift',
    name: 'Deadlift',
    name_ar: 'الرفعة الميتة',
    muscle: 'back',
    equipment: 'free_weight',
    image_url: 'https://images.pexels.com/photos/36361389/pexels-photo-36361389/free-photo-of-man-preparing-for-deadlift-in-gym.jpeg?auto=compress&cs=tinysrgb&w=640',
    target_muscles: [
      { label: 'أسفل الظهر', pct: 35 },
      { label: 'الأرداف', pct: 30 },
      { label: 'الأرجل الخلفية', pct: 25 },
      { label: 'الظهر العلوي', pct: 10 },
    ],
    positions: [{ id: 'standard', name_ar: 'عادي', video_url: 'https://www.youtube.com/watch?v=XxWcirHIwVo' }],
  },
  {
    id: 'dumbbell_shoulder_press',
    name: 'Dumbbell Shoulder Press',
    name_ar: 'ضغط أكتاف دمبل',
    muscle: 'shoulders',
    equipment: 'free_weight',
    image_url: 'https://images.pexels.com/photos/7289370/pexels-photo-7289370.jpeg?auto=compress&cs=tinysrgb&w=640',
    target_muscles: [{ label: 'الأكتاف', pct: 75 }, { label: 'الترايسبس', pct: 25 }],
    positions: [{ id: 'seated', name_ar: 'جالس', video_url: 'https://www.youtube.com/watch?v=rO_iEImwHyo' }],
  },
  {
    id: 'barbell_squat',
    name: 'Barbell Back Squat',
    name_ar: 'سكوات بار حر',
    muscle: 'legs',
    equipment: 'free_weight',
    image_url: 'https://images.pexels.com/photos/28805366/pexels-photo-28805366/free-photo-of-back-view-of-man-lifting-weights-in-gym.jpeg?auto=compress&cs=tinysrgb&w=640',
    target_muscles: [{ label: 'الأرجل الأمامية', pct: 50 }, { label: 'الأرداف', pct: 35 }, { label: 'أسفل الظهر', pct: 15 }],
    positions: [{ id: 'standard', name_ar: 'عادي', video_url: 'https://www.youtube.com/watch?v=aOzrA4FgnM0' }],
  },
  {
    id: 'barbell_lunges',
    name: 'Barbell Lunges',
    name_ar: 'لنجز بار',
    muscle: 'legs',
    equipment: 'free_weight',
    image_url: 'https://images.pexels.com/photos/2105493/pexels-photo-2105493.jpeg?auto=compress&cs=tinysrgb&w=640',
    target_muscles: [{ label: 'الأرجل الأمامية', pct: 55 }, { label: 'الأرداف', pct: 45 }],
    positions: [{ id: 'standard', name_ar: 'عادي', video_url: 'https://www.youtube.com/shorts/EWBiNhxDnmQ' }],
  },
  {
    id: 'dumbbell_curl',
    name: 'Dumbbell Bicep Curl',
    name_ar: 'بايسبس دمبل',
    muscle: 'biceps',
    equipment: 'free_weight',
    image_url: 'https://images.pexels.com/photos/5132092/pexels-photo-5132092.jpeg?auto=compress&cs=tinysrgb&w=640',
    target_muscles: [{ label: 'البايسبس', pct: 100 }],
    positions: [{ id: 'standard', name_ar: 'عادي', video_url: 'https://www.youtube.com/watch?v=cBSD6mQIPQk' }],
  },
  {
    id: 'russian_twist',
    name: 'Weighted Russian Twist',
    name_ar: 'راشن تويست بثقل',
    muscle: 'core',
    equipment: 'free_weight',
    image_url: 'https://images.pexels.com/photos/5128466/pexels-photo-5128466.jpeg?auto=compress&cs=tinysrgb&w=640',
    target_muscles: [{ label: 'الخصر (المائلة)', pct: 70 }, { label: 'البطن', pct: 30 }],
    positions: [{ id: 'standard', name_ar: 'عادي', video_url: 'https://www.youtube.com/shorts/MKfv0WiTeEQ' }],
  },
];

// صور حقيقية مرخّصة (Pexels) — معاد استخدامها بمجموعات متقاربة بدل بحث مستقل
// لكل قطعة، عشان توسعة الكتالوج تكون بحجم معقول
const IMG = {
  bench: 'https://images.pexels.com/photos/18060023/pexels-photo-18060023/free-photo-of-bodybuilder-working-out-on-weight-bench.jpeg?auto=compress&cs=tinysrgb&w=640',
  dbBench: 'https://images.pexels.com/photos/29526383/pexels-photo-29526383/free-photo-of-man-lifting-dumbbells-on-an-incline-bench-in-gym.jpeg?auto=compress&cs=tinysrgb&w=640',
  cable: 'https://images.pexels.com/photos/35567434/pexels-photo-35567434/free-photo-of-close-up-of-gym-equipment-pulley-system.jpeg?auto=compress&cs=tinysrgb&w=640',
  rack: 'https://images.pexels.com/photos/19025673/pexels-photo-19025673/free-photo-of-a-gym-with-a-rack-of-weights-and-barbells.jpeg?auto=compress&cs=tinysrgb&w=640',
  dipStation: 'https://images.pexels.com/photos/34043575/pexels-photo-34043575/free-photo-of-fit-young-man-exercising-at-gym-in-accra.jpeg?auto=compress&cs=tinysrgb&w=640',
  hackSquat: 'https://images.pexels.com/photos/11191173/pexels-photo-11191173.jpeg?auto=compress&cs=tinysrgb&w=640',
  treadmill: 'https://images.pexels.com/photos/30704307/pexels-photo-30704307/free-photo-of-man-running-on-treadmill-in-gym.jpeg?auto=compress&cs=tinysrgb&w=640',
  elliptical: 'https://images.pexels.com/photos/47084/gym-exercise-fitness-workout-47084.jpeg?auto=compress&cs=tinysrgb&w=640',
  bikeUpright: 'https://images.pexels.com/photos/4162595/pexels-photo-4162595.jpeg?auto=compress&cs=tinysrgb&w=640',
  bikeRecumbent: 'https://images.pexels.com/photos/4162580/pexels-photo-4162580.jpeg?auto=compress&cs=tinysrgb&w=640',
  bikeSpin: 'https://images.pexels.com/photos/19962070/pexels-photo-19962070/free-photo-of-woman-on-bike-at-gym.jpeg?auto=compress&cs=tinysrgb&w=640',
  rowing: 'https://images.pexels.com/photos/29859465/pexels-photo-29859465/free-photo-of-indoor-fitness-competition-with-rowing-machines.jpeg?auto=compress&cs=tinysrgb&w=640',
  skiErg: 'https://images.pexels.com/photos/8611382/pexels-photo-8611382.jpeg?auto=compress&cs=tinysrgb&w=640',
  stairClimber: 'https://images.pexels.com/photos/4162585/pexels-photo-4162585.jpeg?auto=compress&cs=tinysrgb&w=640',
  assaultBike: 'https://images.pexels.com/photos/34852300/pexels-photo-34852300/free-photo-of-outdoor-fitness-training-on-assault-bike.jpeg?auto=compress&cs=tinysrgb&w=640',
  functionalTrainer: 'https://images.pexels.com/photos/35567434/pexels-photo-35567434/free-photo-of-close-up-of-gym-equipment-pulley-system.jpeg?auto=compress&cs=tinysrgb&w=640',
  trx: 'https://images.pexels.com/photos/36400008/pexels-photo-36400008/free-photo-of-woman-performing-trx-workout-outdoors.jpeg?auto=compress&cs=tinysrgb&w=640',
  kettlebell: 'https://images.pexels.com/photos/32610333/pexels-photo-32610333/free-photo-of-modern-indoor-gym-with-kettlebells-and-equipment.jpeg?auto=compress&cs=tinysrgb&w=640',
  battleRopes: 'https://images.pexels.com/photos/38615400/pexels-photo-38615400/free-photo-of-dynamic-workout-with-battle-ropes-in-gym.jpeg?auto=compress&cs=tinysrgb&w=640',
  sled: 'https://images.pexels.com/photos/36986181/pexels-photo-36986181/free-photo-of-man-pushing-weighted-sled-in-gym-setting.jpeg?auto=compress&cs=tinysrgb&w=640',
  medicineBall: 'https://images.pexels.com/photos/6455800/pexels-photo-6455800.jpeg?auto=compress&cs=tinysrgb&w=640',
  rings: 'https://images.pexels.com/photos/4164645/pexels-photo-4164645.jpeg?auto=compress&cs=tinysrgb&w=640',
  plyoBox: 'https://images.pexels.com/photos/7676548/pexels-photo-7676548.jpeg?auto=compress&cs=tinysrgb&w=640',
  landmine: 'https://images.pexels.com/photos/32830369/pexels-photo-32830369/free-photo-of-young-woman-weightlifting-in-singapore-gym.jpeg?auto=compress&cs=tinysrgb&w=640',
  neck: 'https://images.pexels.com/photos/3888405/pexels-photo-3888405.jpeg?auto=compress&cs=tinysrgb&w=640',
  grip: 'https://images.pexels.com/photos/36109143/pexels-photo-36109143/free-photo-of-hand-holding-blue-grip-strength-exercise-tool.jpeg?auto=compress&cs=tinysrgb&w=640',
  dumbbellRack: 'https://images.pexels.com/photos/19025674/pexels-photo-19025674/free-photo-of-a-row-of-dumbbells-in-a-gym.jpeg?auto=compress&cs=tinysrgb&w=640',
  plates: 'https://images.pexels.com/photos/28636776/pexels-photo-28636776/free-photo-of-gym-weight-plates-on-rack-in-fitness-center.png?auto=compress&cs=tinysrgb&w=640',
  barbell: 'https://images.pexels.com/photos/33547297/pexels-photo-33547297/free-photo-of-barbell-in-a-modern-gym-setting.jpeg?auto=compress&cs=tinysrgb&w=640',
};

// جهاز/تمرين بسيط بدون فيديو مخصص (تقدر تضيف الفيديو بعدين من لوحة الأدمن)
function quick(id, name, name_ar, muscle, image, equipment = 'machine') {
  return {
    id,
    name,
    name_ar,
    muscle,
    equipment,
    image_url: image,
    positions: [{ id: 'standard', name_ar: 'عادي' }],
  };
}

SEED_MACHINES.push(
  // ===== الصدر — إضافات =====
  quick('smith_bench_press', 'Smith Machine Bench Press', 'سميث بنش برس', 'chest', IMG.rack),
  quick('iso_lateral_chest_press', 'Iso-Lateral Chest Press', 'ضغط صدر أحادي الجانب', 'chest', IMG.bench),
  quick('decline_chest_press', 'Decline Chest Press', 'ضغط صدر منخفض', 'chest', IMG.dbBench),
  quick('flat_db_bench', 'Flat Bench (Dumbbell Press)', 'بنش مسطح دمبل', 'chest', IMG.dbBench, 'free_weight'),
  quick('incline_db_bench', 'Incline Bench (Dumbbell Press)', 'بنش مائل دمبل', 'chest', IMG.dbBench, 'free_weight'),
  quick('pullover_machine', 'Pullover Machine', 'جهاز البول أوفر', 'chest', IMG.bench),

  // ===== الظهر — إضافات =====
  quick('high_row', 'High Row', 'سحب علوي أفقي', 'back', IMG.cable),
  quick('low_row', 'Low Row', 'سحب منخفض', 'back', IMG.cable),
  quick('iso_lateral_row', 'Iso-Lateral Row', 'سحب أحادي الجانب', 'back', IMG.cable),
  quick('reverse_hyperextension', 'Reverse Hyperextension', 'هايبر معكوس', 'back', IMG.bench),
  quick('pullup_bar_fixed', 'Pull-Up Bar (Fixed)', 'بار العقلة الثابت', 'back', IMG.rack),

  // ===== الأكتاف — إضافات =====
  quick('reverse_pec_deck', 'Reverse Pec Deck', 'رفرفة خلفية للكتف', 'shoulders', IMG.cable),
  quick('cable_lateral_raise', 'Cable Lateral Raise', 'رفرفة جانبية بالكيبل', 'shoulders', IMG.cable),
  quick('front_raise_machine', 'Front Raise Machine', 'رفرفة أمامية', 'shoulders', IMG.cable),
  quick('shrug_machine', 'Shrug Machine', 'جهاز الترابيس', 'shoulders', IMG.rack),
  quick('smith_shoulder_press', 'Smith Machine Shoulder Press', 'سميث، ضغط أكتاف', 'shoulders', IMG.rack),
  quick('cable_face_pull', 'Cable Face Pull', 'فيس بول بالكيبل', 'shoulders', IMG.cable),

  // ===== الذراعين — إضافات =====
  quick('cable_bicep_curl', 'Cable Bicep Curl', 'كيرل بايسبس بالكيبل', 'biceps', IMG.cable),
  quick('overhead_tricep_ext', 'Overhead Tricep Extension', 'مد الترايسبس العلوي', 'triceps', IMG.cable),
  quick('tricep_dip_machine', 'Tricep Dip Machine', 'جهاز الدبس للترايسبس', 'triceps', IMG.dipStation),
  quick('wrist_curl_machine', 'Forearm / Wrist Curl Machine', 'جهاز الساعد', 'forearms', IMG.grip),
  quick('reverse_curl_machine', 'Reverse Curl Machine', 'كيرل معكوس', 'forearms', IMG.dbBench, 'free_weight'),
  quick('spider_curl_bench', 'Spider Curl Bench', 'بنش سبايدر كيرل', 'biceps', IMG.bench, 'free_weight'),
  quick('concentration_curl_bench', 'Concentration Curl Bench', 'بنش كونسنتريشن كيرل', 'biceps', IMG.bench, 'free_weight'),

  // ===== الأرجل — إضافات =====
  quick('hack_squat', 'Hack Squat', 'هاك سكوات', 'legs', IMG.hackSquat),
  quick('lying_leg_curl', 'Lying Leg Curl', 'ثني الأرجل مستلقي', 'legs', IMG.hackSquat),
  quick('hip_abductor', 'Hip Abductor', 'فتح الأرجل خارجي', 'legs', IMG.hackSquat),
  quick('hip_adductor', 'Hip Adductor', 'ضم الأرجل داخلي', 'legs', IMG.hackSquat),
  quick('standing_calf_raise', 'Standing Calf Raise', 'رفع السمانة واقف', 'legs', IMG.rack),
  quick('donkey_calf_raise', 'Donkey Calf Raise', 'رفع سمانة دونكي', 'legs', IMG.rack),
  quick('glute_kickback', 'Glute Kickback Machine', 'جهاز الجلوت', 'legs', IMG.cable),
  quick('belt_squat', 'Belt Squat', 'بلت سكوات', 'legs', IMG.sled),
  quick('sissy_squat', 'Sissy Squat Machine', 'سيسي سكوات', 'legs', IMG.hackSquat),
  quick('vertical_leg_press', 'Vertical Leg Press', 'دفع أرجل عمودي', 'legs', IMG.hackSquat),
  quick('ghd', 'Glute Ham Developer (GHD)', 'جي إتش دي', 'legs', IMG.hackSquat),

  // ===== البطن — إضافات =====
  quick('rotary_torso', 'Rotary Torso Machine', 'دوران الجذع', 'core', IMG.cable),
  quick('captains_chair', "Captain's Chair", 'رفع الأرجل المعلق', 'core', IMG.rack),
  quick('roman_chair_situp', 'Roman Chair', 'الكرسي الروماني', 'core', IMG.bench),
  quick('ab_coaster', 'Ab Coaster Machine', 'آب كوستر', 'core', IMG.cable),
  quick('decline_situp_bench', 'Decline Sit-Up Bench', 'بنش بطن مائل', 'core', IMG.bench),
  quick('hanging_ab_straps', 'Hanging Ab Straps', 'أحزمة البطن المعلقة', 'core', IMG.rack),

  // ===== كارديو =====
  quick('curve_treadmill', 'Curve / Manual Treadmill', 'جهاز مشي منحني', 'cardio', IMG.treadmill),
  quick('elliptical_trainer', 'Elliptical / Cross Trainer', 'إليبتيكال', 'cardio', IMG.elliptical),
  quick('arc_trainer', 'Arc Trainer', 'آرك ترينر', 'cardio', IMG.elliptical),
  quick('upright_bike', 'Upright Stationary Bike', 'دراجة ثابتة عمودية', 'cardio', IMG.bikeUpright),
  quick('recumbent_bike', 'Recumbent Bike', 'دراجة ثابتة مستلقية', 'cardio', IMG.bikeRecumbent),
  quick('recumbent_stepper', 'Recumbent Stepper', 'ستيبر مستلقي', 'cardio', IMG.bikeRecumbent),
  quick('spin_bike', 'Spin Bike', 'دراجة سبينينق', 'cardio', IMG.bikeSpin),
  quick('rowing_machine', 'Rowing Machine', 'جهاز التجديف', 'cardio', IMG.rowing),
  quick('ski_erg', 'Ski Erg', 'سكي إرق', 'cardio', IMG.skiErg),
  quick('stair_climber', 'Stair Climber / StepMill', 'جهاز السلم', 'cardio', IMG.stairClimber),
  quick('climbmill', 'ClimbMill', 'كلايم ميل', 'cardio', IMG.stairClimber),
  quick('jacobs_ladder', "Jacob's Ladder", 'سلم جاكوبز', 'cardio', IMG.stairClimber),
  quick('versaclimber', 'VersaClimber', 'فيرساكلايمر', 'cardio', IMG.stairClimber),
  quick('assault_bike', 'Assault Bike / Air Bike', 'أسولت بايك', 'cardio', IMG.assaultBike),

  // ===== تمارين وظيفية =====
  quick('functional_trainer', 'Functional Trainer (Dual Cable)', 'فنكشنال ترينر', 'functional', IMG.functionalTrainer),
  quick('smith_machine_general', 'Smith Machine (General)', 'سميث مشين', 'functional', IMG.rack),
  quick('squat_rack', 'Squat Rack', 'ستاند السكوات', 'functional', IMG.rack),
  quick('power_rack', 'Power Rack', 'باور راك', 'functional', IMG.rack),
  quick('multi_station_gym', 'Multi-Station Home Gym', 'جهاز متعدد المحطات', 'functional', IMG.functionalTrainer),
  quick('trx_trainer', 'TRX Suspension Trainer', 'تي آر إكس', 'functional', IMG.trx),
  quick('sled_push_pull', 'Sled Push/Pull', 'سلد دفع وسحب', 'functional', IMG.sled),
  quick('battle_ropes', 'Battle Ropes Station', 'حبال المعركة', 'functional', IMG.battleRopes),
  quick('plyo_box', 'Plyo Box', 'صندوق البليومترك', 'functional', IMG.plyoBox),
  quick('kettlebell_station', 'Kettlebell Station', 'محطة الكيتل بيل', 'functional', IMG.kettlebell),
  quick('smith_cable_combo', 'Smith + Cable Combo Station', 'محطة سميث وكيبل مدمجة', 'functional', IMG.functionalTrainer),
  quick('landmine_station', 'Landmine Station', 'لاند ماين', 'functional', IMG.landmine),
  quick('gymnastic_rings', 'Gymnastic Rings', 'حلقات الجمباز', 'functional', IMG.rings),
  quick('agility_ladder', 'Agility Ladder', 'سلم الرشاقة', 'functional', IMG.plyoBox),
  quick('vibration_plate', 'Vibration Plate', 'منصة الاهتزاز', 'functional', IMG.plyoBox),
  quick('medicine_ball_wall', 'Medicine Ball Wall Target', 'هدف الميديسن بول', 'functional', IMG.medicineBall),
  quick('sandbag_station', 'Sandbag Training Station', 'محطة أكياس الرمل', 'functional', IMG.medicineBall),

  // ===== الرقبة وتمارين خاصة =====
  quick('neck_machine_4way', '4-Way Neck Machine', 'جهاز الرقبة رباعي الاتجاه', 'neck', IMG.neck),
  quick('neck_harness', 'Neck Harness', 'حزام الرقبة', 'neck', IMG.neck),
  quick('wrist_roller', 'Wrist Roller', 'لفافة المعصم', 'forearms', IMG.grip),
  quick('grip_strength_trainer', 'Grip Strength Trainer', 'جهاز قوة القبضة', 'forearms', IMG.grip),
  quick('stretching_machine', 'Stretching Machine', 'جهاز الإطالة', 'neck', IMG.neck),

  // ===== أوزان حرة — إضافات =====
  quick('dumbbells_rack_set', 'Dumbbells (Rack)', 'دمبل، طقم كامل', 'biceps', IMG.dumbbellRack, 'free_weight'),
  quick('adjustable_dumbbells', 'Adjustable Dumbbells', 'دمبل قابل للتعديل', 'biceps', IMG.dumbbellRack, 'free_weight'),
  quick('olympic_barbell', 'Olympic Barbell', 'بار أولمبي', 'back', IMG.barbell, 'free_weight'),
  quick('ez_curl_bar', 'EZ Curl Bar', 'بار إي زد', 'biceps', IMG.barbell, 'free_weight'),
  quick('straight_curl_bar', 'Straight Curl Bar', 'بار مستقيم', 'biceps', IMG.barbell, 'free_weight'),
  quick('trap_bar', 'Trap Bar / Hex Bar', 'بار الترابيزيوم', 'legs', IMG.barbell, 'free_weight'),
  quick('weight_plates', 'Weight Plates', 'أوزان حديد (بلايت)', 'legs', IMG.plates, 'free_weight'),
  quick('kettlebells_freeweight', 'Kettlebells', 'كيتل بيل', 'functional', IMG.kettlebell, 'free_weight'),
  quick('fixed_weight_barbell', 'Fixed-Weight Barbell', 'بار ثابت الوزن', 'back', IMG.barbell, 'free_weight'),
  quick('flat_bench_equipment', 'Flat Bench', 'بنش مسطح', 'chest', IMG.bench, 'free_weight'),
  quick('adjustable_bench', 'Adjustable Bench (Flat/Incline/Decline)', 'بنش قابل للتعديل', 'chest', IMG.bench, 'free_weight'),
  quick('preacher_curl_bench', 'Preacher Curl Bench', 'بنش بريتشر كيرل', 'biceps', IMG.bench, 'free_weight'),
  quick('olympic_squat_rack', 'Olympic Squat Rack', 'ستاند سكوات أولمبي', 'legs', IMG.rack, 'free_weight'),
  quick('dip_station_freestanding', 'Dip Station (Free-Standing)', 'ستاند الدبس', 'chest', IMG.dipStation, 'free_weight'),
  quick('weightlifting_platform', 'Weightlifting Platform', 'منصة رفع الأثقال', 'legs', IMG.plates, 'free_weight')
);

// فيديوهات يوتيوب حقيقية (تم التحقق منها) لتمارين الدفعة اللي أضيفت أعلاه —
// معدات التخزين العامة (رفوف، أطباق أوزان، أجهزة كارديو ذاتية الشرح) ما لها فيديو، مثل باقي الكتالوج
const VIDEOS = {
  smith_bench_press: 'https://www.youtube.com/watch?v=nFAQ35hmCqU',
  iso_lateral_chest_press: 'https://www.youtube.com/watch?v=I0buksJ_CYA',
  decline_chest_press: 'https://www.youtube.com/watch?v=_DsWm45BCqg',
  flat_db_bench: 'https://www.youtube.com/watch?v=M0tN99QgPyU',
  incline_db_bench: 'https://www.youtube.com/watch?v=IP4oeKh1Sd4',
  pullover_machine: 'https://www.youtube.com/watch?v=ZOwR5Ar81rg',

  high_row: 'https://www.youtube.com/watch?v=UHrxqmzGgVg',
  low_row: 'https://www.youtube.com/watch?v=2h_OoQ9KioI',
  iso_lateral_row: 'https://www.youtube.com/watch?v=A_DadG7iYUg',
  reverse_hyperextension: 'https://www.youtube.com/watch?v=uQqR1NHfsSU',
  pullup_bar_fixed: 'https://www.youtube.com/watch?v=MhokcbRLP5w',

  reverse_pec_deck: 'https://www.youtube.com/watch?v=-TKqxK7-ehc',
  cable_lateral_raise: 'https://www.youtube.com/watch?v=qitQHqNZbeM',
  front_raise_machine: 'https://www.youtube.com/watch?v=CH9JzDStL3U',
  shrug_machine: 'https://www.youtube.com/watch?v=HdoeBEuuS1c',
  smith_shoulder_press: 'https://www.youtube.com/watch?v=kYZ0aUEzgEQ',
  cable_face_pull: 'https://www.youtube.com/watch?v=eTCBSFlCJ_s',

  cable_bicep_curl: 'https://www.youtube.com/watch?v=2MUEL4nL6hA',
  overhead_tricep_ext: 'https://www.youtube.com/watch?v=GzmlxvSFE7A',
  tricep_dip_machine: 'https://www.youtube.com/watch?v=EBnq0A5L_wo',
  wrist_curl_machine: 'https://www.youtube.com/watch?v=SqwIBiru46w',
  reverse_curl_machine: 'https://www.youtube.com/watch?v=pXx38ZWRYjo',
  spider_curl_bench: 'https://www.youtube.com/watch?v=CITtSuda0Fg',
  concentration_curl_bench: 'https://www.youtube.com/watch?v=oPGBZHIxusU',

  hack_squat: 'https://www.youtube.com/watch?v=fE5BWPy7uRc',
  lying_leg_curl: 'https://www.youtube.com/watch?v=vl5nUdE9mWM',
  hip_abductor: 'https://www.youtube.com/watch?v=OjI5OpV6IWA',
  hip_adductor: 'https://www.youtube.com/watch?v=04MfElceEow',
  standing_calf_raise: 'https://www.youtube.com/watch?v=SVtg-1loH4c',
  donkey_calf_raise: 'https://www.youtube.com/watch?v=wuI4jjPS6vg',
  glute_kickback: 'https://www.youtube.com/watch?v=WhtxQnm4254',
  belt_squat: 'https://www.youtube.com/watch?v=ZuNAnNLIpVQ',
  sissy_squat: 'https://www.youtube.com/watch?v=4Y30vn1IIe8',
  vertical_leg_press: 'https://www.youtube.com/watch?v=y0CiJW9lczg',
  ghd: 'https://www.youtube.com/watch?v=YB3KwpzaUp0',

  rotary_torso: 'https://www.youtube.com/watch?v=yurRR0UxEI0',
  captains_chair: 'https://www.youtube.com/watch?v=nBsP27-x7LU',
  roman_chair_situp: 'https://www.youtube.com/watch?v=QlCZYuOa6jg',
  ab_coaster: 'https://www.youtube.com/watch?v=oYOUn0B7jLY',
  decline_situp_bench: 'https://www.youtube.com/watch?v=QhGU5cmNZds',
  hanging_ab_straps: 'https://www.youtube.com/watch?v=5wXOq2zEgL0',

  trx_trainer: 'https://www.youtube.com/watch?v=6J1besHI9As',
  sled_push_pull: 'https://www.youtube.com/watch?v=QaTrePoCT4g',
  battle_ropes: 'https://www.youtube.com/watch?v=_nkQ9ej1CFs',
  plyo_box: 'https://www.youtube.com/watch?v=Bc_ycZFCEvQ',
  kettlebell_station: 'https://www.youtube.com/watch?v=bDCeXbMJVNs',
  landmine_station: 'https://www.youtube.com/watch?v=3gYz0bLG-wY',
  gymnastic_rings: 'https://www.youtube.com/watch?v=_HCFy_Lkh60',
  agility_ladder: 'https://www.youtube.com/watch?v=z1OhMhCZa8I',
  medicine_ball_wall: 'https://www.youtube.com/watch?v=ttK0wpULGhQ',
  sandbag_station: 'https://www.youtube.com/watch?v=a0CLBGusVL8',

  neck_machine_4way: 'https://www.youtube.com/watch?v=03uvbNQP-Do',
  neck_harness: 'https://www.youtube.com/watch?v=e0PyIvz7--U',
  wrist_roller: 'https://www.youtube.com/watch?v=gUYXMoBpT8o',
  grip_strength_trainer: 'https://www.youtube.com/watch?v=hK0pRkknQJg',

  trap_bar: 'https://www.youtube.com/watch?v=EsqwERaSTMI',
  preacher_curl_bench: 'https://www.youtube.com/shorts/Htw-s61mOw0',
  dip_station_freestanding: 'https://www.youtube.com/watch?v=nyymAfre3s0',
};

for (const machine of SEED_MACHINES) {
  const url = VIDEOS[machine.id];
  if (url && machine.positions[0]) machine.positions[0].video_url = url;
}
