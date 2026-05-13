// components/stats/StatBox.tsx

"use client";

type Props = {
  label: string;
  value: string | number;
  icon: "tasks" | "check" | "circle" | "trend";
};

export default function StatBox({
  label,
  value,
  icon,
}: Props) {
  const icons = {
    tasks: (
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    ),

    check: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),

    circle: <circle cx="12" cy="12" r="9" />,

    trend: <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />,
  };

  return (
    <div className="bg-[#0D0D0D] border border-white/5 p-5 rounded-xl flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-[#2DD4BF]/5 flex items-center justify-center text-[#2DD4BF]">
        <svg
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