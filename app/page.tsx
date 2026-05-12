"use client";
import { useState } from "react";
import { useTasks, Priority, Category } from "./context/TaskContext";

export default function Dashboard() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("II");
  const [category, setCategory] = useState<Category>("Work");
  
  // STATI PER I FILTRI
  const [filter, setFilter] = useState<"All" | "Active" | "Completed">("All");
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">("All");

  // LOGICA DI FILTRAGGIO (Stato + Categoria)
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
    if (!text.trim()) return;
    addTask(text, priority, category);
    setText("");
  };

  return (
    <div className="flex h-full w-full bg-black">
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
              { name: 'Personal', icon: <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> },
              { name: 'Work', icon: <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745V20a2 2 0 002 2h14a2 2 0 002-2v-6.745zM16 8V5a2 2 0 00-2-2H10a2 2 0 00-2 2v3m4 7h.01" /> },
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
                  <svg className={`w-4 h-4 transition-opacity ${selectedCategory === cat.name ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    {cat.icon}
                  </svg>
                  {cat.name}
                </div>
                <span className="text-[10px] opacity-40">{tasks.filter(t => t.category === cat.name).length}</span>
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
        <div className="bg-[#0A0A0A] p-4 rounded-[1rem] border border-white/5 mb-10">
          <div className="bg-[#0D0D0D] p-2 rounded-[1rem] flex gap-3 items-center border border-white/5">
            <input 
              value={text} onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              placeholder="Add a new task..." 
              className="flex-1 bg-transparent border-none outline-none px-6 text-sm text-gray-300 placeholder:text-gray-700"
            />
            <div className="flex gap-2 pr-2">
              <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)} className="bg-black border border-white/5 hover:border-[#2DD4BF] text-[11px] px-4 py-2 rounded-xl text-gray-400 outline-none font-bold transition-all">
                <option value="I">High</option><option value="II">Medium</option><option value="III">Low</option>
              </select>
              <select value={category} onChange={(e) => setCategory(e.target.value as Category)} className="bg-black border border-white/5 hover:border-[#2DD4BF] text-[11px] px-4 py-2 rounded-xl text-gray-400 outline-none font-bold transition-all">
                {['Personal', 'Work', 'Shopping', 'Health', 'Learning'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <button 
                onClick={handleAdd} 
                className="bg-[#2DD4BF] text-black px-6 py-2 rounded-xl font-black text-xs border-2 border-black/40 active:scale-95 transition-transform flex items-center gap-1 shadow-sm"
              >
                <span className="text-lg leading-none">+</span> Add
              </button>
            </div>
          </div>
        </div>

        {/* LISTA FILTRATA */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#0D0D0D] p-1 rounded-xl w-fit flex border border-white/5">
            {["All", "Active", "Completed"].map((s) => (
              <button key={s} onClick={() => setFilter(s as any)} className={`px-8 py-2.5 rounded-lg text-[11px] font-black transition-all ${filter === s ? 'bg-[#1A1A1A] text-white' : 'text-gray-600'}`}>
                {s}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <div key={task.id} className="bg-[#0D0D0D] border border-white/5 p-6 rounded-[1.8rem] flex items-center gap-6 group">
                  <button onClick={() => toggleTask(task.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${task.completed ? 'bg-[#2DD4BF] border-[#2DD4BF]' : 'border-gray-800'}`}>
                    {task.completed && <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>}
                  </button>
                  <div className="flex-1">
                    <p className={`text-base font-bold ${task.completed ? 'text-gray-700 line-through' : 'text-gray-200'}`}>{task.text}</p>
                    <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest">{task.category}</span>
                  </div>
                  <button onClick={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 text-gray-800 hover:text-red-500 transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-700 text-sm px-4">Nessun task trovato in questa categoria.</p>
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
    check: <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
    circle: <circle cx="12" cy="12" r="9" />,
    trend: <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  };
  return (
    <div className="bg-[#0D0D0D] border border-white/5 p-7 rounded-2xl flex items-center gap-5">
      <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-[#2DD4BF] border border-white/5">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">{icons[icon]}</svg>
      </div>
      <div>
        <div className="text-3xl font-black text-white">{value}</div>
        <div className="text-[9px] font-black text-gray-700 uppercase tracking-widest">{label}</div>
      </div>
    </div>
  );
}