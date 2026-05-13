"use client";

import { useTasks } from "@/app/context/TaskContext";

type Props = {
  filter: "All" | "Active" | "Completed";
  setFilter: (filter: "All" | "Active" | "Completed") => void;
};

export default function TaskFilters({ filter, setFilter }: Props) {
  const { tasks } = useTasks();

  // Calcolo dei conteggi in tempo reale per ogni stato
  const counts = {
    All: tasks.length,
    Active: tasks.filter((t) => !t.completed).length,
    Completed: tasks.filter((t) => t.completed).length,
  };

  const options: ("All" | "Active" | "Completed")[] = ["All", "Active", "Completed"];

  return (
    /* Background scuro #0A0A0A e bordo sottile come da immagine */
    <div className="bg-[#111111] p-1.5 rounded-2xl w-fit flex border border-white/5 shadow-2xl">
      {options.map((s) => {
        const isActive = filter === s;
        
        return (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`
              flex items-center gap-2 px-6 py-2.5 rounded-xl text-[13px] transition-all duration-200
              ${isActive 
                ? " bg-[#0A0A0A] text-white font-bold shadow-inner" 
                : "text-gray-00 font-medium hover:text-gray-300"
              }
            `}
          >
            <span>{s}</span>
            
            <span className={`
              text-[11px] tracking-wide
              ${isActive ? "text-gray-400" : "text-gray-600"}
            `}>
              ({counts[s]})
            </span>
          </button>
        );
      })}
    </div>
  );
}