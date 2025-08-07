"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminStore } from "@/lib/store/admin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { checkAuth } = useAdminStore();

  useEffect(() => {
    if (!checkAuth()) {
      router.push("/admin/login");
    }
  }, [checkAuth, router]);

  return <>{children}</>;
}