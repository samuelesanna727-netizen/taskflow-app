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
  const [editError, setEditError] = useState(false);

  const handleSave = () => {
    if (text.trim() === "") {
      setEditError(true);
      return;
    }
    updateTask(task.id, text.trim());
    setEditing(false);
    setEditError(false);
  };

  const handleCancel = () => {
    setText(task.text);
    setEditing(false);
    setEditError(false);
  };

  return (
    <div className="bg-[#0D0D0D] border border-white/5 p-4 rounded-[1rem] flex items-center gap-6 group transition-all hover:bg-[#111111]">
      <button
        onClick={() => toggleTask(task.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${task.completed
            ? "bg-[#2DD4BF] border-[#2DD4BF]"
            : "border-gray-800"
          }`}
      >
        {task.completed && (
          <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        {editing ? (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <input
                autoFocus
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  if (e.target.value.trim() !== "") setEditError(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSave();
                  if (e.key === "Escape") handleCancel();
                }}
                className={`bg-transparent text-white w-full outline-none border-b py-0.5 font-bold tracking-tight transition-colors ${
                  editError ? "border-red-500" : "border-[#2DD4BF]"
                }`}
              />
              
              <button
                onClick={handleSave}
                className={`p-1.5 rounded-lg transition-colors ${
                  text.trim() === "" ? "text-gray-700 " : "text-[#2DD4BF] hover:bg-[#2DD4BF]/10"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
            {editError && (
              <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider animate-pulse">
                Il nome del task non può essere vuoto
              </span>
            )}
          </div>
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

      <div className="flex items-center gap-2">
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="
              text-gray-700
              hover:text-[#2DD4BF]
              transition-all
              p-2
            "
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        )}
        
        <button
          onClick={() => deleteTask(task.id)}
          className="
            text-gray-700
            hover:text-red-500
            transition-all
            p-2
          "
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}