"use client";

import { useTasks } from "@/app/context/TaskContext";

type Props = {
  filter: "All" | "Active" | "Completed";
  setFilter: (
    filter: "All" | "Active" | "Completed"
  ) => void;
};

export default function TaskFilters({
  filter,
  setFilter,
}: Props) {
  const { tasks } = useTasks();

  const counts = {
    All: tasks.length,
    Active: tasks.filter((t) => !t.completed)
      .length,
    Completed: tasks.filter((t) => t.completed)
      .length,
  };

  const options: (
    | "All"
    | "Active"
    | "Completed"
  )[] = ["All", "Active", "Completed"];

  return (
    <div
      className="
        bg-[#111111]
        p-1.5
        rounded-2xl
        w-full lg:w-fit
        flex
        border border-white/5
        shadow-2xl
      "
    >
      {options.map((s) => {
        const isActive = filter === s;

        return (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`
              flex-1 lg:flex-none
              flex items-center justify-center
              gap-2
              px-4 lg:px-6
              py-3 lg:py-2.5
              rounded-xl
              text-[13px]
              transition-all duration-200
              whitespace-nowrap
              ${
                isActive
                  ? "bg-[#0A0A0A] text-white font-bold shadow-inner"
                  : "text-gray-500 font-medium hover:text-gray-300"
              }
            `}
          >
            <span>{s}</span>

            <span
              className={`
                text-[11px]
                tracking-wide
                ${
                  isActive
                    ? "text-gray-400"
                    : "text-gray-600"
                }
              `}
            >
              ({counts[s]})
            </span>
          </button>
        );
      })}
    </div>
  );
}