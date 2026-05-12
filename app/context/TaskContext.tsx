"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export type Priority = 'I' | 'II' | 'III';
export type Category = 'Personal' | 'Work' | 'Shopping' | 'Health' | 'Learning';

// Definizione task
export interface Task {
  id: string;
  text: string;
  date: string;
  completed: boolean;
  priority: Priority;
  category: Category;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (text: string, priority: Priority, category: Category) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("taskflow-storage");
    if (saved) setTasks(JSON.parse(saved));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) localStorage.setItem("taskflow-storage", JSON.stringify(tasks));
  }, [tasks, isLoaded]);

  const addTask = (text: string, priority: Priority, category: Category) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      date: new Date().toISOString().split('T')[0],
      priority,
      category,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const deleteTask = (id: string) => setTasks(prev => prev.filter(t => t.id !== id));
  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within TaskProvider");
  return context;
};