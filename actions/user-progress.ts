"use server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getCourseById, getUserProgress } from "@/db/queries";
import db from "@/db/drizzle";
import { challengeProgress, userProgress,challenges } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation"
import { eq, and } from "drizzle-orm"

export const upsertUserProgress = async (courseId: number) => {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
        throw new Error("User not authenticated");
    }

    const course = await getCourseById(courseId)

    if (!course) {
        throw new Error("Course not found");
    }



    //TODO:Enable once units and lessons are added to the course
    //if(!course.units.length || !course.units[0].lessons.length) {
    //throw new Error("Course has no units or lessons");
    //}

    const existingUserProgress = await getUserProgress();

    if (existingUserProgress) {
        await db.update(userProgress).set({
            activeCourseId: course.id,
            userName: user.firstName || "User",
            userImageSrc: user.imageUrl || "/mascot.svg",
        });
        revalidatePath("/courses");
        revalidatePath("/learn");
        redirect("/learn")

    }

    await db.insert(userProgress).values({
        userId,
        activeCourseId: course.id,
        userName: user.firstName || "User",
        userImageSrc: user.imageUrl || "/mascot.svg",
    });

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn")
};

export const reduceHearts = async (challengeId: number) => {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const currentUserProgress = await getUserProgress();
    //TOdo:user subscription

    const challenge=await db.query.challenges.findFirst({
        where:eq(challenges.id,challengeId),
    });

    if(!challenge){
        throw new Error("Challenge not found");
    }

    const lessonId=challenge.lessonId;

    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.userId, userId),
            eq(challengeProgress.challengeId, challengeId),
        ),
    });

    const isPractice = !!existingChallengeProgress;

    if (isPractice) {
        return { error: "practice" };
    }

    if (!currentUserProgress) {
        throw new Error("User progress not found");
    }

    //TODO:Handle subscription

    if (currentUserProgress.hearts === 0) {
        return { error: "hearts" };
    }

    await db.update(userProgress).set({
        hearts: Math.max(currentUserProgress.hearts - 1, 0)
    }).where(eq(userProgress.userId, userId));

    revalidatePath("/shop")
    revalidatePath("/learn");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`);
};
