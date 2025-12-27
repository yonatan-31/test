"use client";

import { courseData } from "@/lib/mock-data";
import { CheckCircle, Circle, Lock, Play, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const currentLesson = courseData.modules
    .flatMap(m => m.lessons)
    .find(l => l.id === courseData.currentLessonId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
      {/* Main Content Area (Video) */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-black rounded-2xl overflow-hidden aspect-video relative group shadow-2xl shadow-black/20 ring-1 ring-black/5">
            {/* Video Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 border border-zinc-800">
                <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform cursor-pointer">
                        <Play className="w-6 h-6 text-primary fill-current" />
                    </div>
                    <p className="text-zinc-500 font-medium">Video Player Placeholder</p>
                </div>
            </div>
            
            {/* Overlay Gradient (optional) */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        </div>

        <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-50">
                {currentLesson?.title || "Course Introduction"}
            </h1>
            <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">
                In this lesson, we cover the core concepts needed to understand the rest of the module. Make sure to download the resources below before proceeding.
            </p>
            
            <div className="flex gap-3 pt-4">
                <button className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
                    Mark as Complete
                </button>
                <button className="px-5 py-2.5 rounded-lg border border-gray-200 dark:border-zinc-700 font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                    Download Resources
                </button>
            </div>
        </div>
      </div>

      {/* Sidebar / Curriculum List */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50">
                <h2 className="font-semibold text-gray-900 dark:text-zinc-100">Course Content</h2>
                <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                    <span>{courseData.progress}% Complete</span>
                    <span>{courseData.modules.reduce((acc, m) => acc + m.lessons.length, 0)} Lessons</span>
                </div>
                {/* Progress Bar */}
                <div className="mt-2 h-1.5 w-full bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-green-500 rounded-full" 
                        style={{ width: `${courseData.progress}%` }} 
                    />
                </div>
            </div>

            <div className="max-h-[600px] overflow-y-auto">
                {courseData.modules.map((module, i) => (
                    <div key={module.id} className="border-b border-gray-100 dark:border-zinc-800/50 last:border-0">
                        <div className="bg-gray-50 dark:bg-zinc-950/30 px-4 py-3 text-sm font-semibold text-gray-700 dark:text-zinc-300 flex items-center justify-between sticky top-0 z-10 backdrop-blur-sm">
                            {module.title}
                        </div>
                        <div>
                            {module.lessons.map((lesson) => {
                                const isCurrent = lesson.id === courseData.currentLessonId;
                                return (
                                    <div 
                                        key={lesson.id}
                                        className={cn(
                                            "flex items-start gap-3 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer group",
                                            isCurrent && "bg-primary/5 dark:bg-primary/10 border-l-2 border-primary"
                                        )}
                                    >
                                        <div className="mt-0.5 shrink-0">
                                            {lesson.completed ? (
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                            ) : lesson.locked ? (
                                                <Lock className="h-4 w-4 text-gray-300 dark:text-zinc-600" />
                                            ) : (
                                                <PlayCircle className={cn("h-4 w-4", isCurrent ? "text-primary" : "text-gray-400")} />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={cn(
                                                "text-sm font-medium truncate",
                                                isCurrent ? "text-primary" : "text-gray-700 dark:text-zinc-300",
                                                lesson.locked && "text-gray-400 dark:text-zinc-600"
                                            )}>
                                                {lesson.title}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-0.5">{lesson.duration}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
