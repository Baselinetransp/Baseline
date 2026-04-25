"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardHeader() {
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="px-8 py-4 flex items-center justify-end gap-4">
        <Link href="/">
          <Button variant="ghost" className="text-primary-alt hover:text-primary-alt hover:bg-primary-alt/10">
            Back to homepage
          </Button>
        </Link>
        <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
}
