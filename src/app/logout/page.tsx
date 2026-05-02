"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/store/auth";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    logoutUser();
    router.replace("/login");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#FDF6EC] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-4 border-[#E8D5B8] border-t-[#C17D3C] animate-spin" />
        <p className="text-sm text-[#8B6344]">Signing you out…</p>
      </div>
    </div>
  );
}
