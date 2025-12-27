export const courseData = {
  title: "Advanced React Patterns & Performance",
  description: "Master modern React by building real-world applications with advanced patterns.",
  progress: 35,
  currentLessonId: "lesson-3",
  modules: [
    {
      id: "mod-1",
      title: "Module 1: Fundamentals & Philosophy",
      lessons: [
        { id: "lesson-1", title: "Introduction to the Course", duration: "05:20", completed: true },
        { id: "lesson-2", title: "React Render Cycle", duration: "12:45", completed: true },
        { id: "lesson-3", title: "State Management Deep Dive", duration: "18:30", completed: false, locked: false },
        { id: "lesson-4", title: "Composition vs Inheritance", duration: "09:15", completed: false, locked: true },
      ]
    },
    {
      id: "mod-2",
      title: "Module 2: Advanced Hooks",
      lessons: [
        { id: "lesson-5", title: "Custom Hooks for Data Fetching", duration: "14:20", completed: false, locked: true },
        { id: "lesson-6", title: "useLayoutEffect vs useEffect", duration: "11:00", completed: false, locked: true },
        { id: "lesson-7", title: "Performance with useMemo & useCallback", duration: "22:15", completed: false, locked: true },
      ]
    },
    {
      id: "mod-3",
      title: "Module 3: Server Components",
      lessons: [
        { id: "lesson-8", title: "RSC Fundamentals", duration: "16:40", completed: false, locked: true },
        { id: "lesson-9", title: "Streaming & Suspense", duration: "13:50", completed: false, locked: true },
      ]
    }
  ]
};
