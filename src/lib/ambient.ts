import type {
  AmbientPhase,
  AmbientPreference,
} from "@/types/ambient";

export function resolveAmbientPhase(
  preference: AmbientPreference = "auto",
  date = new Date(),
): AmbientPhase {
  if (preference !== "auto") {
    return preference;
  }

  const hour = date.getHours();

  if (hour >= 5 && hour < 11) {
    return "morning";
  }

  if (hour >= 11 && hour < 17) {
    return "day";
  }

  if (hour >= 17 && hour < 21) {
    return "evening";
  }

  return "night";
}