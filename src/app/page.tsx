"use client";

import { useState } from "react";
import { AppShell } from "@/components/ui/app-shell";
import { BalanceCard } from "@/components/ui/balance-card";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { HomeHeader } from "@/components/ui/home-header";
import { IdentitySheet } from "@/components/ui/identity-sheet";
import { QuickActions } from "@/components/ui/quick-actions";
import { RecentActivity } from "@/components/ui/recent-activity";
import { ZpProgressCard } from "@/components/ui/zp-progress-card";

export default function HomePage() {
  const [identityOpen, setIdentityOpen] = useState(false);

  return (
    <AppShell>
      <section className="flex flex-1 flex-col gap-5 pb-4 pt-1">
        <HomeHeader name="Zephdek" onProfileClick={() => setIdentityOpen(true)} />

        <BalanceCard amount="$482.14" />

        <ZpProgressCard
          level={18}
          title="Builder"
          points="4,260"
          progress={72}
          nextLevelText="145 until Level 19"
        />

        <QuickActions />

        <RecentActivity />

        <BottomNavigation />
      </section>

      <IdentitySheet
        open={identityOpen}
        onClose={() => setIdentityOpen(false)}
      />
    </AppShell>
  );
}