export const STORAGE_KEY = 'pocketplan.budget.v1';
export const emptyBudget = () => ({ income: [], expenses: [], goal: { name: 'My next big thing', target: 0, saved: 0, months: 12 } });
export function calculate(budget) {
  const income = budget.income.reduce((sum, item) => sum + Math.round(item.amount * 100), 0) / 100;
  const expenses = budget.expenses.reduce((sum, item) => sum + Math.round(item.amount * 100), 0) / 100;
  const surplus = (Math.round(income * 100) - Math.round(expenses * 100)) / 100;
  const remaining = Math.max(0, Math.round(budget.goal.target * 100) - Math.round(budget.goal.saved * 100)) / 100;
  const monthly = Math.ceil(Math.round(remaining * 100) / budget.goal.months) / 100;
  return { income, expenses, surplus, remaining, monthly, gap: Math.max(0, Math.round(monthly * 100) - Math.round(surplus * 100)) / 100, progress: budget.goal.target > 0 ? Math.min(100, budget.goal.saved / budget.goal.target * 100) : 0, monthsNeeded: surplus > 0 ? Math.ceil(remaining / surplus) : null };
}
export function validBudget(value) {
  const items = list => Array.isArray(list) && list.every(i => typeof i.id === 'string' && typeof i.name === 'string' && Number.isFinite(i.amount) && i.amount > 0 && i.amount <= 1e10);
  const g = value?.goal;
  return !!value && items(value.income) && items(value.expenses) && !!g && typeof g.name === 'string' && Number.isFinite(g.target) && g.target >= 0 && Number.isFinite(g.saved) && g.saved >= 0 && Number.isInteger(g.months) && g.months >= 1 && g.months <= 600;
}
export function loadBudget(storage) {
  try { const raw = storage.getItem(STORAGE_KEY); if (!raw) return { budget: emptyBudget() }; const data = JSON.parse(raw); if (!validBudget(data)) throw new Error(); return { budget: data }; }
  catch { return { budget: emptyBudget(), error: 'Your saved budget could not be loaded. Export or check your browser storage before saving a new budget.' }; }
}
