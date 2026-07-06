export type ZephipayThemeMode = "system" | "light" | "dark" | "adaptive";

export type ZephipayDayPhase = "sunrise" | "day" | "sunset" | "night";

export function getDayPhase(date = new Date()): ZephipayDayPhase {
  const hour = date.getHours();

  if (hour >= 5 && hour < 10) return "sunrise";
  if (hour >= 10 && hour < 17) return "day";
  if (hour >= 17 && hour < 21) return "sunset";
  return "night";
}