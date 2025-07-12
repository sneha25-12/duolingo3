import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle, // ✅ Import this
} from "@/components/ui/sheet";
import { Sidebar } from "@/components/sidebar";
import { Menu, X } from "lucide-react";

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="text-white w-6 h-6" />
      </SheetTrigger>

      <SheetContent side="left" className="p-0 pt-10 w-[265px] z-[60]">
        {/* ✅ Add a visually hidden title for accessibility */}
        <SheetTitle className="sr-only">Sidebar Menu</SheetTitle>

        {/* Close button */}
        <div className="flex justify-end px-4">
          
        </div>

        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
