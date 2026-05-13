// app/dashboard/page.tsx

"use client";

import { useState } from "react";

import {
  useTasks,
  Priority,
  Category,
} from "./context/TaskContext";

import TaskInput from "./components/tasks/TaskInput";
import Sidebar from "./components/sidebar/Sidebar";
import TaskList from "./components/tasks/TaskList";
import TaskFilters from "./components/tasks/TaskFilters";
import StatBox from "./components/stats/StatBox";

export default function Dashboard() {
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
  } = useTasks();

  const [text, setText] = useState("");
  const [priority, setPriority] =
    useState<Priority>("II");

  const [category, setCategory] =
    useState<Category>("Work");

  const [errorVisible, setErrorVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const [filter, setFilter] = useState<
    "All" | "Active" | "Completed"
  >("All");

  const [selectedCategory, setSelectedCategory] =
    useState<Category | "All">("All");



  const filteredTasks = tasks.filter((t) => {
    const matchesStatus =
      filter === "All"
        ? true
        : filter === "Active"
          ? !t.completed
          : t.completed;

    const matchesCategory =
      selectedCategory === "All"
        ? true
        : t.category === selectedCategory;

    return matchesStatus && matchesCategory;
  });

  const stats = {
    total: tasks.length,

    completed: tasks.filter((t) => t.completed)
      .length,

    active: tasks.filter((t) => !t.completed)
      .length,

    percent:
      tasks.length > 0
        ? Math.round(
          (tasks.filter((t) => t.completed).length /
            tasks.length) *
          100
        )
        : 0,
  };

  const handleAdd = () => {
    if (!text.trim()) {
      setError("Il task non può essere vuoto o solo spazi");
      setErrorVisible(true);

      setTimeout(() => {
        setErrorVisible(false); // inizia fade out
      }, 2500);

      setTimeout(() => {
        setError(null); // rimuove dal DOM
      }, 3000);

      return;
    }

    addTask(text.trim(), priority, category);
    setText("");
  };

  return (
    <div className="flex h-full w-full bg-black font-sans antialiased">
      <Sidebar
        tasks={tasks}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <main className="flex-1 flex flex-col p-12 overflow-y-auto">
        <div className="grid grid-cols-4 gap-6 mb-10">
          <StatBox
            label="Total Tasks"
            value={stats.total}
            icon="tasks"
          />

          <StatBox
            label="Completed"
            value={stats.completed}
            icon="check"
          />

          <StatBox
            label="Active"
            value={stats.active}
            icon="circle"
          />

          <StatBox
            label="Completion"
            value={`${stats.percent}%`}
            icon="trend"
          />
        </div>

        <TaskInput
          text={text}
          setText={setText}
          priority={priority}
          setPriority={setPriority}
          category={category}
          setCategory={setCategory}
          onAdd={handleAdd}
          error={error}
        />

        <div className="flex flex-col gap-6">
          <TaskFilters
            filter={filter}
            setFilter={setFilter}
          />

          <TaskList
            tasks={filteredTasks}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        </div>
      </main>
    </div>
  );
}