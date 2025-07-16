// app/lesson/[lessonId]/page.tsx

import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "@/app/lesson/quiz";

type Props = {
  params: {
    lessonId: string;
  };
};

const LessonIdPage = async ({ params }: Props) => {
  const lessonId = Number(params.lessonId);

  if (isNaN(lessonId)) {
    redirect("/learn");
  }

  const [lesson, userProgress] = await Promise.all([
    getLesson(lessonId),
    getUserProgress(),
  ]);

  if (!lesson || !userProgress) {
    redirect("/learn");
  }

  const initialPercentage =
    (lesson.challenges.filter((c) => c.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={null}
    />
  );
};

export default LessonIdPage;
