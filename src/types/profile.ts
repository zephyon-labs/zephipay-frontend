export type Profile = {
  displayName: string;
  title: string;

  initials: string;

  availableToday: number;

  level: number;

  rank: string;

  zp: number;

  zts: number;

  trust: "Excellent" | "Strong" | "Good";
};