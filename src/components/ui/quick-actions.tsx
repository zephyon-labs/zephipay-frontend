import { MoreHorizontal, QrCode, Send, WalletCards } from "lucide-react";
import { QuickAction } from "./quick-action";

const actions = [
  { label: "Send", icon: Send },
  { label: "Request", icon: WalletCards },
  { label: "Scan", icon: QrCode },
  { label: "More", icon: MoreHorizontal },
];

export function QuickActions() {
  return (
    <section className="grid grid-cols-4 gap-3">
      {actions.map((action) => (
        <QuickAction
          key={action.label}
          label={action.label}
          icon={action.icon}
        />
      ))}
    </section>
  );
}