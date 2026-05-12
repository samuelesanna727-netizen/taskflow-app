"use client";
import "./globals.css";
import { TaskProvider } from "./context/TaskContext";
import { GeistSans } from 'geist/font/sans';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={GeistSans.className}>
      <body className="bg-black text-white min-h-screen font-sans antialiased">
        <div className="h-[2px] w-full bg-[#2DD4BF]" />
        <TaskProvider>
          <div className="flex w-full min-h-screen bg-black">
            <main className="flex-1 flex flex-col">
              {children}
            </main>
          </div>
        </TaskProvider>
      </body>
    </html>
  );
}