"use client";
import "./globals.css";
import { TaskProvider } from "./context/TaskContext";
import { GeistSans } from 'geist/font/sans';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${GeistSans.className} h-full`}>
      <body className="h-screen overflow-hidden bg-black text-white flex flex-col">

        {/* Linea estetica superiore */}
        <div className="h-[2px] w-full bg-[#2DD4BF] shrink-0" />
        
        <TaskProvider>
          {/* HEADER SUPERIORE */}
          <header className="w-full flex items-center gap-4 px-8 py-6 border-b border-white/5 bg-black shrink-0">
            {/* Icona Verde */}
            <div className="bg-[#2DD4BF] p-2.5 rounded-xl">
              <svg
                className="w-5 h-5 text-black"
                fill="none"
                stroke="currentColor"
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                viewBox="0 0 24 24"
              >
                <path d="M13 5h8M13 12h8M13 19h8M3 17l2 2 4-4M3 7l2 2 4-4" />
              </svg>
            </div>

            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-white tracking-tight leading-none">
                TaskFlow
              </h1>
              <span className="text-xs text-gray-500 mt-1.5 font-medium">
                Manage your tasks
              </span>
            </div>
          </header>

          {/* AREA CONTENUTO */}
          <div className="flex flex-1 w-full bg-black overflow-hidden">
            <main className={`
              flex-1 flex flex-col overflow-y-auto
              [&::-webkit-scrollbar]:w-1.5
              [&::-webkit-scrollbar-track]:bg-transparent
              [&::-webkit-scrollbar-thumb]:bg-white/10
              [&::-webkit-scrollbar-thumb]:rounded-full
              hover:[&::-webkit-scrollbar-thumb]:bg-[#2DD4BF]
            `}>
              {children}
            </main>
          </div>
        </TaskProvider>
      </body>
    </html>
  );
}