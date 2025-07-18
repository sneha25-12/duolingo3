"use server";
import {auth , currentUser} from "@clerk/nextjs/server";
import {getCourseById , getUserProgress} from "@/db/queries";
import db from "@/db/drizzle";
import {userProgress} from "@/db/schema";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation"

export const upsertUserProgress = async (courseId:number) => {
    const {userId} = await auth();
    const user = await currentUser();

    if(!userId || !user) {
        throw new Error("User not authenticated");
    }

    const course = await getCourseById(courseId)

    if(!course) {
        throw new Error("Course not found");
    }

    
    
    //TODO:Enable once units and lessons are added to the course
    //if(!course.units.length || !course.units[0].lessons.length) {
        //throw new Error("Course has no units or lessons");
    //}

    const existingUserProgress = await getUserProgress();

    if(existingUserProgress){
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