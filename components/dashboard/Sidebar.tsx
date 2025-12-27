"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BookOpen, Home, LayoutDashboard, LogOut, Settings, User } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();
  
  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "My Course", href: "/dashboard/course", icon: BookOpen },
    { label: "Resources", href: "/dashboard/resources", icon:  Home }, // Placeholder icon
    { label: "Profile", href: "/profile", icon: User },
    // Settings can be secondary
  ];

  return (
    <aside
      className={cn(
        "bg-zinc-900 text-white border-r border-zinc-800 flex flex-col transition-all duration-300 ease-in-out z-20",
        isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full md:w-20 md:translate-x-0",
        "fixed md:relative h-full"
      )}
    >
      <div className="h-16 flex items-center px-6 border-b border-zinc-800 shrink-0">
        <div className={cn("font-bold text-xl tracking-tight flex items-center gap-2", !isOpen && "md:hidden")}>
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
             <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="whitespace-nowrap">CourseApp</span>
        </div>
        {/* Icon only mode logo */}
        <div className={cn("hidden", !isOpen && "md:flex w-full justify-center")}>
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
             <span className="text-white font-bold text-lg">C</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              )}
            >
              <Icon className={cn("h-5 w-5 shrink-0 transition-transform group-hover:scale-110", isActive && "text-white")} />
              <span className={cn("whitespace-nowrap transition-opacity duration-300", !isOpen && "md:hidden opacity-0 w-0")}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-800">
        <button
          onClick={logout}
          className={cn(
            "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-zinc-800 transition-all group",
          )}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          <span className={cn("whitespace-nowrap", !isOpen && "md:hidden")}>Logout</span>
        </button>
      </div>
    </aside>
  );
}
