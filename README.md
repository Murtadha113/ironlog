# IronLog

تطبيق ويب (PWA-ready) لتسجيل أوزان التمارين — يشتغل فوراً ببيانات محلية تجريبية،
وجاهز يتربط بـ Firebase (Firestore + Auth) بمجرد ما تحط إعداداتك.

## تشغيل المشروع محلياً

```bash
npm install
npm run dev
```

يفتح على `http://localhost:5173`. التطبيق يشتغل مباشرة ببيانات تجريبية محلية
(11 جهاز جاهزين بـ `src/data/seedMachines.js`) — ما تحتاج Firebase عشان تجربه أول مرة.

## لوحة الإدارة

اذهب لـ `/admin/login` — بس هذي الشاشة ما راح تشتغل إلا بعد ما تربط Firebase
(لأنها تحتاج Firebase Authentication).

## ربط Firebase

✅ إعدادات مشروعك (`ironlog-d0bb2`) متحطوطة بالفعل بـ `src/firebase.js`.

باقي عليك خطوتين بس من Firebase Console:

1. فعّل **Firestore Database** من القائمة الجانبية (Build → Firestore Database →
   Create database). اختر أقرب موقع سيرفر (مثلاً `eur3` أوروبا، أقرب للبحرين
   من أمريكا)
2. فعّل **Authentication** → Sign-in method → فعّل Email/Password، ثم من تبويب
   "Users" أنشئ حساب أدمن واحد يدوياً (إيميل وكلمة مرور) — هذا الحساب هو اللي
   بتسجل فيه دخول للوحة `/admin`
3. انسخ محتوى `firestore.rules` بمشروعك (Firestore Database → Rules) وانشرها

> `firestore.rules` مربوطة الحين بحساب الأدمن اللي عندك (`uid: lKQsNOFAKChWucEl4h1q4NaUFoX2`)
> فقط — يعني حتى لو حد ثاني سوّى حساب Email/Password بمشروعك، ما يقدر يعدّل
> الأجهزة أو الطلبات إلا هذا الحساب بالذات. لو تبي تضيف أدمن ثاني لاحقاً، ضيف
> شرط `|| request.auth.uid == '...'` جنب السطر بـ `isAdmin()`.

بمجرد ما تسوي هالخطوتين، التطبيق يشتغل تلقائياً على قاعدة بياناتك الحقيقية —
جرب تضيف جهاز من `/admin/machines` وبيظهر فوراً بتطبيق المستخدم.

بمجرد ما تحط الإعدادات الصحيحة، التطبيق يتحول تلقائياً لقراءة/كتابة من Firestore
بدل البيانات المحلية — ما تحتاج تغيّر أي كود ثاني (شوف `src/data/machinesRepo.js`).

## هيكلة قاعدة البيانات (Firestore Collections)

### `machines`
```js
{
  name: "Chest Press Machine",
  name_ar: "جهاز ضغط الصدر",
  muscle: "chest", // chest | back | shoulders | legs | arms | core
  positions: [
    { id: "flat", name_ar: "مسطح", video_url: "https://youtube.com/..." }
  ]
}
```

### `pending_machines` (طلبات المستخدمين لإضافة جهاز)
```js
{
  muscle: "chest",
  company: "Technogym",
  description: "...",
  status: "pending", // pending | approved | rejected
  created_at: <timestamp>
}
```

### `users` (بعد ما يربط المستخدم رقم جواله من شاشة "احفظ سجلي")
```js
{
  phone: "+973...",
  logs: [ { machineId, positionId, weight, reps, sets, date, ... } ],
  updated_at: "..."
}
```

> ملاحظة أمان: `users` حالياً مفتوحة بدون توثيق حقيقي لرقم الجوال (أي حد يعرف
> الرقم يقدر يشوف السجل). هذا مقبول للـ MVP، بس قبل الإطلاق الفعلي لازم نبدّلها
> بـ Firebase Phone Auth (OTP) عشان نتحقق فعلاً إن الرقم يخص صاحبه.

## بنية المشروع

```
src/
  firebase.js              إعدادات Firebase (عدّلها أول شي)
  App.jsx                  التوجيه (Routes) — تطبيق المستخدم + لوحة الأدمن
  data/
    seedMachines.js         بيانات تجريبية (نفس شكل مستندات Firestore)
    machinesRepo.js         طبقة القراءة/الكتابة (Firestore أو محلي تلقائياً)
    localData.js             تخزين محلي لسجل المستخدم قبل ربط رقمه
  pages/
    Home.jsx                 الشاشة الرئيسية (جديد/عائد)
    MuscleSelect.jsx          اختيار العضلة
    MachineSelect.jsx         اختيار الجهاز
    LogSession.jsx            تسجيل الجلسة + الاقتراح الذكي
    AddMachineRequest.jsx      "جهازي مو موجود"
    Notebook.jsx               دفتر السجل الكامل
    Connect.jsx                 ربط رقم الجوال (بعد 3 جلسات)
    admin/
      AdminLogin.jsx, AdminLayout.jsx, AdminMachines.jsx, AdminPending.jsx
  hooks/useAdminAuth.js      حالة تسجيل دخول الأدمن
```

## اللي يشتغل الحين (بدون Firebase)
- تسجيل تمرين كامل (اختيار عضلة → جهاز → وزن/تكرار → حفظ) — يُخزّن بالمتصفح
- اقتراح الوزن القادم بناءً على آخر جلسة (+2.5 كغ تلقائياً)
- دفتر يعرض كل السجل
- طلب "جهازي مو موجود" — ما يتخزن فعلياً بدون Firebase (بيرمي خطأ واضح)

## اللي يحتاج Firebase عشان يشتغل
- لوحة الإدارة كاملة (تسجيل الدخول، إضافة/تعديل/حذف الأجهزة، مراجعة الطلبات)
- حفظ طلبات "جهازي مو موجود" فعلياً
- ربط رقم الجوال وحفظ السجل بشكل دائم بالسحابة

## الخطوة الجاية المقترحة
لما ترسل لي بيانات Firebase الحقيقية، أعبّي `machines` بقاعدة بياناتك من نفس
شكل `seedMachines.js`، وأتأكد كل الشاشات تسحب من Firestore صح.
