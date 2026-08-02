const PLAN_KEY = 'ironlog_plan_id';
const DAY_KEY = 'ironlog_plan_day';

export function getSelectedPlanId() {
  return localStorage.getItem(PLAN_KEY) || null;
}

export function setSelectedPlan(planId) {
  localStorage.setItem(PLAN_KEY, planId);
  localStorage.setItem(DAY_KEY, '0');
}

export function getPlanDayIndex() {
  return parseInt(localStorage.getItem(DAY_KEY) || '0', 10);
}

export function advancePlanDay(totalDays) {
  const next = (getPlanDayIndex() + 1) % totalDays;
  localStorage.setItem(DAY_KEY, String(next));
  return next;
}

export function clearPlan() {
  localStorage.removeItem(PLAN_KEY);
  localStorage.removeItem(DAY_KEY);
}
