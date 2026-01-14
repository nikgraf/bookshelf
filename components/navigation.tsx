"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center gap-6">
          <Link href="/" className="font-semibold text-lg">
            📚 Bookshelf
          </Link>
          <div className="flex gap-1">
            <Link
              href="/"
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === "/"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Search className="h-4 w-4" />
              Search
            </Link>
            <Link
              href="/my-books"
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === "/my-books"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <BookOpen className="h-4 w-4" />
              My Books
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
