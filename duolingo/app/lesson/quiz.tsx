"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { useState } from "react";
import { Header } from "@/app/lesson/header";

type Props = {
  initialPercentage: number;
  initialHearts: number;
  initialLessonId: number;
  initialLessonChallenges: (
    typeof challenges.$inferSelect & {
      completed: boolean;
      challengeOptions: typeof challengeOptions.$inferSelect[];
    }
  )[];
  userSubscription: any;
};

export const Quiz = ({
  initialPercentage,
  initialHearts,
  initialLessonId,
  initialLessonChallenges,
  userSubscription,
}: Props) => {
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(() => initialPercentage || 50);

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
      
      <main className="flex-1 px-6 py-4">
        {/* Render quiz challenges here */}
      </main>
    </div>
  );
};
