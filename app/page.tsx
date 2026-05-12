"use client";
import { useState } from "react";
import { useTasks, Priority, Category } from "./context/TaskContext";

export default function Dashboard() {
  const { tasks, addTask, toggleTask, deleteTask, updateTask } = useTasks();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("II");
  const [category, setCategory] = useState<Category>("Work");

  const [filter, setFilter] = useState<"All" | "Active" | "Completed">("All");
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">("All");
  const [error, setError] = useState<string | null>(null);

  const filteredTasks = tasks.filter(t => {
    const matchesStatus = filter === "All" ? true : filter === "Active" ? !t.completed : t.completed;
    const matchesCategory = selectedCategory === "All" ? true : t.category === selectedCategory;
    return matchesStatus && matchesCategory;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    active: tasks.filter(t => !t.completed).length,
    percent: tasks.length > 0 ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0
  };

  const handleAdd = () => {
    // Regex per caratteri non ammessi (esempio: solo lettere, numeri e spazi)
    const invalidChars = /[^a-zA-Z0-9\s]/;

    if (!text.trim()) {
      setError("Inserire un valore valido!");
      setTimeout(() => setError(null), 3000);
      return;
    }

    if (invalidChars.test(text)) {
      setError("Special characters are not allowed");
      setTimeout(() => setError(null), 3000);
      return;
    }

    addTask(text, priority, category);
    setText("");
    setError(null);
  };

  // Funzione per mappare i colori del pallino della priorità
  const getPriorityColor = (p: Priority) => {
    switch (p) {
      case 'I': return 'bg-red-500';    // High
      case 'II': return 'bg-yellow-500'; // Medium
      case 'III': return 'bg-gray-500';  // Low
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="flex h-full w-full bg-black font-sans antialiased">
      {/* SIDEBAR */}
      <aside className="w-80 bg-[#080808] p-8 flex flex-col border-r border-white/5">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-[#2DD4BF] p-2 rounded-lg">
            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M4 6h16M4 12h10M4 18h16" /></svg>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">TaskFlow</h1>
        </div>

        <nav className="flex-1">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-6 px-4">Categories</p>
          <div className="space-y-1">
            {/* PULSANTE ALL CATEGORIES */}
            <button
              onClick={() => setSelectedCategory("All")}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold mb-2 transition-all ${selectedCategory === "All" ? 'bg-[#2DD4BF]/10 text-[#2DD4BF]' : 'text-gray-500 hover:text-gray-300'}`}
            >
              All Categories
            </button>

            {[
              { name: 'Personal', icon: ( <> <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /> <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /> </> )},
              { name: 'Work', icon: ( <> <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /> <rect width="20" height="14" x="2" y="6" rx="2" /> </>) },
              { name: 'Shopping', icon: <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> },
              { name: 'Health', icon: <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /> },
              { name: 'Learning', icon: <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /> },
            ].map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name as Category)}
                className={`w-full flex justify-between items-center px-4 py-3 text-sm transition-colors font-medium group ${selectedCategory === cat.name ? 'text-[#2DD4BF]' : 'text-gray-500 hover:text-gray-300'}`}
              >
                <div className="flex items-center gap-3">
                  <svg
                    className={`w-4 h-4 transition-opacity ${selectedCategory === cat.name ? 'opacity-100 text-[#2DD4BF]' : 'opacity-40 group-hover:opacity-100'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {cat.icon}
                  </svg>
                  {cat.name}
                </div>
                <span className="text-[10px] opacity-40 font-mono">
                  {tasks.filter(t => t.category === cat.name).length}
                </span>
              </button>
            ))}
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col p-12 overflow-y-auto">
        {/* STATS */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          <StatBox label="Total Tasks" value={stats.total} icon="tasks" />
          <StatBox label="Completed" value={stats.completed} icon="check" />
          <StatBox label="Active" value={stats.active} icon="circle" />
          <StatBox label="Completion" value={`${stats.percent}%`} icon="trend" />
        </div>

        {/* INPUT AREA */}
        <div className="bg-[#0A0A0A] p-4 rounded-[1.5rem] border border-white/5 mb-10 relative">

          {/* BANNER DI ERRORE - Appare con un'animazione fluida */}
          {error && (
            <div className="absolute -top-7 left-6 flex items-center gap-2 text-red-500 animate-in fade-in slide-in-from-bottom-3 duration-300">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">{error}</span>
            </div>
          )}

          <div className={`
    bg-[#0D0D0D] p-2 rounded-[1.2rem] flex flex-col lg:flex-row gap-3 items-center border transition-all duration-300
    ${error ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.1)]' : 'border-white/5'}
  `}>

            <div className="relative flex-1 w-full">
              <input
                value={text}
                maxLength={50}
                onChange={(e) => {
                  setText(e.target.value);
                  if (error) setError(null); // Rimuove l'errore mentre scrivi
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                placeholder="Add a new task..."
                className="w-full bg-transparent border-none outline-none px-6 py-2 text-sm text-gray-300 placeholder:text-gray-700 font-medium"
              />
              {/* Contatore caratteri invisibile che appare solo quando ti avvicini al limite */}
              {text.length > 40 && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-mono text-gray-600">
                  {text.length}/50
                </span>
              )}
            </div>

            <div className="flex w-full lg:w-auto gap-2 pr-2">
              {/* SELECT PRIORITÀ */}
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="flex-1 lg:flex-none bg-black border border-white/5 hover:border-[#2DD4BF]/50 text-[11px] pl-4 pr-10 py-2.5 rounded-xl text-gray-400 outline-none font-bold transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px] bg-[position:right_12px_center] bg-no-repeat cursor-pointer"
              >
                <option value="I">High</option>
                <option value="II">Medium</option>
                <option value="III">Low</option>
              </select>

              {/* SELECT CATEGORIA */}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="flex-1 lg:flex-none bg-black border border-white/5 hover:border-[#2DD4BF]/50 text-[11px] pl-4 pr-10 py-2.5 rounded-xl text-gray-400 outline-none font-bold transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px] bg-[position:right_12px_center] bg-no-repeat cursor-pointer"
              >
                {['Personal', 'Work', 'Shopping', 'Health', 'Learning'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <button
                onClick={handleAdd}
                className="bg-[#2DD4BF] text-black px-6 py-2.5 rounded-xl font-bold text-sm border-2 border-[#1fa392] hover:border-white hover:shadow-[0_0_20px_rgba(45,212,191,0.3)] active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                <span className="text-xl leading-none  transition-transform duration-200">+</span>
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* LISTA FILTRATA */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#0D0D0D] p-1 rounded-xl w-fit flex border border-white/5">
            {["All", "Active", "Completed"].map((s) => (
              <button key={s} onClick={() => setFilter(s as any)} className={`px-8 py-2.5 rounded-lg text-[11px] font-black tracking-tight transition-all ${filter === s ? 'bg-[#1A1A1A] text-white' : 'text-gray-600'}`}>
                {s}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <div key={task.id} className="bg-[#0D0D0D] border border-white/5 p-4 rounded-[1rem] flex items-center gap-6 group transition-all hover:bg-[#111111]">
                  <button onClick={() => toggleTask(task.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${task.completed ? 'bg-[#2DD4BF] border-[#2DD4BF]' : 'border-gray-800'}`}>
                    {task.completed && <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg>}
                  </button>
                  <div className="flex-1 min-w-0 pr-4">
                    {editingId === task.id ? (
                      <div className="flex items-center gap-2 w-full">
                        <div className="relative flex-1">
                          <input
                            autoFocus
                            maxLength={50} // Limite caratteri
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                updateTask(task.id, editText);
                                setEditingId(null);
                              }
                              if (e.key === 'Escape') setEditingId(null);
                            }}
                            className="bg-transparent text-white text-sm lg:text-base font-bold tracking-tight w-full py-0.5 border-b border-[#2DD4BF]/50 outline-none focus:border-[#2DD4BF] transition-all"
                          />
                          {/* Contatore caratteri piccolissimo */}
                          <span className="absolute -bottom-4 right-0 text-[8px] text-gray-600 font-mono">
                            {editText.length}/50
                          </span>
                        </div>

                        {/* Tasto Spunta per salvare */}
                        <button
                          onClick={() => {
                            updateTask(task.id, editText);
                            setEditingId(null);
                          }}
                          className="text-[#2DD4BF] hover:bg-[#2DD4BF]/10 p-1 rounded-md transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <p
                        onClick={() => {
                          setEditingId(task.id);
                          setEditText(task.text);
                        }}
                        className={`text-sm lg:text-base font-bold tracking-tight truncate cursor-pointer hover:text-[#2DD4BF] transition-colors ${task.completed ? 'text-gray-700 line-through' : 'text-gray-200'}`}
                      >
                        {task.text}
                      </p>
                    )}

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{task.category}</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${getPriorityColor(task.priority)}`} />
                    </div>
                  </div>
                  <button onClick={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 text-gray-800 hover:text-red-500 transition-all p-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-700 text-sm px-4">No tasks found.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function StatBox({ label, value, icon }: any) {
  const icons: any = {
    tasks: <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />,
    check: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    circle: <circle cx="12" cy="12" r="9" />,
    trend: <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  };
  return (

    <div className="bg-[#0D0D0D] border border-white/5 p-5 rounded-xl flex items-center gap-3">

      <div className="w-10 h-10 rounded-full bg-[#2DD4BF]/5 flex items-center justify-center text-[#2DD4BF]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {icons[icon]}
        </svg>
      </div>

      <div>
        <div className="text-2xl font-black text-white tracking-tighter leading-none">
          {value}
        </div>
        <div className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-0.5">
          {label}
        </div>
      </div>
    </div>
  );
}