"use client";

import { Category, Task } from "@/app/context/TaskContext";
import CategoryButton from "./CategoryButton";

type Props = {
  tasks: Task[];
  selectedCategory: Category | "All";
  setSelectedCategory: (
    category: Category | "All"
  ) => void;
};

export default function Sidebar({
  tasks,
  selectedCategory,
  setSelectedCategory,
}: Props) {
  const categories = [
    {
      name: "Personal",
      icon: (
        <>
          <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
          <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </>
      ),
    },
    {
      name: "Work",
      icon: (
        <>
          <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          <rect width="20" height="14" x="2" y="6" rx="2" />
        </>
      ),
    },
    {
      name: "Shopping",
      icon: (
        <>
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </>
      ),
    },
    {
      name: "Health",
      icon: (
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      ),
    },
    {
      name: "Learning",
      icon: (
        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332-.477-4.5-1.253" />
      ),
    },
  ];

  return (
    <aside className="
      w-full lg:w-80
      bg-black
      px-4 sm:px-6 lg:px-8
      py-4 lg:py-8
      border-b lg:border-b-0 lg:border-r border-white/5
      overflow-x-auto lg:overflow-visible
      shrink-0
    ">
      
      <nav className="flex lg:flex-col gap-2 lg:gap-0 w-full">
        
        <div className="hidden lg:block">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-6 px-4">
            Categories
          </p>
        </div>

        <div className="
          flex lg:flex-col
          gap-2
          lg:space-y-1
          min-w-max lg:min-w-0
          w-full
        ">
                  
          <button
            onClick={() => setSelectedCategory("All")}
            className={`
              text-left px-4 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap w-full
              ${
                selectedCategory === "All"
                  ? "bg-[#2DD4BF]/10 text-[#2DD4BF]"
                  : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]"
              }
            `}
          >
            All Categories
          </button>

          {categories.map((cat) => (
            <CategoryButton
              key={cat.name}
              name={cat.name as Category}
              icon={cat.icon}
              selected={selectedCategory === cat.name}
              count={
                tasks.filter(
                  (t) => t.category === cat.name
                ).length
              }
              onClick={() =>
                setSelectedCategory(
                  cat.name as Category
                )
              }
            />
          ))}
        </div>
      </nav>
    </aside>
  );
}