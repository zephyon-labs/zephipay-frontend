"use client";

import { useState } from "react";
import { AppShell } from "@/components/ui/app-shell";
import { BalanceCard } from "@/components/ui/balance-card";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { HomeHeader } from "@/components/ui/home-header";
import { IdentitySheet } from "@/components/ui/identity-sheet";
import { QuickActions } from "@/components/ui/quick-actions";
import { RecentActivity } from "@/components/ui/recent-activity";
import { RuntimeStatusCard } from "@/components/ui/runtime-status-card";
import { ZpProgressCard } from "@/components/ui/zp-progress-card";
import { getProfileViewModel } from "@/view-models/profile";
import { getRuntimeViewModel } from "@/view-models/runtime";

export default function HomePage() {
  const [identityOpen, setIdentityOpen] = useState(false);

  const profile = getProfileViewModel();
  const runtime = getRuntimeViewModel();

  return (
    <AppShell>
      <section className="flex flex-1 flex-col gap-5 pb-4 pt-1">
        <HomeHeader
          name={profile.displayName}
          greeting={profile.greeting}
          onProfileClick={() => setIdentityOpen(true)}
        />

        <BalanceCard amount={profile.availableToday} />

        <RuntimeStatusCard
          name={runtime.name}
          status={runtime.status}
          updated={runtime.updated}
          engines={runtime.engines}
        />

        <ZpProgressCard
          level={profile.level}
          title={profile.levelTitle}
          points={profile.zp}
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