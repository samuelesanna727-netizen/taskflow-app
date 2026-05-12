"use client";
import "./globals.css";
import { TaskProvider } from "./context/TaskContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className="bg-black text-white min-h-screen font-sans antialiased overflow-hidden">
        <TaskProvider>
          <div className="flex w-full h-screen bg-black transition-colors duration-500">
            <main className="flex-1 flex flex-col overflow-hidden">
              {children}
            </main>
          </div>
        </TaskProvider>
      </body>
    </html>
  );
}