import Link from "next/link";
import {Button} from "@/components/ui/button";
import{NotebookText} from "lucide-react";

type Props ={
    title:string;
    description:string;
}

export const UnitBanner=({title,description}:Props)=>{
    return(
        <div className="w-full rounded-xl bg-green-500 p-5 text-white flex items-center justify-between">
            <div className="space-y-2.5">
                <h3 className="text-2xl font-bold">
                    {title}
                </h3>
                <p className="text-lg">
                    {description}
                </p>
            </div>
            <Link href="/lessons">
            <Button size="lg" variant="secondary" className="hidden xl:flex border-2 border-bottom-4 active:border-bottom-2">
              <NotebookText className="mr-2"/>
              Continue
            </Button>
            </Link>
        </div>
    )
}