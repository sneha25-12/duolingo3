// app/lesson/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import { Nunito } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ExitModal } from "@/components/modals/exit-modal";

const font = Nunito({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function LessonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <div className={`${font.variable} font-sans antialiased`}>
        <Toaster />
        <ExitModal />
        {children}
      </div>
    </ClerkProvider>
  );
}
