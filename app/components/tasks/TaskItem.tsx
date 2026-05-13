// components/tasks/TaskItem.tsx

"use client";

import { useState } from "react";
import {
  Task,
} from "@/app/context/TaskContext";

import PriorityDot from "./PriorityDot";

type Props = {
  task: Task;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, text: string) => void;
};

export default function TaskItem({
  task,
  toggleTask,
  deleteTask,
  updateTask,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.text);

  return (
    <div className="bg-[#0D0D0D] border border-white/5 p-4 rounded-[1rem] flex items-center gap-6 group transition-all hover:bg-[#111111]">
      <button
        onClick={() => toggleTask(task.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${task.completed
            ? "bg-[#2DD4BF] border-[#2DD4BF]"
            : "border-gray-800"
          }`}
      >
        {task.completed && (
          <svg
            className="w-3.5 h-3.5 text-black"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            viewBox="0 0 24 24"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0 pr-4">
        {editing ? (
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateTask(task.id, text);
                setEditing(false);
              }
            }}
            className="bg-transparent text-white w-full outline-none border-b border-[#2DD4BF]"
          />
        ) : (
          <p
            onClick={() => setEditing(true)}
            className={`text-sm lg:text-base font-bold tracking-tight truncate cursor-pointer hover:text-[#2DD4BF] transition-colors ${task.completed
                ? "text-gray-700 line-through"
                : "text-gray-200"
              }`}
          >
            {task.text}
          </p>
        )}

        <div className="flex items-center gap-2 mt-1">
          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">
            {task.category}
          </span>

          <PriorityDot priority={task.priority} />
        </div>
      </div>

      <button
        onClick={() => deleteTask(task.id)}
        className="opacity-0 group-hover:opacity-100 text-gray-800 hover:text-red-500 transition-all p-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}