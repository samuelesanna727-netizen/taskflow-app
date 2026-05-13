"use client";
import "./globals.css";
import { TaskProvider } from "./context/TaskContext";
import { GeistSans } from 'geist/font/sans';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={GeistSans.className}>
      <body className="bg-black text-white min-h-screen font-sans antialiased flex flex-col">

      <div className="h-[2px] w-full bg-[#2DD4BF]" />
        
        <TaskProvider>
          {/* HEADER SUPERIORE */}
          <header className="w-full flex items-center gap-4 px-8 py-6 border-b border-white/5 bg-black ">
            {/* Icona Verde */}
            <div className="bg-[#2DD4BF] p-2.5 rounded-xl">
              <svg
                className="w-5 h-5 text-black"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                  className ="lucide lucide-list-checks-icon lucide-list-checks">
                    
                  <path d="M13 5h8"/><path d="M13 12h8"/><path d="M13 19h8"/><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/></svg>
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
          <div className="flex flex-1 w-full bg-black">
            <main className="flex-1 flex flex-col">
              {children}
            </main>
          </div>
        </TaskProvider>
      </body>
    </html>
  );
}