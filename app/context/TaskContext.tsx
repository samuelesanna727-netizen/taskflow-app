"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export type Priority = 'I' | 'II' | 'III';
export type Category = 'Personal' | 'Work' | 'Shopping' | 'Health' | 'Learning';

// Definizione dell'interfaccia Task
export interface Task {
  id: string;
  text: string;
  date: string;
  completed: boolean;
  priority: Priority;
  category: Category;
}

// Definizione del tipo per il Context
interface TaskContextType {
  tasks: Task[];
  addTask: (text: string, priority: Priority, category: Category) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  updateTask: (id: string, newText: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Caricamento iniziale dal localStorage
  useEffect(() => {
    const saved = localStorage.getItem("taskflow-storage");

    if (saved) {
      setTasks(JSON.parse(saved));
    }

    setIsLoaded(true);
  }, []);

  // Salvataggio su localStorage ad ogni modifica dei task
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("taskflow-storage", JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  // Aggiunge un nuovo task
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

  // Rimuove un task tramite ID
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Cambia lo stato di completamento (check/uncheck)
  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Aggiorna il testo di un task esistente (con validazione)
  const updateTask = (id: string, newText: string) => {
    if (!newText.trim()) return; // Evita di salvare task con nome vuoto
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText.trim() } : t))
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, toggleTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
}

// Hook personalizzato per usare il Context
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};