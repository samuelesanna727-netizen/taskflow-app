// components/tasks/TaskList.tsx

"use client";

import {
  Task,
} from "@/app/context/TaskContext";

import TaskItem from "./TaskItem";

type Props = {
  tasks: Task[];
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, text: string) => void;
};

export default function TaskList({
  tasks,
  toggleTask,
  deleteTask,
  updateTask,
}: Props) {
  if (tasks.length === 0) {
    return (
      <p className="text-gray-700 text-sm px-4">
        No tasks found.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      ))}
    </div>
  );
}