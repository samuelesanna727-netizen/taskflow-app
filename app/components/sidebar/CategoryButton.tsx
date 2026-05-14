"use client";

import { Category } from "@/app/context/TaskContext";

type Props = {
  name: Category;
  icon: React.ReactNode;
  selected: boolean;
  count: number;
  onClick: () => void;
};

export default function CategoryButton({
  name,
  icon,
  selected,
  count,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full
        min-w-[170px] lg:min-w-0
        flex justify-between items-center
        gap-5 lg:gap-3
        px-4 py-3
        text-sm
        transition-all
        font-medium
        rounded-xl
        group
        ${
          selected
            ? "text-[#2DD4BF]"
            : "text-gray-500 hover:text-gray-300"
        }
      `}
    >
      <div className="flex items-center gap-3 min-w-0">
        <svg
          className={`
            w-4 h-4 shrink-0 transition-opacity
            ${
              selected
                ? "opacity-100 text-[#2DD4BF]"
                : "opacity-40 group-hover:opacity-100"
            }
          `}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {icon}
        </svg>

        <span className="truncate">
          {name}
        </span>
      </div>

      <span
        className="
          ml-4 lg:ml-2
          shrink-0
          text-[11px] lg:text-[13px]
          opacity-40
          font-mono
        "
      >
        {count}
      </span>
    </button>
  );
}