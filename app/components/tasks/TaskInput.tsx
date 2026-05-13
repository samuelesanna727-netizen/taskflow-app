"use client";

import { Priority, Category } from "@/app/context/TaskContext";

type Props = {
  text: string;
  setText: (text: string) => void;

  priority: Priority;
  setPriority: (p: Priority) => void;

  category: Category;
  setCategory: (c: Category) => void;

  onAdd: () => void;

  error?: string | null;
};

export default function TaskInput({
  text,
  setText,
  priority,
  setPriority,
  category,
  setCategory,
  onAdd,
  error,
}: Props) {
  return (
    <div className="bg-[#0A0A0A] p-4 rounded-[1.5rem] border border-white/5 mb-10">

      {/* ERROR */}
      {error && (
        <div className="mb-3 bg-red-500/10 border border-red-500 text-red-400 text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg">
          {error}
        </div>
      )}

      {/* INPUT BOX */}
      <div className={`bg-[#0D0D0D] p-2 rounded-[1.2rem] flex flex-col lg:flex-row gap-3 items-center border transition-all duration-200 ${error ? "border-red-500" : "border-white/5"
        }`}>

        {/* INPUT */}
        <div className="relative flex-1 w-full">
          <input
            value={text}
            maxLength={50}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onAdd()}
            placeholder="Add a new task..."
            className="w-full bg-transparent border-none outline-none px-6 py-2 text-sm text-gray-300 placeholder:text-gray-700 font-medium"
          />

          {text.length > 40 && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-mono text-gray-600">
              {text.length}/50
            </span>
          )}
        </div>

        {/* PRIORITY */}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="bg-black border border-white/5 hover:border-[#2DD4BF]/50 text-[11px] px-4 py-2.5 rounded-xl text-gray-400 font-bold outline-none"
        >
          <option value="I">High</option>
          <option value="II">Medium</option>
          <option value="III">Low</option>
        </select>

        {/* CATEGORY */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="bg-black border border-white/5 hover:border-[#2DD4BF]/50 text-[11px] px-4 py-2.5 rounded-xl text-gray-400 font-bold outline-none"
        >
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Shopping">Shopping</option>
          <option value="Health">Health</option>
          <option value="Learning">Learning</option>
        </select>

        {/* BUTTON */}
        <button
          onClick={onAdd}
          className="bg-[#2DD4BF] text-black px-6 py-2.5 rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-95 transition"
        >
          <span className="text-xl leading-none">+</span>
          <span className="ml-2">Add</span>
        </button>
      </div>
    </div>
  );
}