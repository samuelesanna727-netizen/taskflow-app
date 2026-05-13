"use client";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export default function Button({
  children,
  onClick,
  className = "",
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        bg-[#2DD4BF]
        text-black
        px-6
        py-2.5
        rounded-xl
        font-bold
        text-sm
        border-2
        border-[#1fa392]
        hover:border-white
        hover:shadow-[0_0_20px_rgba(45,212,191,0.3)]
        active:scale-95
        transition-all
        flex
        items-center
        justify-center
        gap-2
        ${className}
      `}
    >
      {children}
    </button>
  );
}