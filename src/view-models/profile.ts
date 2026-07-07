import { demoProfile } from "@/lib/demo-profile";

export function getProfileViewModel() {
  return {
    greeting: "Good evening,",

    displayName: demoProfile.displayName,

    title: demoProfile.title,

    initials: demoProfile.initials,

    availableToday: `$${demoProfile.availableToday.toFixed(2)}`,

    level: demoProfile.level,

    levelTitle: demoProfile.rank,

    zp: demoProfile.zp.toLocaleString(),

    zts: demoProfile.zts,

    trust: demoProfile.trust,
  };
}