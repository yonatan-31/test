"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Loader2, Save, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    updateProfile({ name, email });
    setSuccessMsg("Profile updated successfully");
    setIsSaving(false);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-zinc-100">Account Settings</h1>
        <p className="text-gray-500 dark:text-zinc-400 text-sm mt-1">Manage your account information and preferences.</p>
      </div>

      {/* Personal Info Card */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-zinc-800">
           <h2 className="font-semibold text-gray-900 dark:text-zinc-100 flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              Personal Information
           </h2>
        </div>
        
        <form onSubmit={handleUpdateProfile} className="p-6 space-y-4">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-700 dark:text-zinc-300">Full Name</label>
                 <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                 />
              </div>
              
              <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-700 dark:text-zinc-300">Email Address</label>
                 <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                 />
              </div>
           </div>

           <div className="pt-4 flex items-center justify-between">
              {successMsg ? (
                  <span className="text-sm text-green-600 font-medium animate-in fade-in slide-in-from-left-2">{successMsg}</span>
              ) : <span></span>}
              
              <button 
                type="submit"
                disabled={isSaving}
                className={cn(
                    "px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2",
                    isSaving && "opacity-70 cursor-not-allowed"
                )}
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Changes
              </button>
           </div>
        </form>
      </div>

       {/* Security Card */}
       <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden opacity-80">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-950/20">
             <h2 className="font-semibold text-gray-900 dark:text-zinc-100">Security</h2>
          </div>
          <div className="p-6">
             <p className="text-sm text-gray-500 mb-4">Password change is disabled in this demo.</p>
             <button disabled className="px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 text-sm font-medium text-gray-400 cursor-not-allowed">
                Change Password
             </button>
          </div>
       </div>
    </div>
  );
}
