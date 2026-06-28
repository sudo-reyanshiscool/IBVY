import Link from "next/link";
import { FlaskConical } from "lucide-react";
import { Wordmark } from "@/components/brand/wordmark";
import { DEMO_MODE } from "@/lib/config";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex h-16 items-center px-6">
        <Wordmark />
      </header>
      <main className="flex flex-1 items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          {DEMO_MODE && (
            <div className="mb-5 rounded-lg border border-brass/30 bg-brass-tint/40 p-4 text-sm text-[#6b5325]">
              <p className="flex items-center gap-2 font-medium">
                <FlaskConical className="size-4" /> Prototype mode
              </p>
              <p className="mt-1 text-[#6b5325]/90">
                Sign-in connects once the backend is wired. For now, explore the{" "}
                <Link href="/teacher" className="font-semibold underline">
                  teacher
                </Link>
                ,{" "}
                <Link href="/school" className="font-semibold underline">
                  school
                </Link>
                , or{" "}
                <Link href="/admin" className="font-semibold underline">
                  admin
                </Link>{" "}
                workspace directly.
              </p>
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}
