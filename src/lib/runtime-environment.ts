export type RuntimeEnvironment =
  | "simulation"
  | "devnet"
  | "testnet"
  | "mainnet";

const supportedEnvironments: RuntimeEnvironment[] = [
  "simulation",
  "devnet",
  "testnet",
  "mainnet",
];

function resolveRuntimeEnvironment(
  value: string | undefined,
): RuntimeEnvironment {
  if (
    value &&
    supportedEnvironments.includes(
      value as RuntimeEnvironment,
    )
  ) {
    return value as RuntimeEnvironment;
  }

  return "simulation";
}

export const runtimeEnvironment =
  resolveRuntimeEnvironment(
    process.env.NEXT_PUBLIC_ZEPHIPAY_RUNTIME_ENV,
  );

export const isSimulationMode =
  runtimeEnvironment === "simulation";
