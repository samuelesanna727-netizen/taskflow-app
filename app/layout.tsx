"use client";

import "./globals.css";
import { TaskProvider } from "./context/TaskContext";
import { GeistSans } from "geist/font/sans";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${GeistSans.className} h-full`}>
      <body className="h-screen lg:overflow-hidden overflow-y-auto bg-black text-white flex flex-col">
        
        {/* Linea superiore */}
        <div className="h-[2px] w-full bg-[#2DD4BF] shrink-0" />

        <TaskProvider>
          
          {/* HEADER */}
          <header className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 border-b border-white/5 bg-black shrink-0">
            
            <div className="bg-[#2DD4BF] p-2 sm:p-2.5 rounded-xl shrink-0">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-black"
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

            <div className="flex flex-col min-w-0">
              <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-none">
                TaskFlow
              </h1>

              <span className="text-[10px] sm:text-xs text-gray-500 mt-1 font-medium truncate">
                Manage your tasks
              </span>
            </div>
          </header>

          {/* CONTENUTO */}
          <div className="flex flex-1 w-full bg-black lg:overflow-hidden overflow-visible min-h-0">
            <main
              className="
                flex-1 flex flex-col overflow-y-auto
                [&::-webkit-scrollbar]:w-1.5
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:bg-white/10
                [&::-webkit-scrollbar-thumb]:rounded-full
                hover:[&::-webkit-scrollbar-thumb]:bg-[#2DD4BF]
              "
            >
              {children}
            </main>
          </div>
        </TaskProvider>
      </body>
    </html>
  );
}