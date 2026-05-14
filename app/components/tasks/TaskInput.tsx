"use client";

import { useState } from "react";
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
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [hasSelectedPriority, setHasSelectedPriority] = useState(false);
  const [hasSelectedCategory, setHasSelectedCategory] = useState(false);

  const priorityOptions = [
    { val: "I", label: "High" },
    { val: "II", label: "Medium" },
    { val: "III", label: "Low" },
  ];

  const categoryOptions: Category[] = ["Personal", "Work", "Shopping", "Health", "Learning"];

  const handleAddWithReset = () => {
    if (text.trim() === "") {
      onAdd();
      return;
    }
    onAdd(); 
    setHasSelectedPriority(false); 
    setHasSelectedCategory(false);
  };

  // Classi comuni per altezza e arrotondamento
  const commonStyles = "h-10 lg:h-10 h-12 rounded-lg lg:rounded-xl transition-all duration-300";

  return (
    <div className="bg-[#0A0A0A] p-5 lg:p-4 rounded-2xl lg:rounded-[1rem] border border-white/5 mb-10 relative">
      
      {(isPriorityOpen || isCategoryOpen) && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => { setIsPriorityOpen(false); setIsCategoryOpen(false); }}
        />
      )}

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-3 items-stretch lg:items-center relative z-20">

        {/* INPUT BOX */}
        <div className={`flex-1 w-full bg-[#0D0D0D] border flex items-center ${commonStyles} ${
          error ? "border-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.1)]" : "border-white/5"
        }`}>
          <input
            value={text}
            maxLength={50}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddWithReset()}
            placeholder={error ? error : "Add a new task..."}
            className={`w-full bg-transparent border-none outline-none px-6 text-[15px] font-medium ${
              error ? "placeholder:text-red-400/60 text-red-400" : "text-gray-300 placeholder:text-gray-700"
            }`}
          />
        </div>

        {/* PRIORITY DROPDOWN */}
        <div className="relative w-full lg:w-auto">
          <button
            type="button"
            onClick={() => { setIsPriorityOpen(!isPriorityOpen); setIsCategoryOpen(false); }}
            className={`flex items-center justify-between w-full lg:min-w-[130px] bg-[#111111] border text-[11px] px-4 font-bold outline-none ${commonStyles} ${
              error ? "border-red-500/20 text-red-400/50" : "border-white/10 text-gray-400 hover:border-[#2DD4BF]/50"
            }`}
          >
            <span>
              {!hasSelectedPriority ? "Priority" : priorityOptions.find(o => o.val === priority)?.label}
            </span>
            <svg className={`w-3 h-3 ml-2 transition-transform duration-200 ${isPriorityOpen ? 'rotate-180 text-[#2DD4BF]' : ''}`} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isPriorityOpen && (
            <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-[#111111] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-30 animate-in fade-in zoom-in-95 duration-150">
              {priorityOptions.map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => { 
                    setPriority(opt.val as Priority); 
                    setHasSelectedPriority(true); 
                    setIsPriorityOpen(false); 
                  }}
                  className="w-full text-left px-4 py-2.5 text-[11px] font-bold text-gray-400 hover:bg-[#2DD4BF]/10 hover:text-[#2DD4BF] transition-colors"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* CATEGORY DROPDOWN */}
        <div className="relative w-full lg:w-auto">
          <button
            type="button"
            onClick={() => { setIsCategoryOpen(!isCategoryOpen); setIsPriorityOpen(false); }}
            className={`flex items-center justify-between w-full lg:min-w-[130px] bg-[#111111] border text-[11px] px-4 font-bold outline-none ${commonStyles} ${
              error ? "border-red-500/20 text-red-400/50" : "border-white/10 text-gray-400 hover:border-[#2DD4BF]/50"
            }`}
          >
            <span>{!hasSelectedCategory ? "Category" : category}</span>
            <svg className={`w-3 h-3 ml-2 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180 text-[#2DD4BF]' : ''}`} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isCategoryOpen && (
            <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-[#111111] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-30 animate-in fade-in zoom-in-95 duration-150">
              {categoryOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { 
                    setCategory(opt); 
                    setHasSelectedCategory(true);
                    setIsCategoryOpen(false); 
                  }}
                  className="w-full text-left px-4 py-2.5 text-[11px] font-bold text-gray-400 hover:bg-[#2DD4BF]/10 hover:text-[#2DD4BF] transition-colors"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* BUTTON ADD */}
        <button
          onClick={handleAddWithReset}
          className={`w-full lg:w-auto flex items-center justify-center px-8 font-black text-sm shadow-lg ${commonStyles} ${
            error 
              ? "bg-red-500 text-white opacity-50 cursor-not-allowed" 
              : "bg-[#2DD4BF] text-black hover:scale-[1.03] active:scale-95 shadow-[#2DD4BF]/20"
          }`}
        >
          <span className="text-xl leading-none">+</span>
          <span className="ml-2 uppercase tracking-wider text-[11px]">Add</span>
        </button>
      </div>
    </div>
  );
}