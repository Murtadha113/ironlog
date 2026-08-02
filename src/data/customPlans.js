const KEY = 'ironlog_custom_plans';

export function getCustomPlans() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

export function getCustomPlan(id) {
  return getCustomPlans().find((p) => p.id === id) || null;
}

export function saveCustomPlan({ id, name, days }) {
  const list = getCustomPlans();
  const planId = id || `custom_plan_${Date.now()}`;
  const plan = { id: planId, name, days, custom: true };
  const idx = list.findIndex((p) => p.id === planId);
  if (idx >= 0) list[idx] = plan;
  else list.unshift(plan);
  localStorage.setItem(KEY, JSON.stringify(list));
  return plan;
}

export function deleteCustomPlan(id) {
  const list = getCustomPlans().filter((p) => p.id !== id);
  localStorage.setItem(KEY, JSON.stringify(list));
  return list;
}
