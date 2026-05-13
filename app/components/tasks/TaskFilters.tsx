// components/tasks/TaskFilters.tsx

"use client";

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
  return (
    <div className="bg-[#0D0D0D] p-1 rounded-xl w-fit flex border border-white/5">
      {["All", "Active", "Completed"].map((s) => (
        <button
          key={s}
          onClick={() => setFilter(s as any)}
          className={`px-8 py-2.5 rounded-lg text-[11px] font-black tracking-tight transition-all ${
            filter === s
              ? "bg-[#1A1A1A] text-white"
              : "text-gray-600"
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  );
}