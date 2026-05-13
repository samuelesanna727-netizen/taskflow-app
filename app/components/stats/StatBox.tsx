"use client";

type Props = {
  label: string;
  value: string | number;
  icon: "tasks" | "check" | "circle" | "trend";
};

export default function StatBox({ label, value, icon }: Props) {
  const icons = {
    tasks: <><path d="M13 5h8"/><path d="M13 12h8"/><path d="M13 19h8"/><path d="m3 17 2 2 4-4"/><rect x="3" y="4" width="6" height="6" rx="1"/></>,
    check: <><circle cx="12" cy="12" r="11" /><path d="m9 12 2 2 4-4" /></>,
    circle: <circle cx="12" cy="12" r="11" />,
    trend: <><path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/></>,
  };

  return (
    <div className="bg-[#0A0A0A] border border-white/5 p-7 rounded-2xl flex items-center gap-5 h-32 w-full transition-all hover:border-white/10">
      <div className="w-12 h-12 rounded-full bg-[#2DD4BF]/10 flex items-center justify-center text-[#2DD4BF] shrink-0">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {icons[icon]}
        </svg>
      </div>
      <div>
        <div className="text-3xl font-black text-white tracking-tighter leading-none mb-1 ">{value}</div>
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">{label}</div>
      </div>
    </div>
  );
}