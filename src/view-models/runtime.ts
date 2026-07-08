export function getRuntimeViewModel() {
  return {
    name: "Zephyon Runtime",

    status: "Operational",

    updated: "Just now",

    engines: [
      {
        name: "Identity",
        state: "Verified",
        healthy: true,
      },
      {
        name: "Compliance",
        state: "Cleared",
        healthy: true,
      },
      {
        name: "Risk",
        state: "Low",
        healthy: true,
      },
      {
        name: "Policy",
        state: "Approved",
        healthy: true,
      },
      {
        name: "Settlement",
        state: "Awaiting Payment",
        healthy: true,
      },
      {
        name: "Telemetry",
        state: "Active",
        healthy: true,
      },
    ],
  };
}