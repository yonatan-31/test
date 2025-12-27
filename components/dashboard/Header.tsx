"use client";

import { Bell, Menu, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

interface HeaderProps {
  user: any;
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export default function Header({ user, toggleSidebar, isSidebarOpen }: HeaderProps) {
  return (
    <header className="h-16 border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-between px-6 z-10 shrink-0">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500 transition-colors md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        {/* Breadcrumb or Search placeholder */}
        <div className="hidden md:flex items-center text-sm text-gray-500">
          <div className="relative">
             <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
             <input 
                type="text" 
                placeholder="Search lessons..." 
                className="pl-9 pr-4 py-1.5 bg-gray-100 dark:bg-zinc-800 border-none rounded-full text-sm outline-none w-64 focus:ring-2 focus:ring-primary/20 transition-all"
             />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-zinc-900"></span>
        </button>
        
        <Link href="/profile" className="flex items-center gap-3 pl-2 group">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">
              {user.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Student</p>
          </div>
          <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
             <span className="font-semibold text-sm">{user.name?.[0]?.toUpperCase()}</span>
          </div>
        </Link>
      </div>
    </header>
  );
}
